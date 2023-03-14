import React, { useEffect, useState } from 'react'
import Hader from '../template_part/Hader'
import Sidebar from '../template_part/Sidebar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, get, child } from 'firebase/database';
import { Month, Dates, strTime } from '../Json/SiteJsonData';
function AddFound() {
const navigate = useNavigate();
const db = getDatabase();
const [UserID, setUserID] = useState(0);
const [cashAmount, setCashAmount] = useState('');
const [validCash, setvalidCash] = useState(false);
const [Usernames, setUsernames] = useState('');
const [RazorpayProcess, setRazorpayProcess] = useState(false);

useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
    setUserID(user.uid);
get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
setUsernames(snapshot.val().Username);
});
get(child(ref(db), 'Admin')).then(snapshot=>{
if(snapshot.exists()){
if(snapshot.val().RazorpayProcess==='Auto'){
    setRazorpayProcess(true);
}
else{
    setRazorpayProcess(false);
}
}
});
}
else{
navigate('/login')
}
});

if(cashAmount>=10&&cashAmount<=20000){
    setvalidCash(true);
}
else{
    setvalidCash(false);
};
},[cashAmount, db, navigate]);


////////Payment Process
const lodScript = (src) =>{
return new Promise((resolve)=>{
const script = document.createElement('script');
script.src= src;
script.onload = ()  =>{
    resolve(true)
};
script.onerror = () =>{
    resolve(false)
}
document.body.appendChild(script);
});
};
////Handel Process
const handelprocess = async () =>{
    const res = await lodScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
        alert('Error')
        return
    }
    var options = {
        key: "rzp_test_9TB3asShG3RvdV",
        key_secret:"zrpWBMrytnHq5UMUeVikNgfn",
        amount: cashAmount *100,
        currency:"INR",
        name:"GamesClash",
        description:"for testing purpose",
        handler: function(response){
          paymentSetdatabase(response.razorpay_payment_id);
        },
        prefill: {
          name: Usernames,
          email:"lokesh.nistane1@gmail.com",
          contact:"8149217116"
        },

        "readonly": { 'email': true, 'contact': true },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
 setvalidCash(false);
};

const paymentSetdatabase =(payment_id) =>{
    const ms = Date.now();
if(RazorpayProcess===true){
update(ref(db, 'Transaction/'+payment_id), {
    PaymentID : payment_id,
    UserID : UserID,
    UserName : Usernames,
    Amount : cashAmount,
    Type: "Deposit",
    Through : "using Razorpay",
    Symbol: "(+)",
    Ms : ms,
    Month : Month,
    Date : Dates,
    Time : strTime,
    Status : 'Complete'
});
get(child(ref(db), 'User/'+UserID)).then(snapshot=>{
update(ref(db, 'User/'+UserID), {
DEPOSITCASH: +snapshot.val().DEPOSITCASH+cashAmount
});
});
}
else{
update(ref(db, 'Transaction/'+payment_id), {
        PaymentID : payment_id,
        UserID : UserID,
        UserName : Usernames,
        Amount : cashAmount,
        Type: "Deposit",
        Through : "using Razorpay",
        Symbol: "(+)",
        Ms : ms,
        Month : Month,
        Date : Dates,
        Time : strTime,
        Status : 'Pending'
    });
}
navigate('/transaction-history');
};
  return (
    <>
<div className="leftContainer">
        <Hader/>
<div className="main-area" style={{paddingTop: '60px'}}>
<div className="px-4 py-3">
<div className="games-section">
<div className="d-flex position-relative alignItems-center">
<div className="games-section-title">Choose amount to add</div>
</div>
</div>
<div className="pb-3">
<div className="MuiFormControl-root mt-4 MuiFormControl-fullWidth">
<div className="MuiFormControl-root MuiTextField-root">
<label
className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
data-shrink="true">Enter Amount</label>
<div
className="MuiInputBase-root MuiInput-root MuiInput-underline jss52 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
<div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
<p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">₹</p>
</div>
<input  
name="cashAmount" 
aria-invalid="false" 
type="tel"
className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
value={cashAmount}
onChange={e=> setCashAmount(e.target.value)}
min="10" 
max="2000"/>
</div>
<p className="MuiFormHelperText-root">Min: 10, Max: 20000</p>
</div>
</div>
<div className="games-window">
<div className="gameCard-container" onClick={e=>setCashAmount(100)}>
<div className="add-fund-box">
<div style={{display: 'flex', alignItems: 'baseline'}}>
<div className="collapseCard-title mr-1" style={{fontSize: '0.9em'}}>₹</div>
<div className="collapseCard-title" style={{fontSize: '1.5em'}}>100</div>
</div>
</div>
</div>
<div className="gameCard-container" onClick={e=>setCashAmount(250)}>
<div className="add-fund-box">
<div style={{display: 'flex', alignItems: 'baseline'}}>
<div className="collapseCard-title mr-1" style={{fontSize: '0.9em'}}>₹</div>
<div className="collapseCard-title" style={{fontSize: '1.5em'}}>250</div>
</div>
</div>
</div>
<div className="gameCard-container" onClick={e=>setCashAmount(500)}>
<div className="add-fund-box">
<div style={{display: 'flex', alignItems: 'baseline'}}>
<div className="collapseCard-title mr-1" style={{fontSize: '0.9em'}}>₹</div>
<div className="collapseCard-title" style={{fontSize: '1.5em'}}>500</div>
</div>
</div>
</div>
<div className="gameCard-container" onClick={e=>setCashAmount(1000)}>
<div className="add-fund-box">
<div style={{display: 'flex', alignItems: 'baseline'}}>
<div className="collapseCard-title mr-1" style={{fontSize: '0.9em'}}>₹</div>
<div className="collapseCard-title" style={{fontSize: '1.5em'}}>1000</div>
</div></div></div></div></div>
<div className="refer-footer">
<button type="submit" id="payoutprocess"
onClick={handelprocess}
className={validCash===true? "refer-button cxy w-100 bg-primary" :"refer-button cxy w-100 bg-secondary disabled"}>Proceed</button>
</div>
</div></div>      
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default AddFound