import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NewReport = () => {
    const [buttonSubmit, setButtonSubmit] = useState(false);
    const handleSubmit = async (e) => {
        setButtonSubmit(true);
        e.preventDefault();
        const username = localStorage.getItem('username');
        const name = e.target.name.value;
        const workdate = e.target.workdate.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const hours = e.target.hours.value;
        const minutes = e.target.minutes.value;
        const files = e.target.files.files;
        alert(`ชื่อ-สกุล: ${name}\nวันที่ปฏิบัติงาน: ${workdate}\nชื่อรายงาน: ${title}\nรายละเอียด: ${description}\nระยะเวลา: ${hours} ชั่วโมง ${minutes} นาที\nจำนวนไฟล์แนบ: ${files.length} ไฟล์`);
        setButtonSubmit(false);
    }

  return (
    <>
      <div className='flex flex-col'>
        <h1>สร้างรายงานใหม่</h1>
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col w-full gap-4'>
          <label htmlFor="name">ชื่อ-สกุล</label>
          <input 
          type="text" 
          id="name" 
          name="name" 
          value={'คนดี ศรีนครินทร'} 
          className='border p-1'
          disabled 
          required />
          <br />
          <label htmlFor="workdate">วันที่ปฏิบัติงาน</label>
          <input 
          type="date" 
          id="workdate" 
          name="workdate" 
          className='border p-1' 
          required />
          <br />
          <label htmlFor="title">ชื่อรายงาน</label>
          <input 
          type="text" 
          id="title" 
          name="title" 
          className='border p-1' 
          required />
          <br />
          <label htmlFor="description">รายละเอียด</label>
          <textarea 
          id="description" 
          name="description" 
          className='border p-1' 
          required
          className='border p-1'></textarea>
          <br />
          <label htmlFor="description">ระยะเวลา</label>
          <input 
          type="number" 
          id="hours" 
          name="hours" 
          min={0} 
          max={7} 
          required 
          className='border p-1'/>ชั่วโมง
          
          <input 
          type="number" 
          id="minutes" 
          name="minutes" 
          min={0} 
          max={59} 
          required 
          className='border p-1'/>นาที
          <br />
          <label htmlFor="files">ไฟล์แนบ</label>
          <input 
          type="file" 
          id="files" 
          name="files" 
          multiple />
          <br />
          <button 
          type="submit" 
          disabled={buttonSubmit}
          className='border p-1'>
            บันทึกรายงาน
          </button>
        </form>
        <Link 
        to="/"
        className='border p-1'>
            ย้อนกลับ
        </Link>
        </div>
    </>
  )
}

export default NewReport