import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    const [Footerlink, setFooterlink] = useState('footerlink_hide');
  return (
    <section className="footer">
    <div className="footer-divider"></div>

    <div className="px-3 py-4 d-block">
    <picture className=""><img width="120px" src="/assets/images/gamesclash-white.png" alt=""/></picture>
    <span className='homespan'> . Terms, Privacy, Support</span>
    <picture className="footer-arrow" >
    <img 
    width="21px" 
    src="/assets/images/global-grey-dropDown.png" 
    onClick={e=> Footerlink!=='footerlink_hide'?setFooterlink('footerlink_hide'): setFooterlink('footerlink_show')}
    className={Footerlink!=='footerlink_hide'? "transfrom180" : ""}
    alt="" />
    </picture>
    </div>
    
    <div className={"px-3 overflow-hidden "+Footerlink}>
    <div className="row footer-links">
    <Link className="col-6" to={"/term-condition"}>Terms &amp; Condition</Link>
    <Link className="col-6" to={"/privacy-policy"}>Privacy Policy</Link>
    <Link className="col-6" to={"/refund-policy"}>Refund/Cancellation Policy</Link>
    <Link className="col-6" to={"/contact-us"}>Contact Us</Link>
    <Link className="col-6" to={"/responsible-gaming"}>Responsible Gaming</Link>
    <Link className="col-6" to={"/platform-commission"}>Platform Commission</Link>
    </div></div>
    <div className="footer-divider"></div>
    <div className="px-3 py-4">
    <div className="footer-text-bold">About Us</div>
    <br />
    <div className="footer-text">
    GamesClash is a real-money gaming product owned and operated by Kaliber Private Limited ("GamesClash" or "We" or "Us" or "Our")
    </div>          
    <br/>
    <div className="footer-text-bold">Our Business &amp; Products</div>
    <br/>
    <div className="footer-text">
    We are an HTML5 game-publishing company and our mission is to make accessing games fast and easy by removing the friction of app-installs.
    </div>
    <br/>
    <div className="footer-text">   
     GamesClash is a skill-based real-money gaming platform accessible only for our users in India. It is accessible on "
    <a target="_blank" rel="noopener noreferrer" href="https://www.GamesClash.in">https://www.GamesClash.in</a>
    ". On GamesClash, users can compete for real cash in Tournaments and Battles. They can encash their winnings via popular options such as Paytm Wallet, Amazon Pay, Bank Transfer, Mobile Recharges etc.
    </div>
    <br/>
    <div className="footer-text-bold">Our Games</div>
    <br/>
    <div className="footer-text">
    GamesClash has a wide-variety of high-quality, premium HTML5 games. Our games are especially compressed and optimised to work on low-end devices, uncommon browsers, and patchy internet speeds.
    </div>
    <br/>
    <div className="footer-text">
    "We have games across several popular categories: Arcade, Action, Adventure, Sports &amp; Racing, Strategy, Puzzle &amp; Logic. We also have a strong portfolio of multiplayer games such as Ludo, Chess, 8 Ball Pool, Carrom, Tic Tac Toe, Archery, Quiz, Chinese Checkers and more! Some of our popular titles are: Escape Run, Bubble Wipeout, Tower Twist, Cricket Gunda, Ludo With Friends. If you have any suggestions around new games that we should add or if you are a game developer yourself and want to work with us, don't hesitate to drop in a line at "
    <a href="mailto:info@GamesClash.in">info@GamesClash.in</a>
    !"
    </div>
    </div></section>
  )
}

export default Footer