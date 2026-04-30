import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [buttonSubmit, setButtonSubmit] = useState(false);

  const handleSubmit = async (e) => {
    setButtonSubmit(true);
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username || !password) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      setButtonSubmit(false);
      return;
    }
    localStorage.setItem('token', 'token');
    alert('สวัสดี')
    navigate('/');
    setButtonSubmit(false);
  }
  return (
    <>
      <h1>ลงชื่อเข้าใช้งานระบบ</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">ชื่อผู้ใช้งาน</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="password">รหัสผ่าน</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit" disabled={buttonSubmit}>ลงชื่อเข้าใช้งาน</button>
      </form>
    </>
  )
}

export default SignIn