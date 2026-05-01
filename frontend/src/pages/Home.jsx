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
    navigate('/');
  };

  const fetchData = async () => {
    try{
      const res = await axios.get(
        `${import.meta.env.VITE_API}/jobRecord`,
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

  return (
    <>
    <div className='flex justify-center p-4'>
      <div className='flex flex-col gap-4 border p-4'>
        <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
        <Link 
          to="/new-report"
          className='border text-center bg-blue-500 text-white px-4 py-2 rounded'>
          สร้างรายงาน
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
            </tr>
          </thead>
          <tbody>
            {
          data.map((x, idx) => {
            return(
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{x.name}</td>
                <td>{x.workDate}</td>
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
              </tr>
            )
          })
        }
          </tbody>
        </table>
</div>
<button onClick={handleSignOut}>
      ออกจากระบบ
    </button>
      </div>
      

    </div>
    
    
    
    
    </>
  )
}

export default Home