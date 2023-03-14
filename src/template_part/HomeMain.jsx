import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function HomeMain() {
const [collapseCard, setcollapseCard] = useState('collapseCard-show');
const [popupCard, setpopupCard] = useState('tutorHide');
const [currentLobby, setCurrentLobby]=useState(false);

useEffect(()=>{
  onAuthStateChanged(auth, user=>{
if(user){
  setCurrentLobby(false);
}
else{
  setCurrentLobby(true);
}
  });
});


const collapse = () =>{
        collapseCard!=='collapseCard-hide'?
         setcollapseCard('collapseCard-hide')
         : 
         setcollapseCard('collapseCard-show')
    };
  return (
<div className="main-area home_main1">
    {/* ------------Cllops Start-------*/}
<div className="collapseCard-container">
<div className="collapseCard">
<div className='home_main2'>
<div className={"collapseCard-body "+collapseCard}>
<div 
onClick={e=>setpopupCard('tutorSow')}
className="collapseCard-text">How to win money?</div>
<picture 
onClick={collapse} 
className="collapseCard-closeIcon">
<img className="position-relative" src="/assets/images/global-circularCrossIcon.png" alt="" width="14px" height="14px"/>
</picture>
</div>
</div>
<div 
onClick={collapse} 
className="collapseCard-header" style={{left: '22px', transition: 'left 0.3s ease 0s'}}><picture>
<img height="10px" width="14px" src="/assets/images/global-ytPlayIcon.png" alt=""/>
</picture><div className="collapseCard-title ml-1 mt-1">Video Help</div>
</div></div></div>


{/* ---Start Game Part-- */}
<section className="games-section p-3">
<div className="d-flex align-items-center games-section-title">Our Games</div>
<div className="games-section-headline mt-2 mb-1">
<img src="/assets/images/global-purple-battleIcon.png" alt=""/> 
is for Battles and 
<img className="ml-1" src="/assets/images/global-blue-tournamentIcon.png" alt=""/>
is for Tournaments. 
<span>Know more here.</span>
<div className="games-window">

<div className="gameCard-container">
<span className="blink text-danger d-block text-right">◉ LIVE</span>
<Link className="gameCard"to={"/lobby/ludo_short"}>
<picture className="gameCard-image">
<img width="100%" src="/assets/images/ludo_short.jpeg" alt=""/>
</picture>
<div className="gameCard-title">Ludo Short</div>
<picture className="gameCard-icon">
<img src="/assets/images/global-battleIconWhiteStroke.png" alt=""/>
</picture>
</Link></div>

<div className="gameCard-container">
<span className="blink text-danger d-block text-right">◉ LIVE</span>
<Link className="gameCard" to={"lobby/ludo_classic"}>
<picture className="gameCard-image">
<img width="100%" src="/assets/images/ludo_classic.jpeg" alt=""/>
</picture>
<div className="gameCard-title">Ludo Classic</div>
<picture className="gameCard-icon">
<img src="/assets/images/global-battleIconWhiteStroke.png" alt=""/>
</picture>
</Link></div>


{currentLobby===true ?
<>
<div className="gameCard-container">
<span className="blink text-danger d-block text-right">◉ LIVE</span>
<Link className="gameCard" to={"/"}>
<picture className="gameCard-image">
<img width="100%" src="/assets/images/fantasy-cricket.jpeg" alt=""/>
</picture>
<div className="gameCard-title">Fantasy Cricket</div>
<picture className="gameCard-icon">
<img src="/assets/images/global-battleIconWhiteStroke.png" alt=""/>
</picture>
</Link></div>
                       
<div className="gameCard-container">
<span className="blink text-danger d-block text-right">◉ LIVE</span>
<Link className="gameCard" to={"/"}>
<picture className="gameCard-image">
<img width="100%" src="/assets/images/callbreak.jpeg" alt=""/>
</picture>
<div className="gameCard-title">CallBreak</div>
<picture className="gameCard-icon">
<img src="/assets/images/global-battleIconWhiteStroke.png" alt=""/>
</picture>
</Link></div>
</>
: <></>
}
</div></div></section>



    {/* ---------------Tutorial --------- */}
<div className="kyc-select">
<div 
onClick={e=> setpopupCard('tutorHide')}
className={"overlay "} 
style={popupCard==='tutorSow'?{pointerEvents: 'auto', opacity: 0.87}:{}}></div>
<div className={popupCard!=='tutorHide'? "box tutorialcard kyc-select-enter-done" : "box tutorialcard"}>
<div className="bg-white">
<div className="header">

<div className="d-flex position-relative align-items-center">
<img src="/assets/images/global-ytPlayIcon.png" width="20px" alt=""/>
<div className="games-section-title ml-3">How to play on KhelBro?</div>
<span 
className="position-absolute font-weight-bold cxy"
style={{right: '5px', height: '40px', width: '40px'}}
onClick={e=> setpopupCard('tutorHide')}
>X</span>
</div>

<div className="tutorialVideo">
<div onClick={collapse}  className="tab tabActive">
<span>Hindi</span>
<div className="selectedLine"></div>
</div>
<div onClick={collapse} className="tab">
<span>English</span>
<div className="selectedLine"></div>
</div>           
</div></div>

<div className='maincontaintshkj'>
<div className="embed-responsive embed-responsive-16by9">
<iframe 
title="Tutorial Video" 
src="https://www.youtube.com/embed/ATYvVcDKENY?rel=0&amp;enablejsapi=1"></iframe>
</div>
</div>
   </div>
</div>
</div></div>
  )
}

export default HomeMain