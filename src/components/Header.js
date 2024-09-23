import '../styles/components/header.scss';

import { Link, useLocation } from 'react-router-dom';

import Logo from '../assets/logo.png';

function Header() {

  const location = useLocation();
  const getLinkClass = (path) => {
    return location.pathname === path ? 'gnb_link active' : 'gnb_link';
  };
  return (
    <>
      <div className='header_container'>
        <div className='inner'>
          <div className='header_title'>
            <Link to="/" className='header_link'>
              <img src={Logo} width={150} alt="교보문고" />
              <span className='text'>이벤트 관리도구 가이드</span></Link>
          </div>
          <ul className='header_gnb'>
            <li>   
              <Link to="/Page01" className={getLinkClass('/Page01')}>폰트/이벤트 유형</Link>
            </li>
            <li>
              <Link to="/Page02" className={getLinkClass('/Page02')}>사용자 메뉴얼</Link>
            </li>
           
          </ul>
        </div>
      </div>
    </>
  );
  }

export default Header;