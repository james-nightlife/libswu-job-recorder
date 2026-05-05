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
    <div className='flex justify-center p-4'>
      <div className='flex flex-col gap-4 border p-4'>
        <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
        <Link 
          to="/new-record"
          className='border text-center bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded'>
          สร้างบันทึก
        </Link>
        <div className='overflow-x-scroll'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ที่</th>
              <th>บุคลากร</th>
              <th>วันปฏิบัติงาน</th>
              <th>รายละเอียด</th>
              <th>ความคืบหน้า / ความสำเร็จ</th>
              <th>เอกสารประกอบ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {
          data.map((x, idx) => {
            return(
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{x.name}</td>
                <td>{new Date(x.workDate).toLocaleDateString('th-TH', {day: 'numeric', month: 'long', year: 'numeric'})}</td>
                <td>{x.description}</td>
                <td>{x.progression}</td>
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
                <td>
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
<button 
  onClick={handleSignOut}
  className='bg-red-500 hover:bg-red-400'>
      ออกจากระบบ
    </button>
      </div>
      

    </div>
    
    
    
    
    </>
  )
}

export default Home