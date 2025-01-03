import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import './Paymenthistory.css'



function Paymenthistory({profile}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      axios
        .get("http://localhost:3011/fee-history",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then((result) => {
          setList(result.data.feeHistory)

    });
    };
    getStudents();
  }, []);

  const handleDelete=(id)=>{

    axios.delete("http://localhost:3011/fee-history/delete/"+id,{
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then(result =>{
      toast.success(result.data.msg) 
    })
  }
  return (
    <div className="container d-flex flex-column"> 
 
  {list.map((fee) => {
  
    return (
      <div className="row">
      <table className="feetable">
        <tbody className="px-lg-3 my-lg-2">
          <td className="my-lg-1 shadow-sm px-lg-5">
            <tr className='tabledata'>
            <tr className="">{fee.name}</tr>
            <tr>{fee.phone}</tr>
            <tr>&#8377;{fee.ammount}</tr>
            <tr>{fee.remark}</tr>
            </tr>
            <tr className='tablebutton'>
            
            <button className="btn text-danger" onClick={()=>handleDelete(fee._id)}><i class="fa-solid fa-trash"></i></button>
             
            </tr>
          </td>
        </tbody>
      </table>
    </div>
    );
  })}
</div>
  );
}

export default Paymenthistory
