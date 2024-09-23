import './styles/pages/page.scss'

import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='layout_container'>
      <div className="layout_header">
        <Header />
      </div>
      <main className='layout_main'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;