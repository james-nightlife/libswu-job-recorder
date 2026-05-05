import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/sign-in');
    }
    fetchData();
  }, [])

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/sign-in');
  };

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
      const res_data = res.data
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
        
        <div className='w-full overflow-x-auto rounded-lg border border-gray-200'>
        <table className='w-full text-sm sm:text-base border-collapse'>
          <thead>
            <tr>
              <th className='whitespace-nowrap'>ที่</th>
              <th className='whitespace-nowrap'>บุคลากร</th>
              <th className='whitespace-nowrap'>วันปฏิบัติงาน</th>
              <th className='min-w-[250px]'>รายละเอียด</th>
              <th className='min-w-[250px]'>ความคืบหน้า / ความสำเร็จ</th>
              <th className='whitespace-nowrap'>เอกสารประกอบ</th>
              <th className='whitespace-nowrap sticky right-0 bg-gray-200'>จัดการ</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {
          data.map((x, idx) => {
            return(
              <tr key={idx} className='hover:bg-gray-50 transition-colors'>
                <td className='text-center'>{idx+1}</td>
                <td className='whitespace-nowrap font-medium'>{x.name}</td>
                <td className='whitespace-nowrap'>{new Date(x.workDate).toLocaleDateString('th-TH', {day: 'numeric', month: 'long', year: 'numeric'})}</td>
                <td className='break-words'>
                    {x.description}     
                </td>
                <td className='break-words'>
                    {x.progression}    
                </td>
                <td>{x.fileNames.map((x, idx) => 
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
                <td className='sticky right-0 bg-white md:bg-transparent'>
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
<div className='flex justify-end mt-4'>
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