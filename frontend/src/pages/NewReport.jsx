import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewReport = () => {
    const navigate = useNavigate();
    const [buttonSubmit, setButtonSubmit] = useState(false);
    const handleSubmit = async (e) => {
        setButtonSubmit(true);
        e.preventDefault();

        const [username, 
          name, 
          workdate, 
          description, 
          progression, 
          hours, 
          minutes,
          files
        ] =  [
          localStorage.getItem('username'),
          e.target.name.value,
          e.target.workdate.value,
          e.target.description.value,
          e.target.progression.value,
          e.target.hours.value,
          e.target.minutes.value,
          e.target.files.files
        ]

        const form = new FormData();
        form.append('username', username);
        form.append('name', name);
        form.append('workDate', workdate);
        form.append('description', description);
        form.append('progression', progression);
        form.append('hours', hours);
        form.append('minutes', minutes);
        Array.from(files).forEach(file => {
          // Use the same key name to send them as a collection
          form.append('files[]', file); 
        });
        alert(`ชื่อ-สกุล: ${name}\nวันที่ปฏิบัติงาน: ${workdate}\nรายละเอียด: ${description}\nความคืบหน้า/ความสำเร็จ: ${progression}\nระยะเวลา: ${hours} ชั่วโมง ${minutes} นาที\nจำนวนไฟล์แนบ: ${files.length} ไฟล์`);
        try{
          const res = await axios.post(
            `${import.meta.env.VITE_API}/jobRecord`,
              form,
            {
              headers:{
                'Authorization': localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
              }
            }
          );
          alert('บันทึกสำเร็จ')
          navigate('/')
        }catch(e){
          console.error(e);
          alert('เกิดปัญหาทางเทคนิค');
        } 
        setButtonSubmit(false);
    }

  return (
    <>
      <div className='flex justify-center p-4'>
        <div className='flex flex-col gap-4 p-4 border'>
          <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
          <h2 className='text-center'>สร้างรายงานใหม่</h2>
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col w-full gap-2'>
          <label htmlFor="name">ชื่อ-สกุล</label>
          <input 
          type="text" 
          id="name" 
          name="name" 
          value={localStorage.getItem('name')} 
          className='border p-1'
          disabled 
          required />
          <label htmlFor="workdate">วันที่ปฏิบัติงาน</label>
          <input 
          type="date" 
          id="workdate" 
          name="workdate" 
          className='border p-1' 
          required />
          <label htmlFor="description">รายละเอียด</label>
          <textarea 
          id="description" 
          name="description" 
          className='border p-1' 
          required
          className='border p-1'></textarea>
          <label htmlFor="progression">ความคืบหน้า / ความสำเร็จ</label>
          <textarea 
          id="progression" 
          name="progression" 
          className='border p-1' 
          required
          className='border p-1'></textarea>
          <div className='flex flex-wrap gap-4 items-center'>
            <label>ระยะเวลา</label>
          <input 
          type="number" 
          id="hours" 
          name="hours" 
          min={0} 
          max={7} 
          required 
          className='border p-1 flex-1'/>
          <span>ชั่วโมง</span>
          <input 
          type="number" 
          id="minutes" 
          name="minutes" 
          min={0} 
          max={59} 
          required 
          className='border p-1 flex-1'/>
          <span>นาที</span>
          </div>
          
          <label htmlFor="files">ไฟล์แนบ</label>
          <input 
          type="file" 
          id="files" 
          name="files" 
          className='text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700'
          multiple />
          <button 
          type="submit" 
          disabled={buttonSubmit}
          className='border p-1'>
            บันทึกรายงาน
          </button>
        </form>
        <Link 
        to="/"
        className='border rounded bg-blue-500 text-white text-center px-4 py-2'>
            ย้อนกลับ
        </Link>
        </div>
      </div>
      
    </>
  )
}

export default NewReport