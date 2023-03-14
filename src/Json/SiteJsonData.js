export const nameData = [
    "khalid_man", 
    "Mirja_rana", 
    "Runa_hasan", 
    "Rakib Hasan", 
    "Sobuj_mia", 
    "Salman_khan", 
    "Shakib_khan", 
    "Imran_hasmi"];

export const avatarData = [
"1",
"2", 
"3", 
"4", 
"5", 
"6", 
"7", 
"8"];

export const randomNumberInRange = (length) =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  ////Month Date and time
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var date = new Date();
var Month = monthNames[date['getMonth']()];
var    Dates = date['getDate']();
var   hours = date['getHours']();
var   minutes = date['getMinutes']();
var   ampm = hours >= 0xc ? 'pm' : 'am';
var   hoursr = hours % 0xc;
var  hourse = hoursr ? hoursr : 0xc;
var  minutese = minutes < 0xa ? '0' + minutes : minutes;
var   strTime = hourse + ':' + minutese + '\x20' + ampm;

export {Month, Dates, strTime};