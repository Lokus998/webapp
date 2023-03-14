import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Sidebar from './../template_part/Sidebar';
import { auth } from '../firebase';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {getDatabase, ref, update, get, child} from "firebase/database"
import { nameData, avatarData, randomNumberInRange } from '../Json/SiteJsonData';


function Login() {
const db = getDatabase();
const navigate = useNavigate();
const [searchParams] = useSearchParams('');
const [phoneNumber, setphoneNumber] = useState('');
const [otpNumber, setotpnumber] = useState('');
const [explanedOtp, setexplanedOpt] =useState(false);
const [alertVisibility, setalertVisibility] = useState(false);
const [alertpopup, setalertpopup] = useState('');
const [referCodes, setRefercods] = useState('');
const [invitercode, setInvitercode] = useState('');
const [loginbutton, setloginbutton] = useState(false);
const rendomNumber = Math.floor(Math.random()*8);


////Login Site
const handleLogin = (e) =>{
e.preventDefault();
setloginbutton(true);
if(explanedOtp===false){
  generateRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, '+91'+phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
       setexplanedOpt(true);
       setloginbutton(false);
      window.confirmationResult = confirmationResult;

    }).catch((error) => {
      // Error; SMS not sent
      setalertVisibility(true);
      setloginbutton(false);
    setalertpopup('Enter correct mobile number');
    });
}
else if(explanedOtp===true){
  const confirmationResult = window.confirmationResult;
  confirmationResult.confirm(otpNumber).then((result) => {
    // User signed in successfully.
    setloginbutton(false);
    const user = result.user;
get(child(ref(db), 'User/'+user.uid)).then((snapshot) => {
if (snapshot.exists()) {
    console.log("User Alredy Exists")
}
else{
update(ref(db, 'User/'+user.uid), {
  UserID: user.uid,
  OpponentID: 0,
  Username: nameData[rendomNumber],
  Avatar: avatarData[rendomNumber],
  PhoneNumber: '+91'+phoneNumber,
  Status: 'Active',
  Position: 'player',
  WINNINGSCASH: 0,
  DEPOSITCASH: 0,
  Ticket: 0,
  TicketPrize: 0,
  EntryFee: 0,
  GAMEPLAY: 0,
  LastGame: 0,
  My_roomID: 0,
  Lobby_ID: 0,
  Refers: 0,
  Refer_code: referCodes,
  Inviter_code: invitercode,
});

update(ref(db, 'RefersID/'+referCodes), {
  UserID: user.uid
});

if(invitercode!==0){
get(child(ref(db), 'RefersID/'+invitercode)).then((snapshot) => {
  if (snapshot.exists()) {
const inviterID = snapshot.val().UserID;
get(child(ref(db), 'User/'+inviterID)).then((snapshot) => {
 if (snapshot.exists()) {
  update(ref(db, 'User/'+inviterID), {
    Refers: +snapshot.val().Refers+1
    });
  } else {
 console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });  
}
 });
}
}
});
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    setloginbutton(false);
    setalertVisibility(true);
    setalertpopup('OTP verification failed, Please enter correct OTP.');
    // ...
  });
}
};

const generateRecaptcha = () =>{
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-contener', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  }, auth);
};



/////User Login Check
useEffect(()=>{
  if(searchParams.get("invite")===null){
    setInvitercode(0);
  }
  else{
    setInvitercode(searchParams.get("invite"));
  };
  
  setRefercods(randomNumberInRange(8));
  if(alertVisibility===true){
    setTimeout(() => {
      setalertVisibility(false);
    }, 2000);
  };
onAuthStateChanged(auth, (user) => {
    if (user) {
  navigate('/');
    }
  });
  },[alertVisibility, setRefercods, navigate, searchParams, db]);
  

  return (
<>
<div className="leftContainer">
<div className="main-area">
<div style={{overflowY: 'hidden'}}><div className="splash-overlay">
</div><div className="splash-screen">
<figure>
<img width="100%" src="/assets/images/global-gameSheetSplash.png" alt=""/>
</figure></div>

<div className="position-absolute mx-auto" style={{top: '5%', left: '35px', zIndex: 4}}>
<Link to={'/'}>
<button className="d-flex text-black font-15 mb-4 btn btn-outline-white">
 <svg className="MuiSvgIcon-root" focusable="false" fill='#ffff' viewBox="0 0 24 24" aria-hidden="true">
  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
  </button>
  </Link>
  </div>

<div className="position-absolute w-100 center-xy mx-auto" style={{top: '40%', zIndex: 4}}>
<div className="d-flex text-white font-15 mb-4">Sign in or Sign up</div>
<div className="bg-white px-4 cxy flex-column" style={explanedOtp!==false ?  {width: '85%', height: '120px', borderRadius: '5px'} : {width: '85%', height: '70px', borderRadius: '5px'}}>

<div 
className="input-group" 
style={explanedOtp!==false ? {transition: 'top 0.5s ease 0s', top: '0px'} : {transition: 'top 0.5s ease 0s', top: '25px'}}><div className="input-group-prepend">
<div className="input-group-text" style={{width: '100px'}}>+91</div></div>
<input 
className="form-control" 
name="mobile" 
type="tel" 
placeholder="Mobile number" 
value={phoneNumber}
onChange={(e)=>setphoneNumber(e.target.value)}
style={{transition: 'all 3s ease-out 0s'}}/>
<div className="invalid-feedback">Enter a valid mobile number</div></div>

<div className="input-group pt-2" style={explanedOtp!==false?{transition: 'left 0.5s ease 0s', left: '0px'}:{transition: 'left 0.5s ease 0s', left: '-500px'}}>
<div className="input-group-prepend">
<div className="input-group-text" style={{width: '100px'}}>OTP</div></div>
<input 
className="form-control" 
name="otp" 
type="tel" 
placeholder="Enter OTP"  
value={otpNumber}
onChange={e=>setotpnumber(e.target.value)}
/>
<div className="invalid-feedback">Enter a correct OTP</div></div>


</div>
<button 
className={loginbutton===false?"bg-green refer-button cxy mt-4":"bg-green refer-button cxy mt-4 disabled"} 
style={{width: '85%'}} 
onClick={handleLogin}>{loginbutton===false? 'Continue' : <div className='loader'></div> }</button>
<div id='recaptcha-contener'></div>
</div>

{/* ---------Fotter-- */}
<div className="login-footer">
    By proceeding, you agree to our Terms of Use, Privacy Policy and that you are 18 years or older. You are not playing from Assam, Odisha, Nagaland, Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
</div></div></div>
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
</svg>   {alertpopup}
   </div>
: <div></div>}
 

    </>
  )
}

export default Login