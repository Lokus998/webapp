import './App.css';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import AddFound from './pages/AddFound';
import WithdrawFunds from './pages/WithdrawFunds';
import TransactionHistory from './pages/TransactionHistory';
import Lobby from './pages/Lobby';
import Rules from './pages/Rules';
import FindPlayer from './pages/FindPlayer';
import GameHistory from './pages/GameHistory';
import ReferEarn from './pages/ReferEarn';
import Notification from './pages/Notification';
import Support from './pages/Support';
import Dashbord from './pages/admin-panel/Dashbord';
import AddLobby from './pages/admin-panel/AddLobby';
import AdminLooby from './pages/admin-panel/AdminLooby';
import DepositAll from './pages/admin-panel/DepositAll';
import DepositPending from './pages/admin-panel/DepositPending';
import WithdrawAll from './pages/admin-panel/WithdrawAll';
import WithdrawPending from './pages/admin-panel/WithdrawPending';

function App() {
  return (
  <BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/profile' element={<Profile/>}></Route>
  <Route path='/wallet' element={<Wallet/>}></Route>
  <Route path='/add-funds' element={<AddFound/>}></Route>
  <Route path='/withdraw-funds' element={<WithdrawFunds/>}></Route>
  <Route path='/transaction-history' element={<TransactionHistory/>}></Route>
  <Route path='/lobby/:id' element={<Lobby/>}></Route>
  <Route path='/rules/:id' element={<Rules/>}></Route>
  <Route path='/find-player' element={<FindPlayer/>}></Route>
  <Route path='/game-history' element={<GameHistory/>}></Route>
  <Route path='/refer-earn' element={<ReferEarn/>}></Route>
  <Route path='/notification' element={<Notification/>}></Route>
  <Route path='/support' element={<Support/>}></Route>
  <Route path='/admin-panel' element={<Dashbord/>}></Route>
  <Route path='/admin-panel/add-lobby/' element={<AddLobby/>}></Route>
  <Route path='/admin-panel/lobby/:id' element={<AdminLooby/>}></Route>
  <Route path='/admin-panel/deposit-all' element={<DepositAll/>}></Route>
  <Route path='/admin-panel/deposit-pending' element={<DepositPending/>}></Route>
  <Route path='/admin-panel/withdraw-all' element={<WithdrawAll/>}></Route>
  <Route path='/admin-panel/withdraw-pending/' element={<WithdrawPending/>}></Route>
  <Route path='*' element={<NotFound/>}></Route>
  
</Routes>
</BrowserRouter>
  );
}

export default App;
