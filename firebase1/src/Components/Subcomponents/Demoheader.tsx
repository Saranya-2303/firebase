import React from 'react'
import { useRouter } from 'next/router';

const DemoHeader = () => {
  const route = useRouter()

    const HeaderData = [{ Label:"Food",Link:"/Food"},{ Label:"GetFoodItems",Link:"/GetFoodItems"},{ Label:"UpdateFoodItem",Link:"/UpdateFoodItem"},{ Label:"Cards",Link:"/Cards"}]

    const handleLogout = ()=>{
      localStorage.removeItem("Mhytoken")
      localStorage.removeItem("MhytokenUserId")
      route.push("/")
      
    }
  return (
    <div className=' flex  w-full justify-between bg-blue-500'>
        <div className=' p-4 gap-4  flex'>
            {HeaderData.map((header)=>(
                <div key={header.Label} className=' bg-red-500 border border-none p-2 rounded-xl outline-none '><a className=' text-white' href={`${header.Link}`}>{header.Label}</a></div>
            ))}
        </div>
        <div className=' flex justify-center items-center p-3'>
          <button onClick={handleLogout} className='  text-white bg-violet-500 p-2 border border-none rounded-lg'>logout</button>
        </div>
    </div>
  )
}

export default DemoHeader