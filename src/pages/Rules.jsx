import React from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';
import { Link } from 'react-router-dom';

function Rules() {
  return (
    <>
    <div className="leftContainer">
        <Hader/>

<div className="main-area" style={{paddingTop: '60px'}}>
<div className="m-3">
 <h3>GamesClash Classic Ludo Rules</h3>
<nav aria-label="breadcrumb">
<ol className="breadcrumb">
 <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
 <li className="breadcrumb-item active" aria-current="page">GamesClash Classic Ludo Rules</li>
 </ol>
</nav>
                    <div className="row">
                        <div className="col-12">
                            <h4>Game Rules:</h4>
                            <ol className="rules-list">
                                <li>Game will be conducted between 2 players.</li>
                                <li>Initially 2 pawns will be at open position to eliminate chance factor.</li>
                                <li>You will get "SIX" on dice roll, if your dice roll not got "SIX" for consecutive 10
                                    turns.</li>
                                <li>There will be 8 safe fixed places always present in the board, tokens present at
                                    these places cannot be captured.</li>
                                <li>No more than 1 token of same color can be at same place at same time except the safe
                                    positions as mentioned in rule no. 4.</li>
                                <li>For every turn in game, user have 30 seconds to play move, else your token will get
                                    moved automatically.</li>
                                <li>On disconnect/leaving from game, your turn will be automatically played for max 5
                                    times.</li>
                                <li>On sixth (6th) miss/timeout move, player will be considered as looser.</li>
                                <li>If all your tokens are at home and your opponent get disconnected, game will be
                                    considered as "cancelled".</li>
                                <li>If your opponent leaves/disconnect from game at starting or middle of game, result
                                    will be declared as mentioned below :<ul><b>50% Win</b>, if only 3 tokens are out
                                        from home or your score is less than 34.</ul>
                                    <ul><b>100% Win</b>, if atlest 4 tokens are out from home or your score is more than
                                        34.</ul>
                                </li>
                                <li>A player must have to record every game, and if any player is hacking or cheating in
                                    a game, please contact support with video proof.</li>
                                <li>If you don't have any proof against player cheating and error in the game, then you
                                    will be considered as lost for a particular battle.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default Rules