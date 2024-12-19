import React, { useState } from 'react'

const CustomerExecutive =()=>{
    const [data,setData] = useState([
        {developers:'Aneela',roles:'Front-End'},
        {developers:'Kuldeep',roles:'Back-End'},
        {developers:'Aniket',roles:'Front-End'},
        {developers:'Amul',roles:'Back-End'},
        {developers:'Nadeem',roles:'Back-End'},
    ]);

const deleterow =(developers)=>{
    setData(data.filter(data=>data.developers !== developers));
};    


    return(
        <div style={{width:'30%',height:'50%',backgroundColor:'aqua',margin:'20px',border:'solid 2px black'}}>
            <div className='flex flex row text-4xl font-bold justify-between my-4 mx-2'>
            <div>Developers</div>
             <div className='mx-28 my-2'>Roles</div>
             
            </div>
            {data.map((item, index)=>(

            
            <div key={index} className='flex flex row text-2xl justify-between my-6 mx-8'>
            <div>{item.developers}</div>
            <div>{item.roles}</div>
            
           <button onClick={()=> deleterow(item.developers)}>X</button>

        </div>
        ))}
    </div>
    )
}
export default CustomerExecutive

