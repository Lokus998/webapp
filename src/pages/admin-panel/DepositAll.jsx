import React, { useEffect, useState } from 'react'
import AdminSidebar from './../../template_part/AdminSidebar';
import { Link } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';

function DepositAll() {
    const db = getDatabase();
    const [DipositData, setDipositData]=useState({DipositData:[]});

    useEffect(()=>{
onValue(ref(db, 'Transaction'), snapshot=> {
const records=[];
snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
});
setDipositData({DipositData:records});
});

    },[db]);
  return (
    <div className="container-fluid">
    <div className="row">
    <AdminSidebar/>
    
    <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay"></div>
     <div className="col-md-9 col-lg-10 ml-md-auto px-0">
    <nav className="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
     <button className="btn py-0 d-lg-none">
    <span className="bi bi-list text-primary h3"></span>
     </button>
      <div className="dropdown ml-auto">
    <button className="btn py-0 d-flex align-items-center" id="logout-dropdown" data-toggle="dropdown" aria-expanded="false">
    <span className="bi bi-person text-primary h4"></span>
      <span className="bi bi-chevron-down ml-1 mb-2 small"></span>
      </button>
       <div className="dropdown-menu dropdown-menu-right border-0 shadow-sm" aria-labelledby="logout-dropdown">
        <Link className="dropdown-item" href="#">Logout</Link>
      <Link className="dropdown-item" href="#">Settings</Link>
         </div> </div>  </nav>
     <main className="container-fluid">

     <div style={{overflowX:'auto'}}>
                <table>
                <tbody>
                  <tr>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>PaymentID</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>User Name</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Amount</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Status</th>
           
                   
                  </tr>
{DipositData.DipositData.filter(data=>data.Type==='Deposit').map((row, index) =>{
return(
  <tr key={index}>
  <td>{row.PaymentID}</td>
  <td>{row.UserName}</td>
  <td >{row.Amount}</td>
  <td className={row.Status}> {row.Status}</td>
</tr>
)
})}
               
               </tbody>
                </table>
  </div>
    </main></div></div></div>
  )
}

export default DepositAll