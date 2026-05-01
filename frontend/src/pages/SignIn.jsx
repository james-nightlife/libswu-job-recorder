import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [buttonSubmit, setButtonSubmit] = useState(false);

  const handleSubmit = async (e) => {
    setButtonSubmit(true);
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    try{
      const res = await axios.post(
        `${import.meta.env.VITE_API}/auth`,
        {
          username,
          password
        }
      );
      const data = res.data
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      localStorage.setItem('username', data.username);
      alert(`สวัสดี ${data.name}`);
      navigate('/');
    }catch(e){
      console.error(e)
      alert('เกิดปัญหาทางเทคนิค');
    }
    setButtonSubmit(false);
  }
  return (
    <>
      <div className='flex justify-center p-4'>
        <div className='flex flex-col gap-4 border p-4'>
        <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
        <h2 className='text-center'>ลงชื่อเข้าใช้งาน</h2>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'>
          <label htmlFor="username">บัวศรีไอดี</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required />
          <label htmlFor="password">รหัสผ่าน</label>
          <input 
            type="password" 
            id="password" 
            name="password" required />
          <button type="submit" disabled={buttonSubmit}>ลงชื่อเข้าใช้งาน</button>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignIn