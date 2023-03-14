import { getDatabase, update, ref,  get,  child } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hader from '../template_part/Hader'
import Sidebar from '../template_part/Sidebar'
import { onAuthStateChanged,  signOut } from 'firebase/auth';
import { auth } from '../firebase'

function Profile() {
const db = getDatabase();
const navigate= useNavigate();
const [userID, setUserID] = useState(0);
const [avatar, setAvatar] = useState(1);
const [phoneNumbe, setPhoneNumber] = useState('');
const [userName, setUserName] = useState('');
const [Cashwin, setCashWin] = useState(0);
const [Gameplay, setGamepay] = useState(0);
const [Complitehow, setCompliteshow] = useState('kfc');
const [emailbox, setEmailbox] = useState(false);
const [emailinput, setEmailinput] =useState(false);
const [emails, setEmails] = useState('');
const [avatarChange, setAvatarChange] =useState(false);
const [changeName, setChangeName] = useState(false);
const [nameinput, setNameinput] = useState(false);
const [namevalue, setNameValue] = useState('');
const [alertVisibility, setalertVisibility]= useState(false);

/////User Check and data lod
useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
setUserID(user.uid);
get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
setAvatar(snapshot.val().Avatar);
setPhoneNumber(snapshot.val().PhoneNumber);
setUserName(snapshot.val().Username);
setCashWin(snapshot.val().DEPOSITCASH);
setGamepay(snapshot.val().GAMEPLAY);

});
}
else{
navigate('/login')
}
});
if(alertVisibility===true){
  setTimeout(() => {
    setalertVisibility(false);
  }, 2000);
};
});

////NameChange Handel
const handelnamechange = () =>{
  if(namevalue.length<16&&namevalue.length>3){
    setChangeName(false);
    setUserName(namevalue);
  update(ref(db, 'User/'+userID),{
Username: namevalue
  });
  }
  else{
    setalertVisibility(true);
  }

};
/////Logout Handel
const handellogout = () =>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};
  return (
    <>
<div className="leftContainer">
<Hader/>
<div className="main-area" style={{paddingTop: '60px'}}>

<div className="p-3" style={{background: 'rgb(250, 250, 250)'}}>
<div className="center-xy py-2">
<picture onClick={e=>setAvatarChange(true)}>
 <img className="border-50" height="80px" width="80px" alt="" src={"/assets/avatar/Avatar"+avatar+".png"}/>
</picture>
<span className="battle-input-header mr-1">{phoneNumbe}</span>
<div className="text-bold my-3">
  {changeName===true? 
  <div>
  <div className="MuiFormControl-root MuiTextField-root" style={{verticalAlign: 'bottom'}}>
  <label id="userlabel" 
  className={nameinput===true?
    "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-focused"
    :
    "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"}
  data-shrink="true">Enter Username</label>
  <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
<input id="usernames" 
onClick={e=>setNameinput(true)}
aria-invalid="false" 
type="text" 
className="MuiInputBase-input MuiInput-input" 
value={namevalue}
onChange={e=> setNameValue(e.target.value)}/></div>
</div>
<img 
onClick={handelnamechange} 
className="ml-2" width="20px" src="/assets/images/select-blue-checkIcon.png" alt=""/>
</div>
  :
  <div>
  {userName}
  <img onClick={e=> setChangeName(true)} className="ml-2" width="20px" src="/assets/images/icon-edit.jpg" alt=""/>
  </div>
  }
  </div>
<Link className="d-flex align-items-center profile-wallet w-100" to={"/wallet"}>
<picture className="ml-4">
 <img width="32px" src="/assets/images/sidebar-wallet.png" alt=""/>
</picture>
<div className="ml-5 mytext text-muted ">My Wallet</div>
</Link></div></div>

<div className="divider-x"></div>
<div className="p-3">
<div className="text-bold">Complete Profile</div>
<div className="d-flex ">
<svg 
onClick={e=> Complitehow==='kfc'? setCompliteshow('email'): setCompliteshow('kfc')} 
className="MuiSvgIcon-root MuiSvgIcon-colorAction" 
focusable="false" viewBox="0 0 24 24" 
aria-hidden="true" style={{height: 'unset'}}>
<path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
</svg>
<div style={{overflowX: 'hidden'}}>
<div id="kycemail" className="react-swipeable-view-container"
style={Complitehow==='kfc'?
{flexDirection: 'row',
transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s', 
direction: 'ltr', 
display: 'flex', 
transform: 'translate(0%, 0px)'}
:
{flexDirection: 'row', 
transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s', 
direction: 'ltr', 
display: 'flex', 
transform: 'translate(-100%, 0px)'
}
}>
<div aria-hidden="false" data-swipeable="true"
style={{width: '100%', flexShrink: 0, overflow: 'auto'}}>
<Link className="d-flex align-items-center profile-wallet bg-light mx-1 my-4 py-3" to={"/profile"}>
<picture className="ml-4">
<img width="32px" src="/assets/images/kyc-icon-new.png" alt=""/>
</picture>
<div className="ml-5 mytext text-muted ">KYC Not Required </div>
</Link></div>
<div aria-hidden="true" data-swipeable="true"
style={{width: '100%', flexShrink: 0, overflow: 'auto'}}>
<Link 
className="d-flex align-items-center profile-wallet bg-light mx-1 my-4 py-3"
onClick={e=> setEmailbox(true)}>
<picture className="ml-4">
<img width="32px" src="/assets/images/mail.png" alt=""/>
</picture>
<div className="ml-5 mytext text-muted ">EMAIL UPDATED ✅</div>
</Link></div></div></div>
<svg onClick={e=> Complitehow==='kfc'? setCompliteshow('email'): setCompliteshow('kfc')} 
className="MuiSvgIcon-root MuiSvgIcon-colorAction" 
focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{height: 'unset'}}>
<path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path>
</svg>
</div>
</div>

<div className="divider-x"></div>
<div className="px-3 py-1">
<div className="d-flex align-items-center position-relative" style={{height: '84px'}}>
<picture>
<img height="32px" width="32px" src="/assets/images/global-cash-won-green-circular.png" alt=""/>
</picture>
 <div className="pl-4">
<div className="text-uppercase moneyBox-header" style={{fontSize: '0.8em'}}>Cash Won</div>
<div>
<picture className="mr-1">
<img height="auto" width="21px" src="/assets/images/global-rupeeIcon.png" alt=""/>
</picture>
<span className="moneyBox-text" id="wincashs" style={{fontSize: '1em', bottom: '-1px'}}>₹ {Cashwin}</span>
</div><span className="thin-divider-x"></span>
</div></div></div>

<div className="px-3 py-1">
<div className="d-flex align-items-center position-relative" style={{height: '84px'}}>
<picture>
<img height="32px" width="32px" src="/assets/images/global-purple-battleIcon.png" alt=""/>
</picture>
<div className="pl-4">
 <div className="text-uppercase moneyBox-header" style={{fontSize: '0.8em'}}>Battle Played</div>
<div>
<span className="moneyBox-text" style={{fontSize: '1em', bottom: '-1px'}}>{Gameplay}</span></div>
 </div>
</div>
</div>

<div className="divider-x"></div>
<div className="p-3">
<Link onClick={handellogout} className="center-xy text-muted text-uppercase py-4 font-weight-bolder">Log Out</Link>
</div>

<div className="kyc-select">
<div 
className="overlay" 
onClick={e=>{setEmailbox(false); setAvatarChange(false)}}
style={emailbox===true||avatarChange===true?{pointerEvents: 'auto', opacity: '0.87'}: {}}
></div>
<div 
className={emailbox===true||avatarChange===true?"box box kyc-select-enter-done": "box"} 
style={{bottom: '0px', position: 'absolute'}}>
 <div className="bg-white">
                                   
    {/* -----Email update----- */}
<div style={emailbox===true?{display: 'block'}:{display:'none'}}>
<div className="header cxy flex-column">
  <div className="header-text mt-2">Update Email</div>
    </div>
<div className="mx-3 pb-3" style={{paddingTop: '130px'}}>
<div className="MuiFormControl-root MuiTextField-root d-flex m-auto w-80">
<label 
className={emailinput===true? 
"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-focused"
: "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"} data-shrink="false">Enter Email</label>
<div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
<input 
onClick={e=>setEmailinput(true) }
aria-invalid="false" 
type="text" 
className="MuiInputBase-input MuiInput-input" 
value={emails}
onChange={e=>setEmails(e.target.value)}
/>
</div>
</div>
<button className="btn btn-success mt-3 text-uppercase d-flex mx-auto"
 style={{fontWeight: 500}}>Update</button>
</div></div>
{/* -----Email update End----- */}

{/* -----Profile pic update----- */}
<div id="profilepicupdate" style={avatarChange===true?{display: 'block'}:{display: 'none'}}>
<div className="header cxy flex-column">
<picture>
<img className="border-50" height="80px" width="80px" alt="" src="/assets/avatar/Avatar2.png"/>
</picture>
<div className="custom-file mt-4">
<input type="file" className="custom-file-input" id="profilePic" name="profilePic" accept="image/*"/>
<label className="custom-file-label">Browse your profile pic</label></div>
<span className="mt-2">OR</span>
<div className="header-text mt-2">Choose Avatar</div>
                            </div>
<div className="mx-3 pb-3" style={{paddingTop: '290px'}}>
   <div className="row justify-content-between col-10 mx-auto">
<img height="50px" width="50px" src="/assets/avatar/Avatar1.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar2.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar3.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar4.png" alt=""/>
</div>
 <div className="row justify-content-between col-10 mx-auto mt-3">
<img height="50px" width="50px" src="/assets/avatar/Avatar5.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar6.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar7.png" alt=""/>
<img height="50px" width="50px" src="/assets/avatar/Avatar8.png" alt=""/>
</div>
</div>
 </div>
                            
</div></div></div> </div></div>
    

    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>

    {alertVisibility===true ?
   <div className="Alert-NUMBER  alert-danger">
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
 <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
</svg>    Username must be of 4-15 characters.
   </div>
: <div></div>}
</>
  )
}

export default Profile