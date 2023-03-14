import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { onValue, getDatabase, ref, update, get, child, remove } from 'firebase/database';
import {FullScreen, useFullScreenHandle } from 'react-full-screen';

function Lobby() {
const db = getDatabase();
const {id} = useParams();
const [gameMode] = useState(id);
const navigate = useNavigate();
const handle = useFullScreenHandle();
const [UserID, setUserID] = useState(0);
const [avatar, setavatar]=useState(1);
const [Lobby_id, setLobby_ID]=useState('');
const [visibleLobby, setvisibleLobby] = useState(false);
const [visibleLobbyTicket, setvisibleLobbyTicket] = useState(false);
const [lobbyData, setLobbyData] = useState({lobbyData:[]});
const [alertVisibility, setalertVisibility] =useState(false);
const [runningGame, setRunningGame] =useState(false);

useEffect(()=>{
////User Check
onAuthStateChanged(auth, user=>{
if(user){
setUserID(user.uid);
get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
   setavatar(snapshot.val().Avatar);
   setLobby_ID(snapshot.val().Lobby_ID);
if(snapshot.val().Ticket === 'Yes'){
  setvisibleLobbyTicket(true);
const Lobby_ID = snapshot.val().Lobby_ID;
const EntreFee = +snapshot.val().EntryFee;
remove(ref(db, 'Game_room/'+Lobby_ID+'/'+snapshot.val().My_roomID));
update(ref(db, 'User/'+user.uid), {
  DEPOSITCASH: +snapshot.val().DEPOSITCASH+EntreFee,
  TicketPrize: 0,
  OpponentID: 0,
  EntryFee: 0,
  Ticket: 0,
  My_roomID : 0
});
update(ref(db, 'Lobby/'+Lobby_ID), {
  Waiting: 'nowaiting'
});
}
else if(snapshot.val().Ticket==='Playing'){
setRunningGame(true);

};
});
}
else{
navigate('/login');
}
});
////Data Lod On Lobby
onValue(ref(db, 'Lobby'), snapshot=>{
const records = [];
snapshot.forEach(childSnapshot=>{
records.push(childSnapshot.val());
});
const statusCheck = records.filter(data=> data.Status==='Public'&&data.Type===gameMode);
if(statusCheck.length>=1){
    setvisibleLobby(true);
}
else{
    setvisibleLobby(false);
};
records.sort((a,b)=>a.Prize-b.Prize);
setLobbyData({lobbyData:records});
});

if(alertVisibility===true){
    setTimeout(() => {
      setalertVisibility(false);
    }, 2000);
  };
},[navigate, gameMode, db, alertVisibility]);


///////GameStart
const handleGamestart = (e) =>{
const LobbiID = e.target.id;
get(child(ref(db), 'Lobby/'+LobbiID)).then(snapshot=>{
    const EntreFee = snapshot.val().EntryFee;
    const Prize = snapshot.val().Prize;
get(child(ref(db), 'User/'+UserID)).then( snapshot=>{
        const DEPOSITCASH = snapshot.val().DEPOSITCASH;
        const WINNINGSCASH = snapshot.val().WINNINGSCASH;
if(EntreFee<=DEPOSITCASH){
    update(ref(db, 'User/'+UserID), {
    DEPOSITCASH: DEPOSITCASH - EntreFee,
    EntryFee: EntreFee,
    TicketPrize: Prize,
    Ticket: 'Yes',
    Lobby_ID: LobbiID,
    LastGame: 0
    });
handle.enter();
navigate('/find-player?games='+gameMode,  {state: 'success' });
    }
else if(EntreFee<=WINNINGSCASH){
  update(ref(db, 'User/'+UserID), {
    WINNINGSCASH: WINNINGSCASH - EntreFee,
    EntryFee: EntreFee,
    TicketPrize: Prize,
    Ticket: 'Yes',
    Lobby_ID: LobbiID,
    LastGame: 0
    });
handle.enter();
navigate('/find-player?games='+gameMode, {state: 'success' });
  }
else{
   setalertVisibility(true);
  };
   
});
  });
};

const handelrunning_game =()=>{
get(child(ref(db), 'Lobby/'+Lobby_id)).then(snapshot=>{
  handle.enter();
  navigate('/find-player?games='+snapshot.val().Type, {state: 'success' });
});
};
  return (
    <>
       <div className="leftContainer">
        <Hader/>
<div className="main-area" style={{paddingTop: '60px'}}>
<div className="MuiPaper-root MuiAlert-root MuiAlert-standardInfo mb-2 MuiPaper-elevation0" role="alert">
<div className="MuiAlert-icon">
<svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
</svg></div>
<div className="MuiAlert-message"><span className="font-8">
Update <b>Chrome Browser</b> from play store or app store, if your game not starting.
</span></div>
</div>

<div className="px-4 py-3">
<div className="mb-2">
<img src="/assets/images/global-battleIconWhiteStroke.png" width="20px" alt=""/>
<span className="ml-2 games-section-title">Battles</span>
<span 
onClick={e=>navigate('/rules/'+gameMode)} 
className="games-section-headline text-uppercase position-relative mt-2 font-weight-bold float-right"
style={{top: '-0.2rem'}}>Rules<img className="ml-2" src="/assets/images/global-grey-iButton.png" alt=""/>
</span></div>

<div className="mt-4" id="lobbydetector">
  {/* Running Ganes */}
  {runningGame===true ?
  <>
<div className="betCard mt-1">
<div className="d-flex pl-3" style={{padding:'10px'}}>
<img src={"/assets/avatar/Avatar"+avatar+".png"} width="25px" height={'25px'} alt=""/>
<span style={{padding: '5px 40px'}}>Vs</span> 
<img src="/assets/avatar/Avatar1.png" width="25px" height={'25px'} alt=""/>
 <span className="betCard-amount" id=""></span>
<div className="d-flex ml-auto mr-3 mt-2 flex-column">
<button 
className="bg-green playButton cxy d-flex" 
style={{position: 'unset'}}
onClick={handelrunning_game}>Play</button>
</div></div>
</div>
<br />
</>
:
<></>
}
{/* Game Lobby */}
 {visibleLobby===true&&visibleLobbyTicket!==true?   
<div id="LudoclassNameic" style={{overflowX:'auto'}}>
<div ng-controller="LudoclassNameiccontollers" ng-init="showData()">
{lobbyData.lobbyData.filter(data=>data.Status==='Public'&&data.Type===gameMode).map((row, index) =>{
return(
<div className="betCard mt-1" key={(index)}>
<div className="d-flex pl-3">
<div><span className="betCard-subTitle">Prize Pool</span>
 <div><img src="/assets/images/global-rupeeIcon.png" width="21px" alt=""/>
 <span className="betCard-amount" id="">{row.Prize}</span>
 </div></div>
<div className="d-flex ml-auto mr-3 mt-2 flex-column">
<span className="betCard-subTitle d-flex justify-content-end">Entry</span>
<button 
className="bg-green playButton cxy d-flex" 
style={{position: 'unset'}}
id={row.ID}
onClick={handleGamestart}>₹{row.EntryFee}</button>
</div></div>
<span className="betCard-title mt-2 pl-3 d-flex align-items-center text-uppercase betCard-border-top">
<span className="ml-1" style={{color: 'brown'}}>{row.Playnow} playing now</span>
<span className={"ml-auto mr-3 text-right "+row.Waiting} style={{color: 'rgb(78, 78, 71)'}}>
{row.Waiting} waiting now</span>
</span></div>
)
})}
</div></div>
:
////--------Game Mantence------------
<div className="text-center">
<img src="/assets/images/maintenance.webp" width="250px" alt=""/><br/>
<div className="games-section-title text-center">GAME IS IN MAINTENANCE!</div>
<span className="games-section-headline">Please stay connected, it will get resolved
 within 15 minutes!</span>
 </div>
}
 </div></div></div>   
 <FullScreen handle={handle}>
{handle.active}
</FullScreen>
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>


    {alertVisibility===true ?
   <div className="Alert-NUMBER  alert-danger">
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
 <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
</svg>   No Amount Found
   </div>
: <div></div>}
    </>
  )
}

export default Lobby