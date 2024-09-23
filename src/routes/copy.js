import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import EventProduction from '../components/EventProduction';
import navigationData from '../data/navigation.json';
import pageComponents from './PageComponents';

function Page01() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [pageNumber, setPageNumber] = useState('01'); // 현재 페이지
  const [depthIndex, setDepthIndex] = useState(0); // 초기 depthIndex 설정

  const pageData = navigationData.find(item => item.id === '01');

  useEffect(() => {
    setCurrentComponent(() => pageComponents['01']); // 기본 컴포넌트 설정
  }, []);

  const handleNavigationClick = (pagenumber, newDepthIndex) => {
    setPageNumber(pagenumber);
    setDepthIndex(newDepthIndex); // depthIndex 업데이트
    const Component = pageComponents[pagenumber];
    setCurrentComponent(() => Component);
  };

  return (
    <div className="pageLayout">
      <Navigation data={[pageData]} onCategoryClick={handleNavigationClick} />
      <div className='pageContents_wrap'>
        <div className='pageContents'>
          {currentComponent ? React.createElement(currentComponent) : "Select a category"}
          <EventProduction pageNumber={pageNumber} depthIndex={depthIndex} />
        </div>
      </div>
    </div>
  );
}

export default Page01;
