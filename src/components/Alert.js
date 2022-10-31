import React, { useEffect } from 'react'

const Alert = ({mesage,type,setAlert,list}) => {

useEffect(()=>{
const timeout= setTimeout(()=>{
  setAlert({show:false})
 },2000)
return ()=> clearTimeout(timeout)
},[list])


  return (
    <p className={`alert alert-${type}`}>{mesage}</p>
  )
}

export default Alert