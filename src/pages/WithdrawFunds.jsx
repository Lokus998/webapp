import React, { useEffect, useState } from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Month, Dates, strTime } from '../Json/SiteJsonData';

function WithdrawFunds() {
  const db = getDatabase();
  const navigator = useNavigate();
  const [userID, setUserID] =useState(0);
  const [udpID, setudpID] = useState('');
  const [amount, setAmount] = useState('');
  const [visiblewithdrow, setVisiblewithdrow] = useState(false);
  const [alertVisibility, setalertVisibility] = useState(false);
  const [withdrowbutton, setwithdrowbutton] = useState(false);
  const [alertpopup, setalertpopup] =useState('');

useEffect(()=>{
  onAuthStateChanged(auth, user=>{
  if(user){
    setUserID(user.uid);
  }
  else{
    navigator('/login')
  }
  });

  if(alertVisibility===true){
    setTimeout(() => {
      setalertVisibility(false);
    }, 2000);
  };  
});

const handelWithdrow =()=>{
setwithdrowbutton(true);

get(child(ref(db), 'User/'+userID)).then(snapshot=>{
  const Ms = Date.now();
  const UserNames = snapshot.val().Username;
  const WinningCash = snapshot.val().WINNINGSCASH;
  if(amount>=95&&WinningCash>=amount){
   update(ref(db, 'Transaction/'+Ms+udpID), {
    'PaymentID': Ms+udpID,
    'UserID': userID,
    'UserName': UserNames,
    'Amount': amount,
    'Type': 'Withdrow',
    'Through': 'using UPI',
    'Symbol': '(-)',
    'Ms': Ms,
    'Month': Month,
    'Date': Dates,
    'Time': strTime,
    'Status': 'Pending'
   });
  update(ref(db, 'User/'+userID), {
    WINNINGSCASH: WinningCash-amount
  },navigator('/transaction-history'));
  }
else{
  setalertVisibility(true);
  if(amount<95){
  setalertpopup('Minimum withdrawal amount ₹95');
  }
  else{
    setalertpopup('Your Winning cash Balance low');
  }
  setwithdrowbutton(false);
}
});
  }
  return (
    <>
        <div className="leftContainer">
        <Hader/>

  <div className="main-area" style={{paddingTop: '60px'}}>
  <div className="px-4 py-3">

<div style={visiblewithdrow===false?{display: 'block'}:{display:'none'}}>
<div className="games-section mt-2">
<div className="d-flex position-relative align-items-center">
<div className="games-section-title">Choose withdrawal option</div>
</div></div>
<div className="mt-3">
<div 
className="add-fund-box d-flex align-items-center mt-4"
style={{padding: '15px 20px', height: '60px'}} 
onClick={e=>setVisiblewithdrow(true)}>
<div className="d-flex align-items-center">
<img width="48px" src="/assets/images/upi.webp" alt=""/>
<div className="d-flex justify-content-center flex-column ml-4">
<div className="jss13">Withdraw to UPI</div>
<div className="jss14">Minimum withdrawal amount ₹95</div>
</div></div></div>
                        
<div 
className="add-fund-box d-flex align-items-center mt-4"
style={{paddingTop: '15px', height: '60px'}}
onClick={e=>''}>
<div className="d-flex align-items-center">
<img width="48px" src="/assets/images/bank.png" alt=""/>
 <div className="d-flex justify-content-center flex-column ml-4">
<div className="jss13">Bank Transfer</div>
  <div className="jss14">Minimum withdrawal amount ₹100</div>
 </div></div></div>
 </div></div>

<div style={visiblewithdrow===true?{display:'block'}:{display: 'none'}}>
<div className="d-flex flex-column">
 <div className="games-section-title">
  Withdraw through
<div className="add-fund-box mt-4" style={{paddingTop: '0px', height: '60px'}}>
<div className="d-flex align-items-center">
<div className="d-flex align-items-center" style={{height: '60px'}}>
<img width="48px" src="/assets/images/upi.webp" alt=""/>
</div>
<div className="d-flex justify-content-center flex-column ml-4">
<div className="jss1">Withdraw to UPI</div>
<div className="jss2">Minimum withdrawal amount ₹95</div>
</div>
<button className="btn btn-sm btn-info position-absolute"
style={{width: '40px', right: '1.5rem', fontWeight: 600, fontSize: '0.75em'}} onClick={e=>setVisiblewithdrow(false)}>EDIT</button>
   </div> </div>

 <div className="MuiFormControl-root MuiTextField-root mt-4 w-100">
  <label 
className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
data-shrink="true">Enter UPI ID</label>
<div className="MuiInputBase-root MuiInput-root MuiInput-underline jss3 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
<div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
<p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">░</p>
</div>
<input 
aria-invalid="false" 
name="amount" type="text"
className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
value={udpID}
onChange={e=> setudpID(e.target.value)}/>
</div></div>

<div className="MuiFormControl-root MuiTextField-root mt-4 w-100">
<label
className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
data-shrink="true">Enter Amount</label>
 <div className="MuiInputBase-root MuiInput-root MuiInput-underline jss3 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
<div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
<p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">₹</p>
</div>
<input  
aria-invalid="false" 
name="amount" type="number"
className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
value={amount}
onChange={e=>setAmount(e.target.value)}/>
</div></div>
<div className="refer-footer">
<button 
className={withdrowbutton===true? "refer-button cxy w-100 bg-primary disabled" : "refer-button cxy w-100 bg-primary"} onClick={handelWithdrow}>
 {withdrowbutton===true?<div className='loader'></div>: 'Withdraw'} 
</button></div>
</div></div></div>
</div>
            </div>

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

export default WithdrawFunds