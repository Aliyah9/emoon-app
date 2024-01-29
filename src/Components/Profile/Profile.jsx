import React from 'react'

export default function Profile({currentuser}) {
  //console.log(currentuser.id)
  
  return <>
  <div className="p-5">

    <h2 className=' text-center'>Welcome back {currentuser.name}</h2>
    
    
  </div>
  
  
  </>
}
