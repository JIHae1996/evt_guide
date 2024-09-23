import '../styles/pages/main.scss'

import { Link } from 'react-router-dom';

function main() {

    return (
      <div className='main_container'>
        <div className='inner'>
            <div className='intro_video_area'>
              <iframe width="710" height="480" src="https://www.youtube.com/embed/3n1J5KX1gX0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className='intro_text_area'>
              <strong>쉽고 빠르게, 교보문고 답게 이벤트를 만들어 보세요.</strong>
              <p>평균 제작 시간을 3일에서 10분으로 단축할 수 있습니다.</p>
            </div>  
            <div className='button_area'>
            <Link className='btn_link' to='/Page02'><span>사용자 메뉴얼 바로가기</span></Link>
            </div>
        </div>
      </div>
    );
    }
  
  export default main;