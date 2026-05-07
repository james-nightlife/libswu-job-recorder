import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([])

  const fetchData = async () => {
    try{
      const res = await axios.get(
        `${import.meta.env.VITE_API}/job-record`,
        {
            headers: {
              'Authorization': localStorage.getItem('token'),
              "Content-Type": false,
            }
        }
      )
      var res_data = res.data.sort((x, y) => (new Date(y.workDate) - new Date(x.workDate) || x.name.localeCompare(y.name) ))
      setData(res_data);
    }catch(e){
      console.error(e);
      if(e.response.status === 403){
        alert('เซสชันหมดอายุ กรุณาลงชื่อเข้าใช้งานระบบใหม่')
        return navigate('/sign-in');
      }
      alert('เกิดปัญหาทางเทคนิค')
    }
  }

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/sign-in');
    }
    fetchData();
  }, [])

  const [search, setSearch] = useState("");

  /** PAGINATION */

  const filteredData = useMemo(() => {
        return data.filter((item) => {
        const searchStr = search.toLowerCase();
        return (
            item.name?.toLowerCase().includes(searchStr) ||
            item.username?.toLowerCase().includes(searchStr) ||
            item.description?.toLowerCase().includes(searchStr) ||
            item.progression?.toLowerCase().includes(searchStr)
        )
        });
    }, [data, search]);

  const [page, setPage] = useState(1);
  const offset = 10;
  const pages = Math.ceil(data.length/offset);
  //const dataPreview = data.slice((page-1)*(offset), ((page-1)*offset)+(offset))

  const dataPreview = useMemo(() => {
        const start = (page - 1) * offset;
        return filteredData.slice(start, start + offset);
  }, [filteredData, page, offset]);

  useEffect(() => {
        setPage(1);
  }, [search]);

  useEffect(() => {
      setPage(1)
      //console.log('data', data)
  }, [data])

  /** SIGN OUT */
  const handleSignOut = () => {
    localStorage.clear();
    navigate(0);
  };

  /** DELETE RECORD */
  const handleDelete = async (id) => {
    const confirm_window = confirm(`ท่านยืนยันที่จะลบบันทึกรายงานการปฏิบัติงานนี้หรือไม่`);
    if(!confirm_window){
      return;
    }
    try{
      const res = await axios.delete(
        `${import.meta.env.VITE_API}/job-record/${id}`, 
        {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }
      );
      alert('ระบบได้ลบบันทึกรายงานการปฏิบัติงานนี้แล้ว')
      navigate(0)
    }catch(e){
      console.log(e)
      alert('เกิดปัญหาทางเทคนิค')
    }
  }

  const exportToExcel = async (e, data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer the output and trigger download
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `job_recorder_${new Date().getTime()}.xlsx`);
  };

  return (
    <>
    <div className='min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8'>
      <div className='max-w-7xl mx-auto flex flex-col gap-6 bg-white border shadow-sm p-4 sm:p-6 rounded-lg'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
          <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
          <Link 
            to="/new-record"
            className='border text-center bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded'>
            สร้างบันทึก
          </Link>

        </div>
        <div className="flex gap-2 items-center">
            <label className="font-bold">ค้นหาข้อมูล</label>
            <input
            type="text"
            placeholder="ค้นหาบัวศรีไอดี ชื่อบุคลากร รายละเอียดงาน หรือรายละเอียดความคืบหน้าหรือความสำเร็จ"
            className="border p-2 rounded-lg w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <div>ผลลัพธ์ {filteredData.length} จากทั้งหมด {data.length} รายการ</div>
        </div>
        
        <div className='w-full overflow-x-auto rounded-lg border border-gray-200'>
        <table className='w-full text-sm sm:text-base border-collapse'>
          <thead>
            <tr>
              <th className='whitespace-nowrap'>ที่</th>
              <th className='whitespace-nowrap'>บุคลากร</th>
              <th className='whitespace-nowrap'>วันที่ปฏิบัติงาน</th>
              <th className='whitespace-nowrap'>รายละเอียดงาน</th>
              <th className='whitespace-nowrap'>รายละเอียดความคืบหน้า / ความสำเร็จ</th>
              <th>ระยะเวลา (ชั่วโมง)</th>
              <th className='whitespace-nowrap'>เอกสารประกอบ</th>
              <th className='whitespace-nowrap right-0 bg-gray-200'>จัดการ</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {
          dataPreview.map((x, idx) => {
            return(
              <tr key={idx} className='hover:bg-gray-50 transition-colors'>
                <td className='text-center'>{idx+1}</td>
                <td className='whitespace-nowrap font-medium'>{x.name}</td>
                <td className='whitespace-nowrap'>{new Date(x.workDate).toLocaleDateString('th-TH', {day: 'numeric', month: 'long', year: 'numeric'})}</td>
                <td className='truncate max-w-62.5'>
                    {x.description}     
                </td>
                <td className='truncate max-w-62.5'>
                    {x.progression}    
                </td>
                <td className='text-center'>
                  {`${x.hours}:${String(x.minutes).padStart(2,0)}`}
                </td>
                <td className='whitespace-nowrap'>{x.fileNames.map((x, idx) => 
                  (
                    <Link
                      to={`${import.meta.env.VITE_API}/upload/${x}`}
                      target='_blank'
                      className='block'
                      key={idx}>
                        {x}
                    </Link>
                  )
                )}</td>
                <td className='right-0 bg-white md:bg-transparent'>
                  { x.username === localStorage.getItem('username') &&
                  <div className='flex flex-col'>
                    <Link 
                      to={`/edit/${x._id}`}
                      className='border p-1 bg-blue-500 hover:bg-blue-400 text-white text-center'>แก้ไข</Link>
                    <button 
                      onClick={() => handleDelete(x._id)}
                      className='border p-1 bg-red-500 hover:bg-red-400 text-white text-center'>
                        ลบ
                      </button>
                  </div>
                  }
                </td>
              </tr>
            )
          })
        }
          </tbody>
        </table>
</div>
<div className='flex gap-4 items-center'>
                <button onClick={() => page > 1 && setPage(page-1)} className='border rounded-full flex-1 px-6 py-2 cursor-pointer bg-indigo-600 text-white'>ก่อนหน้า</button>
                <div>หน้า </div>
                  <input 
                  value={page} 
                  name='page' 
                  type='number' 
                  min={1} 
                  max={pages} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && (val < pages+1) && (val > 0)) {
                      setPage(val);
                    }}} />
                    <div> จาก {pages} </div>
                <button onClick={() => page < pages && setPage(page+1)} className='border rounded-full flex-1 px-6 py-2 cursor-pointer bg-indigo-600 text-white'>ถัดไป</button>
            </div>
<div className='flex justify-end mt-4 gap-4'>
  {
    localStorage.getItem('username') === 'songyot' &&
    <>
      <button className='bg-green-500' onClick={(e) => exportToExcel(e, data)}>
                    ดาวน์โหลดเป็น Excel
      </button>
    </>
  }
  <button 
  onClick={handleSignOut}
  className='bg-red-500 hover:bg-red-400'>
      ออกจากระบบ
    </button>
</div>
      </div>
    </div> 
    </>
  )
}

export default Home