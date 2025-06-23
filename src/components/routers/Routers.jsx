import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import AdminDashboard from '../adminpage/AdminDashboard';
function Routers() {
  return (
<Routes>
<Route path='/' element={<LoginPage />} />
<Route path='/Home' element={<Home />} />
<Route path='/Admin' element={<AdminDashboard />} />
<Route path='/cart' element={<Layout><Cart /></Layout>} />
<Route path='/orders' element={<Layout><Orders /></Layout>} />
</Routes>
  );
}
 
export default Routers;