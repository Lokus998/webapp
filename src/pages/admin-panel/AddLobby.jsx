import React, { useState } from 'react'
import AdminSidebar from './../../template_part/AdminSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, update, ref } from 'firebase/database';

function AddLobby() {
const db = getDatabase();
const navigate = useNavigate();
const Ms = Date.now();
const [GameName, setGamename]=useState('');
const [GameType, setGameType]=useState('');
const [EntryFee, setEntryFee]=useState(0);
const [Prize, setPrize]=useState(0);



const submitnewlobby =()=>{
update(ref(db, 'Lobby/'+Ms), {
        LobbyName: GameName,
        Type: GameType,
        EntryFee: EntryFee,
        Prize: Prize,
        TotalPlay: 0,
        Playnow: 0,
        Waiting: 'nowaiting',
        Status: 'Public',
        ID: Ms
    });
navigate('/admin-panel/lobby/'+GameType);
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
 <div className="lobby">
              <label>Lobby Name</label>
    <input type="text" value={GameName} onChange={e=>setGamename(e.target.value)} name="lobbyname" placeholder="Enter Lobby name.."/>

    <label >Entry Fee</label>
    <input type="number" value={EntryFee} onChange={e=>setEntryFee(e.target.value)} name="Entry" placeholder="Enter Entry fee.."/>

    <label>PRIZE</label>
    <input type="number" value={Prize} onChange={e=>setPrize(e.target.value)} name="prize" placeholder="Enter prize.."/>

    <label>Target Game</label>
    <select onClick={e=>setGameType(e.target.value)} name="targetlobby">
      <option value="ludo_classic">Ludo Classic</option>
      <option value="ludo_short">Ludo Short</option>
    </select>
  
    <input type="submit" value="Submit" onClick={submitnewlobby}/>
 
</div>
 </main>
 </div>
</div></div>
  )
}

export default AddLobby