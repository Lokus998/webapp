import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from './../../template_part/AdminSidebar';
import { getDatabase, onValue, ref, update} from 'firebase/database';


function AdminLooby() {
  const db = getDatabase();
  const {id}=useParams();
  const [lobbyData, setLobbyData]=useState({lobbyData:[]});
  useEffect(()=>{
onValue(ref(db, 'Lobby'), snapshot=>{
const records= [];
snapshot.forEach(childSnapshot=>{
records.push(childSnapshot.val());
});
setLobbyData({lobbyData:records});
});
  },[db]);
const changeStatus=(e)=>{
  if(e.target.className==='Public'){
    update(ref(db, 'Lobby/'+e.target.id), {
      Status: 'Draft',
    });
  }
  else{
    update(ref(db, 'Lobby/'+e.target.id), {
      Status: 'Public',
    });
  };

};
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
 <div id="Lobby" style={{overflowX:'auto'}}>
                <table>
                <tbody>
                  <tr>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Lobby Name</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Entry Fee</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Prize</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Total Play</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Playing NOW</th>
                    <th style={{backgroundColor: 'rgb(78, 129, 43)'}}>Status</th>
                   
                  </tr>
{lobbyData.lobbyData.filter(data=>data.Type===id).map((row, index) =>{
return(
  <tr key={index}>
  <td>{row.LobbyName}</td>
  <td>{row.EntryFee}</td>
  <td >{row.Prize}</td>
  <td >{row.TotalPlay}</td>
  <td >{row.Playnow}</td>
  <td className={row.Status} id={row.ID} onClick={changeStatus}> {row.Status}</td>
</tr>
)
})}
               
               </tbody>
                </table>
  </div>
    </main></div></div></div>
  )
}

export default AdminLooby