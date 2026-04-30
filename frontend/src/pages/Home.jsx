import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

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
    setData([
    {
      id: 1,
      title: 'รายงานที่ 1',
      description: 'รายละเอียดของรายงานที่ 1'
    },
    {
      id: 2,
      title: 'รายงานที่ 2',
      description: 'รายละเอียดของรายงานที่ 2'
    }
  ])
  }

  return (
    <>
    <button onClick={handleSignOut}>
      ออกจากระบบ
    </button>
    <Link to="/new-report">
      สร้างรายงาน
    </Link>
    <table className='w-full'>
      <thead>
        <tr>
          <th>ชื่อรายงาน</th>
          <th>รายละเอียด</th>
        </tr>
      </thead>
      <tbody>
        {
      data.map((x, idx) => {
        return(
          <tr key={idx}>
            <td>{x.title}</td>
            <td>{x.description}</td>
          </tr>
        )
      })
    }
      </tbody>
    </table>
    
    </>
  )
}

export default Home