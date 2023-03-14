import React, { useState, useEffect } from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';
import { getDatabase, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/database';

function ReferEarn() {
    const db = getDatabase();
    const navigate = useNavigate();
    const [refrrsCode, setrefersCode]= useState('');
    const [totalrefers, setTotalrefers]=useState(0);
    const [Refercopybutton, setRefercopybutton]=useState(false);
    useEffect(()=>{
onAuthStateChanged(auth, user=>{
    if(user){
onValue(ref(db, 'User/'+user.uid), snapshot=>{
setrefersCode(snapshot.val().Refer_code);
setTotalrefers(snapshot.val().Refers);
});
    }
    else{
        navigate('/login');
    };
});
    },[db, navigate]);


 const handerwhatsappshare = ()=>{

const Texrmessage    = 'Play  Ludo  and  earn  *$10000*  daily.%0a %0a http://lunarmart.xyz/referral?code=' + refrrsCode + '%0a %0a Register  Now,  My  refer  code  is  *' + refrrsCode + '*';
window['open']('https://wa.me/?text=' + Texrmessage);
 };  
  return (
    <>
    <div className="leftContainer">
        <Hader/>
<div className="main-area" style={{paddingTop: '60px'}}>
<div className="center-xy">
 <picture className="mt-1">
<img width="226px" src="/assets/images/referral-user-welcome.png" alt=""/>
</picture>
<div className="mb-1">
  <div className="font-15">Earn now unlimited <span role="img" aria-label="party-face">🥳</span></div>
<div className="d-flex justify-content-center">Refer your friends now!</div>
<div className="text-bold mt-3 text-center"> {refrrsCode}</div>
 <div className="d-flex justify-content-center">Total Refers:&nbsp;<b>{totalrefers}</b></div>
  </div></div>
 <div className="divider-x"></div>
 <div className="mx-3 my-3">
 <div className="font-11">Refer &amp; Earn Rules</div>
     <div className="d-flex align-items-center m-3">
 <picture>
<img width="82px" src="/assets/images/referral-signup-bonus-new.png" alt=""/>
</picture>
 <div className="font-9 mx-3" style={{width: '63%'}}>
 <div>When your friend signs up on KhelBro from your referral link,</div>
    <div className="font-8 c-green mt-2">You get <strong>1% Commission</strong> on your
   <strong>referral's winnings.</strong></div>
  </div>  </div>

 <div className="d-flex align-items-center m-3">
 <picture>
<img width="82px" src="/assets/images/banner_illsutration.png" alt=""/>
</picture>

<div className="font-9 mx-3" style={{width: '63%'}}>
<div>Suppose your referral plays a battle for ₹10000 Cash,</div>
 <div className="font-8 c-green mt-2">You get <strong>₹100 Cash</strong> <strong></strong></div>
  </div></div></div>
<div style={{paddingBottom: '80px'}}></div>
<div className="refer-footer">
<button className="bg-green refer-button cxy w-100" 
onClick={handerwhatsappshare}>Share in Whatsapp</button>
<button className="refer-button-copy ml-2 d-flex" 
onClick={(e)=>{
    setRefercopybutton(true);
    navigator.clipboard.writeText('http://localhost:3000/login?invite='+refrrsCode)
    }}>
 <picture>
<img height="18px" width="18px" id="clipbordimg" 
src={Refercopybutton===true ? "/assets/images/global-copy-complite-grey.png" : "/assets/images/global-copy-grey.png"} alt=""/>
</picture>
</button>
</div> </div>
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default ReferEarn