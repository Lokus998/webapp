import React,{useEffect, useState} from 'react'
import Sidebar from './../template_part/Sidebar';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { child, get, getDatabase, ref, update, remove, onValue } from 'firebase/database';
import { Month, Dates, strTime, randomNumberInRange } from '../Json/SiteJsonData';

function FindPlayer() {
const db = getDatabase();
const [Ms, setMs] = useState(Date.now());
 const navigate = useNavigate();
 const location = useLocation();
 const [searchparms]= useSearchParams('');
 const [gameMode] = useState(searchparms.get('games'));
 const [UserId, setUserID] = useState(0);
 const [Username, setUsername]= useState('');
 const [LastGame, setLastGame]=useState('');
 const [Lobby_ID, setLobby_id]=useState('');
 const [Ticket, setTicket]=useState('');
 const [TicketPrize, setTicketPrize]=useState('');
 const [avatar, setAvatar] = useState(1);
 const [secondsCount, setsecoundsCount] =  useState(1);
 const [minuteCounts, setminuteConds] =useState(0);
 const [stopButton, setStopButton] = useState(false);
 const [gameWindow, setgameWindow] = useState('findPlayer');
 const [findtimecount, setfindtimecount] = useState(true);
 const [secondcountdown, setSecondcountdown] = useState(0);
 const [opponentID, setOpponentID]=useState('');
 const [opponentName, setopponentName] = useState('');
 const [opponentAvatar, setopponentAvatar] =useState('');
 const [gameModeID, setGamemodID]=useState('');
 const [BattleID, setBattleID]= useState(randomNumberInRange(6));
 const [currentPlay, setcurrentPlay] = useState(0);
 const [winnerGamaePlay, setWinnerGamePlay]=useState(0);
 const [winnerEarn, setWinnerEarn]=useState(0);
 const [recive_result, setRecive_result]=useState(true);

useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
setUserID(user.uid);
onValue(ref(db, 'User/'+user.uid), snapshot=>{
    setAvatar(snapshot.val().Avatar);
    setUsername(snapshot.val().Username);
    setLastGame(snapshot.val().LastGame);
    setLobby_id(snapshot.val().Lobby_ID);
    setTicket(snapshot.val().Ticket);
    setTicketPrize(snapshot.val().TicketPrize);
    setOpponentID(snapshot.val().OpponentID);
if(snapshot.val().Ticket==='Yes'){
setgameWindow('findPlayer');
setfindtimecount(true);
}
else if(snapshot.val().Ticket==='Playing'){
setgameWindow('countdown');
setfindtimecount(false);
setSecondcountdown(6);
////Set Opponent Name and avatar
get(child(ref(db), 'User/'+snapshot.val().OpponentID)).then(snapshot=>{
setopponentAvatar(snapshot.val().Avatar);
setopponentName(snapshot.val().Username);
});
}
else if(snapshot.val().Ticket==='GameOver'){
setgameWindow('GameOver');
setBattleID(randomNumberInRange(6));
}
});

//////Add New option for check user activity lod
if(location.state){
  window.history.replaceState({}, document.title)
}
else{
  navigate('/lobby/'+gameMode);
};
}
else{
navigate('/lobby/'+gameMode);
};
});


///////Game Data Update and Start
if(Ticket==='Yes'){
//////Winnder Earn and Game Play set
get(child(ref(db), 'User/'+UserId)).then(snapshot=>{
setWinnerGamePlay(snapshot.val().GAMEPLAY);
setWinnerEarn(snapshot.val().TicketPrize-snapshot.val().EntryFee);
});

//////////////////////////////
//////////////////////////////

update(ref(db, 'Lobby/'+Lobby_ID), {
    Waiting: 1
});
//////Search Game Room
get(child(ref(db), 'Game_room/'+Lobby_ID)).then(snapshot=>{
if(snapshot.exists()){
snapshot.forEach(childsnapshot=>{
const OpponentID = childsnapshot.val().playerID;
if(OpponentID!==UserId){
///Remove GameRoom
remove(ref(db, 'Game_room/'+Lobby_ID+'/'+childsnapshot.val().roomID));
////Opponent Data && Update User
update(ref(db, 'User/'+OpponentID), {
    OpponentID: UserId,
    Ticket: 'Playing',
    My_roomID: 0
});

update(ref(db, 'User/'+UserId),{
  OpponentID: OpponentID,
  Ticket: 'Playing'
});
/////Update Lobby
get(child(ref(db), 'Lobby/'+Lobby_ID)).then(snapshot=>{
update(ref(db,  'Lobby/'+Lobby_ID), {
    Waiting: 'nowaiting',
    Playnow: ++snapshot.val().Playnow
 });
});
};
});
}
else{
update(ref(db, 'Game_room/'+Lobby_ID+'/'+Ms), {
    playerID: UserId,
    roomID: Ms
});
update(ref(db, 'User/'+UserId),{
    My_roomID : Ms
});
};
});
};
///Check Game Mode
if(gameMode==='ludo_classic'){
setGamemodID(1);
}
else if(gameMode==='ludo_short'){
setGamemodID(2);
}
else{
navigate('/lobby/'+gameMode);
};


},[db, navigate, gameMode, Ms, Lobby_ID, UserId, Ticket, BattleID, gameModeID, opponentID, Username, currentPlay, location]);


////time Count Find Player
if(secondsCount>=0){
    setTimeout(()=>{
    if(findtimecount===true){
    setsecoundsCount(secondsCount+1);
    }
    if(secondsCount>10){
    setStopButton(true);
    }
    },1000);
    };
    if(secondsCount>60){
    setsecoundsCount(0);
    setminuteConds(+minuteCounts+1)
    };

/////Taime Countdown
if(secondcountdown<=6&&secondcountdown>=1){
  if(secondcountdown===5){
    var audio3 = new Audio('/assets/audio/versus.mp3');
    audio3.play();
    }
    setTimeout(()=>{
    setSecondcountdown(secondcountdown-1);
 
    if(secondcountdown===4 || secondcountdown===3 || secondcountdown===2){
      var audio = new Audio('/assets/audio/timer.mp3');
      audio.play();
    }
   else if(secondcountdown===1){
    setgameWindow('gameFrame');
    var audio2 = new Audio('/assets/audio/screen-collapse.mp3');
     audio2.play();
    }
    }, 1000);
};

////////Replay Games
const handlereplay =()=>{
  get(child(ref(db), 'Lobby/'+Lobby_ID)).then(snapshot=>{
    const EntreFee = snapshot.val().EntryFee;
    const Prize = snapshot.val().Prize;
get(child(ref(db), 'User/'+UserId)).then( snapshot=>{
        const DEPOSITCASH = snapshot.val().DEPOSITCASH;
        const WINNINGSCASH = snapshot.val().WINNINGSCASH;
if(EntreFee<=DEPOSITCASH){
    update(ref(db, 'User/'+UserId), {
    DEPOSITCASH: DEPOSITCASH - EntreFee,
    EntryFee: EntreFee,
    TicketPrize: Prize,
    Ticket: 'Yes',
    Lobby_ID: Lobby_ID,
    LastGame: 0
    });
    }
else if(EntreFee<=WINNINGSCASH){
  update(ref(db, 'User/'+UserId), {
    WINNINGSCASH: WINNINGSCASH - EntreFee,
    EntryFee: EntreFee,
    TicketPrize: Prize,
    Ticket: 'Yes',
    Lobby_ID: Lobby_ID,
    LastGame: 0
    });
  }
else{
navigate('/lobby/'+gameMode);
  };
});
  });
  setMs(Date.now());
  setRecive_result(true);
};

//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

const game_result_Update =(e)=>{
  if(e.origin !== 'http://games.gamesclash.in'){ return; }
  const myObj = JSON.parse(e.data);
  if(myObj.winner_id===UserId){
    //window.removeEventListener("message", game_result_Update);
    setRecive_result(false);
    if(Ticket==='Playing'&&recive_result===true){
      var audio4 = new Audio('/assets/audio/victory.mp3');
      audio4.play();
            ////Winner Game History add
            get(child(ref(db), 'User/'+UserId)).then(snapshot=>{
              const WINNINGSCASH = +snapshot.val().WINNINGSCASH;
              const TicketPrize = +snapshot.val().TicketPrize;
              const ClosingBalance = +snapshot.val().TicketPrize+snapshot.val().WINNINGSCASH+snapshot.val().DEPOSITCASH;
            
              update(ref(db, 'Game-History/'+UserId+Ms),{
              GameBanner: gameModeID,
              Status: 'Won',
              Against: snapshot.val().Username,
              BattleID: BattleID,
              Symbol: '(+)',
              Earn: winnerEarn,
              ClosingBalance: ClosingBalance,
              Month: Month,
              Date: Dates,
              Time: strTime,
              PlayerID: UserId,
              Ms: Ms
            });
        
            //////UserData update
            update(ref(db, 'User/'+UserId), {
              WINNINGSCASH: +WINNINGSCASH+TicketPrize,
              GAMEPLAY:  +winnerGamaePlay+1,
              EntryFee: 0,
              Ticket: 'GameOver',
              TicketPrize: 0,
              LastGame: 'Won'
            }); 
        //////////Commision Add 
        get(child(ref(db), 'RefersID/'+snapshot.val().Inviter_code)).then(snapshot=>{
      if(snapshot.exists()){
        const InviterID = snapshot.val().UserID;
      get(child(ref(db), 'User/'+InviterID)).then(snapshot=>{
        const Commision_balence = winnerEarn/100;
      update(ref(db, 'User/'+InviterID),{
        WINNINGSCASH : +snapshot.val().WINNINGSCASH+Commision_balence
      });
      update(ref(db, 'Transaction/'+Ms), {
        UserID: InviterID,
        PaymentID: 'ref_' + BattleID,
        Amount: Commision_balence,
        Type: 'Referral',
        Through: 'by  ' + Username,
        Symbol: '(+)',
        Ms: Ms,
        Month: Month,
        Date: Dates,
        Time: strTime,
        Status: 'Complite'
      });
      });
      }});
        
        });
      
      ///////Losser Data Update 
      get(child(ref(db), 'User/'+opponentID)).then(snapshot=>{
       const ClosingBalances = +snapshot.val().WINNINGSCASH+snapshot.val().DEPOSITCASH;
       update(ref(db, 'Game-History/'+opponentID+Ms), {
        GameBanner: gameModeID,
        Status: 'Lost',
        Against: snapshot.val().Username,
        BattleID: BattleID,
        Symbol: '(-)',
        Earn: snapshot.val().EntryFee,
        ClosingBalance: ClosingBalances,
        Month: Month,
        Date: Dates,
        Time: strTime,
        PlayerID: opponentID,
        Ms: Ms
       });
       update(ref(db, 'User/'+opponentID), {
        GAMEPLAY:  +snapshot.val().GAMEPLAY+1,
        EntryFee: 0,
        Ticket: 'GameOver',
        TicketPrize: 0,
        LastGame: 'Won'
       });
      });
      
      /////Update Lobby
      get(child(ref(db), 'Lobby/'+Lobby_ID)).then(snapshot=>{
      const Playnow = snapshot.val().Playnow-2;
      if(Playnow<0){
        setcurrentPlay(0);
      }
      else{
        setcurrentPlay(Playnow);
      }
        update(ref(db,  'Lobby/'+Lobby_ID), {
            Waiting: 'nowaiting',
            Playnow: currentPlay
         });
        });
      };
};
};


//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
window.addEventListener( "message",  game_result_Update, false);
    
//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
//▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  return (
    <>
<div className="leftContainer">
<div className="main-area">
    {gameWindow==='findPlayer' ?
 <div className="FindPlayer_battleWrapper__2Y76v">
<div className="FindPlayer_container__31N5X">
<div className="FindPlayer_media__18CnS">
<div className="FindPlayer_playerWrap__97IOR">
<div className="FindPlayer_playerWrapContainer__2ioPK">
<img src="/assets/images/flash.svg" alt="flash" className="FindPlayer_flash__1gs2Z"/>
<img src="/assets/images/arcs.svg" alt="arc" className="FindPlayer_arc__JAu7T"/>
<div className="FindPlayer_playerDemo__3Q3lk" style={{top: '25%', left: '25%'}}>
<img className="FindPlayer_playerDemo1Img__2dBRf" src="/assets/avatar/Avatar1.png" alt="Avatar1"/>
</div>

<div className="FindPlayer_playerDemo__3Q3lk" style={{top: '25%', left: '65%'}}>
<img className="FindPlayer_playerDemo2Img__rP25Q" src="/assets/avatar/Avatar2.png" alt="Avatar2"/>
</div>
<div className="FindPlayer_playerDemo__3Q3lk" style={{top: '15%', left: '55%'}}>
<img className="FindPlayer_playerDemo3Img__3unXD" src="/assets/avatar/Avatar3.png" alt="Avatar3"/>
</div>
</div>
<div className="FindPlayer_myProfile__3TuGA">
<img id="Avatar" src={"/assets/avatar/Avatar"+avatar+".png"} alt="User avatar"/>
</div></div></div>
<div className="FindPlayer_content__z_Gsq">
  <div className="FindPlayer_searchCountDown__3eF1w">
<label>0{minuteCounts}</label>:<label id="seconds">{secondsCount>9?secondsCount:'0'+secondsCount}</label>
</div>
<div className="FindPlayer_findingOpp__3GJiz">Finding Opponents...</div>
 { stopButton===true?
<button className="btn btn-danger mt-3" style={{width: '160px'}} onClick={e=>navigate('/lobby/'+searchparms.get('games'))}>STOP FINDING</button>
: 
<></>
}
<div className="FindPlayer_tipsContainer__2BUPh">
<div className="FindPlayer_borderFrameContainer__2tQ8Z">
 <div className="FindPlayer_gradientBorder__8bSx_"></div>
<div className="FindPlayer_tipsDiv__1RpZg">
<div className="FindPlayer_tipsBody__3x2lI">Entry fees will be refunded if no  match is found.</div>
</div>
 <div className="FindPlayer_gradientBorder__8bSx_"></div></div>
</div>
<img src="/assets/images/logo-black.webp" alt="gzp_logo_white" width="130"/>
</div></div></div>

:
<></>
}

{gameWindow==='countdown'? 

<div className="FindPlayer_battleWrapper__2Y76v">
<div className="FindPlayer_container__31N5X">
<div className="FindPlayer_versusContainer__fr_AO">
<div className="FindPlayer_div1__pfLCj">
<div className="FindPlayer_playerWrapper1__2V1oq">
<div className="FindPlayer_playerWrap__97IOR">
<div className="FindPlayer_playerWrapperImg__RXQl6">
<img id="UserAvatar"  src={"/assets/avatar/Avatar"+avatar+".png"} alt="User avatar"/>
</div>
<div className="FindPlayer_playerName__3iEkE">You</div>
</div></div>
<div className="FindPlayer_versusImg__3Krpo">
<img src="/assets/images/versus.svg" alt="versus"/>
</div>
<div className="FindPlayer_playerWrapper2__21SfN">
<div className="FindPlayer_playerWrap__97IOR">
<div className="FindPlayer_playerWrapperImg__RXQl6">
<img alt="User avatar" id="OpponentAvatar" src={"/assets/avatar/Avatar"+opponentAvatar+".png"}/>
</div>
<div className="FindPlayer_playerName__3iEkE" >{opponentName}</div>
</div></div></div></div>
<div className="FindPlayer_content__z_Gsq">
<div className="FindPlayer_tipsContainer__2BUPh">
<div className="FindPlayer_borderFrameContainer__2tQ8Z">
<div className="FindPlayer_gradientBorder__8bSx_"></div>
<div className="FindPlayer_timer__2jeJJ">
<div className="FindPlayer_timerStartsIn__DvBMT">Starts in</div>
<div className="FindPlayer_timerCount__1cf8H" id="countdownstart">{secondcountdown}</div>
</div>
<div className="FindPlayer_gradientBorder__8bSx_"></div>
</div></div>
<img src="/assets/images/logo-black.webp" alt="gzp_logo_white" width="130"/>
</div>
</div>
</div>

:
<></>

}

{gameWindow==='gameFrame'? 
<div className="FindPlayer_gamePlay__1m05N" id="Gamebrods">
<iframe 
title="Classic Ludo" 
allow="autoplay *; microphone; fullscreen *"
allowFullScreen
scrolling="no"
frameBorder={0} 
id="Classicludo" 
src={'http://games.gamesclash.in/#?'+gameModeID+'?_?'+TicketPrize+'?_?'+UserId+'?_?'+Username+'?_?'+avatar+
'?_?'+opponentID+'?_?'+opponentName+'?_?'+opponentAvatar+'?'}
style={{zIndex: 'unset', background: '#000000'}}></iframe>
</div>
:
<></>
}


{gameWindow==='GameOver'?
<div className="FindPlayer_battleWrapper__2Y76v">
<div className="FindPlayer_container__31N5X">
<div className="GameOverScreen_container__20MV4 mt-3">
<div>
<img src="/assets/images/logo-black.webp" alt="gzp_logo_white" width="150"/>
<div className="mt-3">
<div className="GameOverScreen_result__1-Wy5" id="gamestatuss"></div>
</div></div>
<div className="GameOverScreen_playerList__8Gou7">

<div className="PlayerCard_box__2G4bn" id="winner">
<div className="PlayerCard_rank__3eQGp">#1</div>
<div className="PlayerCard_crown__31t2k">
<div style={{display: 'inline-block', zIndex: 1}}>
<img src="/assets/images/crown.svg" alt="User Crown"
style={{width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)'}}/>
 </div>
 <img className="PlayerCard_imgCircle__1x1t1"
 src={LastGame==='Won' ? "/assets/avatar/Avatar"+avatar+".png"
  : "/assets/avatar/Avatar"+opponentAvatar+".png"} alt="User avatar" />
</div>
<div className="PlayerCard_nameBox__2i3pC">
 <div id="winnername">{LastGame==='Won' ? Username : opponentName}</div>
<div>
<img className="mr-1" src="/assets/images/global-rupeeIcon.png" alt="" width="25px"/>
<span className="position-absolute"  style={{paddingTop: '3px'}} id="prize"></span>
</div> </div> </div>

 <div className="PlayerCard_box__2G4bn" id="losser">
<div className="PlayerCard_rank__3eQGp">#2</div>
<div className="PlayerCard_crown__31t2k">
<img className="PlayerCard_imgCircle__1x1t1"
src={LastGame==='Won' ? "/assets/avatar/Avatar"+opponentAvatar+".png" :
"/assets/avatar/Avatar"+avatar+".png"} alt="User avatar"/>
</div>
<div className="PlayerCard_nameBox__2i3pC">
  <div id="lossername">{LastGame==='Won'? opponentName : Username}</div>
<div>
<img className="mr-1" src="/assets/images/global-rupeeIcon.png" alt="" width="25px"/>
<span className="position-absolute" style={{paddingTop: '3px'}}>0</span></div>
 </div></div></div>
 <div className="refer-footer" style={{backgroundColor: 'unset'}}>
<button 
className="bg-green refer-button cxy w-100" 
onClick={handlereplay}>PLAY AGAIN</button>
</div></div>
<div className="FindPlayer_content__z_Gsq">
<img src="/assets/images/logo-black.webp" alt="gzp_logo_white" width="130"/>
</div></div></div>
:
<></>
}

</div>       
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div> 
    </>
  )
}

export default FindPlayer