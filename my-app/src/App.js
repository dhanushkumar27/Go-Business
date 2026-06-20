import {BrowserRouter,Routes,Route} from 'react-router-dom'

import LoginWrapper from './components/LoginWrapper'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Referral from './pages/Referral'
import NotFound from './pages/notFound'

import './App.css';

const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginWrapper/>}/>
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/referral/:id" element={<ProtectedRoute><Referral/></ProtectedRoute>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
)


export default App;