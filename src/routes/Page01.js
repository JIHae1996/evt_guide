import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import navigationData from '../data/navigation.json';
import pageComponents from './PageComponents';

import FontPage from './sub/FontPage';
import fontData from '../data/fontData'; 
import EventType from './sub/EventType';
import eventTypeData from '../data/eventTypeData'; 

function Page01() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [pageNumber, setPageNumber] = useState('01'); // 현재 페이지 번호
  const [depthIndex, setDepthIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0); // 현재 활성 탭 상태
  const [activeComponent, setActiveComponent] = useState(null); // 현재 보여줄 컴포넌트 상태
  const sectionRefs = useRef([]); // 섹션 참조 배열

  const pageData = navigationData.find(item => item.id === '01');

  useEffect(() => {
    setCurrentComponent(() => pageComponents['01']); // 기본 컴포넌트 설정
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const divElements = sectionRefs.current;
  
      for (let i = 0; i < divElements.length; i++) {
        const divElement = divElements[i];
        const { top } = divElement.getBoundingClientRect();
  
        // 섹션의 상단이 viewport의 상단에 도달할 때 활성 탭 업데이트
        if (top >= 0 && top < window.innerHeight / 2) {
          setActiveTab(i);
          break;
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const handleNavigationClick = (pagenumber, newDepthIndex) => {
    setPageNumber(pagenumber);
    setDepthIndex(newDepthIndex);
    
    // 클릭한 카테고리에 따라 보여줄 컴포넌트 설정
    if (pagenumber === '01') { // FontPage
      setActiveComponent(() => FontPage);
    } else if (pagenumber === '02') { // EventType
      setActiveComponent(() => EventType);
    } else {
      setActiveComponent(null); // 다른 카테고리 클릭 시 초기화
    }

    const Component = pageComponents[pagenumber];
    setCurrentComponent(() => Component);
  };

  // depthIndex에 맞는 데이터 가져오기
  const productionDataForDepth = fontData[depthIndex] || [];
  const typeDataForDepth = eventTypeData[depthIndex] || []; // EventType 데이터

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
      setActiveTab(index); // 활성 탭 업데이트
    }
  };

  // 컴포넌트 제목 설정
  const componentTitles = {
    FontPage: '타이틀 폰트 유형',
    EventType: '이벤트 유형',
  };

  return (
    <div className="pageLayout">
      <Navigation data={[pageData]} onCategoryClick={handleNavigationClick} />
      <div className='pageContents_wrap'>
        <div className='pageContents'>
          {currentComponent ? React.createElement(currentComponent) : "Select a category"}
          <div className='page_container'>
            <h2 className='page_title'>
              {activeComponent === FontPage ? componentTitles.FontPage : 
               activeComponent === EventType ? componentTitles.EventType : 
               '타이틀 폰트 유형'}
            </h2>
            {activeComponent && React.createElement(activeComponent, { depthIndex, sectionRefs })} {/* 조건부 렌더링 */}
          </div>
        </div>
      </div>
  
      <ul className="tab_container"> {/* tab_container */}
        {activeComponent === FontPage && productionDataForDepth.map((item, index) => (
          <li className='tab_item' key={index}>
            <button
              onClick={() => scrollToSection(index)} // scrollToSection 함수 사용
              className={activeTab === index ? 'active' : ''}
            >
              {item.title}
            </button>
          </li>
        ))}
        {activeComponent === EventType && typeDataForDepth.map((item, index) => (
          <li className='tab_item' key={index}>
            <button className={activeTab === index ? 'active' : ''}>
              {item.title} {/* EventType 데이터에서 제목을 가져옴 */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default Page01;
