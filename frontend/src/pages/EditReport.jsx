import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditReport = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({})
    const [buttonSubmit, setButtonSubmit] = useState(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const res = await axios.get(
                `${import.meta.env.VITE_API}/job-record/${_id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            )
            const res_data = res.data;

            // Format the date right here if it exists
            if (res_data.workDate) {
                res_data.workDate = new Date(res_data.workDate).toLocaleDateString('sv-SE');
            }
            setData(res_data);
            
        }catch(e){
            console.error(e);
            if(e.response.status === 403){
                alert('เซสชันหมดอายุ กรุณาลงชื่อเข้าใช้งานระบบใหม่')
                return navigate('/sign-in');
            }
            alert('เกิดปัญหาทางเทคนิค');
        }
    }

    /**

    useEffect(() => {
        //console.log(new Date(data.workDate).toLocaleDateString('sv-SE', {year: 'numeric', month: '2-digit', day: '2-digit'}))
        setData({...data, newWorkDate: new Date(data.workDate).toLocaleDateString('sv-SE', {year: 'numeric', month: '2-digit', day: '2-digit'})})
    }, [data.workDate])

     */

    const handleSubmit = async (e) => {
        setButtonSubmit(true);
        e.preventDefault();

        const [  
          workdate, 
          description, 
          progression, 
          hours, 
          minutes,
          files
        ] =  [
          e.target.workdate.value,
          e.target.description.value,
          e.target.progression.value,
          e.target.hours.value,
          e.target.minutes.value,
          e.target.files.files
        ]

        const form = new FormData();
        form.append('workDate', workdate);
        form.append('description', description);
        form.append('progression', progression);
        form.append('hours', hours);
        form.append('minutes', minutes);
        form.append('oldFiles', data.fileNames);
        Array.from(files).forEach(file => {
          // Use the same key name to send them as a collection
          form.append('files[]', file); 
        });

        try{
          const res = await axios.put(
            `${import.meta.env.VITE_API}/job-record/${_id}`,
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
        <div className='flex flex-col gap-4 p-4 border max-w-[1440px] w-full'>
          <h1 className='text-center'>ระบบรายงานการปฏิบัติงานประจำวัน</h1>
          <h2 className='text-center'>แก้ไขบันทึก</h2>
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col w-full gap-2'>
          <div className='flex flex-wrap gap-4 items-center'>
            <label htmlFor="name">ชื่อ-สกุล</label>
          <input 
          type="text" 
          id="name" 
          name="name" 
          value={data.name || ''} 
          className='border p-1 flex-1'
          disabled 
          required />
          <label htmlFor="workdate">วันที่ปฏิบัติงาน</label>
          <input 
          type="date" 
          id="workdate" 
          name="workdate" 
          className='border p-1 flex-1' 
          defaultValue={data.workDate}
          required />
          </div>
          <label htmlFor="description">รายละเอียดงาน</label>
          <textarea 
          id="description" 
          name="description" 
          className='border p-1' 
          defaultValue={data.description}
          required
          rows={5}
          className='border p-1'></textarea>
          <label htmlFor="progression">รายละเอียดความคืบหน้า / ความสำเร็จ</label>
          <textarea 
          id="progression" 
          name="progression" 
          className='border p-1' 
          defaultValue={data.progression}
          rows={5}
          required
          className='border p-1'></textarea>
          <div className='flex flex-wrap gap-4 items-center'>
            <label>ระยะเวลา</label>
          <input 
          type="number" 
          id="hours" 
          name="hours" 
          defaultValue={data.hours}
          min={0} 
          max={7} 
          required 
          className='border p-1 flex-1'/>
          <span>ชั่วโมง</span>
          <input 
          type="number" 
          id="minutes" 
          name="minutes" 
          defaultValue={data.minutes}
          min={0} 
          max={59} 
          required 
          className='border p-1 flex-1'/>
          <span>นาที</span>
          </div>
          <label htmlFor="files">ไฟล์แนบ</label>
          <ul>
          {data.fileNames?.map((x, idx) => (
            <li key={idx}>
                <Link to={`${import.meta.env.VITE_API}/upload/${x}`}>{x}</Link>
            </li>
          )) && 'ไม่มีไฟล์'}
          </ul>
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

export default EditReport