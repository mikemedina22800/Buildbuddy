import  { Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Network from './pages/Network/Network';
import Jobs from './pages/Jobs/Jobs';
import Alerts from './pages/Alerts/Alert';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/:id' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/:id/network' element={<Network/>}/>
          <Route path='/:id/jobs' element={<Jobs/>}/>
          <Route path='/:id/chat' element={<Chat/>}/>
          <Route path='/:id/alerts' element={<Alerts/>}/>
          <Route path='/:id/alerts' element={<Alerts/>}/>
          <Route path='/:id/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
