import  { Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Network from './pages/Network/Network';
import Jobs from './pages/Jobs/Jobs';
import Alerts from './pages/Alerts/Alert';
import Chat from './pages/Chat/Chat';

function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/user/:id' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/user/:id/network' element={<Network/>}/>
          <Route path='/user/:id/:id/jobs' element={<Jobs/>}/>
          <Route path='/user/:id/chat' element={<Chat/>}/>
          <Route path='/user/:id/alerts' element={<Alerts/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
