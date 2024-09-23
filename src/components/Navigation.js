import React, { useState, useEffect, useRef } from 'react';
import icons from '../data/loadIcons';
import '../styles/components/navigation.scss';

function Navigation({ data, onCategoryClick }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [activeDepth, setActiveDepth] = useState(null);
  const initialized = useRef(false); 

  useEffect(() => {
    if (!initialized.current && data.length > 0) {
      let initialOpenCategory = null;
      let initialActiveDepth = 0;

      // depth가 있는 첫 번째 카테고리 선택
      const firstCategoryWithDepth = data
        .flatMap(category => category.categories)
        .find(cat => cat.depth.length > 0);
      if (firstCategoryWithDepth) {
        initialOpenCategory = firstCategoryWithDepth.pagenumber;
        initialActiveDepth = 0; // 첫 번째 depthIndex
      } else {
        // depth가 없는 첫 번째 카테고리 선택
        const firstCategoryWithoutDepth = data
          .flatMap(category => category.categories)
          .find(cat => cat.depth.length === 0);
        if (firstCategoryWithoutDepth) {
          initialOpenCategory = firstCategoryWithoutDepth.pagenumber;
          initialActiveDepth = 0;
        }
      }

      setOpenCategory(initialOpenCategory);
      setActiveDepth(initialActiveDepth);
      onCategoryClick(initialOpenCategory, initialActiveDepth);
      initialized.current = true;
    }
  }, [data, onCategoryClick]);

  const toggleCategory = (pagenumber) => {
    setOpenCategory(prevOpenCategory => 
      prevOpenCategory === pagenumber ? null : pagenumber
    );
  };

  const handleCategoryClickInternal = (pagenumber, hasDepth, depthItems) => {
    toggleCategory(pagenumber);
    if (hasDepth && depthItems.length > 0) {
      setActiveDepth(0); // 첫 번째 depthIndex로 초기화
      onCategoryClick(pagenumber, 0);
    } else {
      setActiveDepth(null);
      onCategoryClick(pagenumber, 0); // depth가 없을 때는 기본 인덱스로 설정
    }
  };

  const handleDepthItemClick = (depthIndex, pagenumber) => {
    console.log('Clicked depthIndex:', depthIndex); // 로그 추가
    setActiveDepth(depthIndex);
    onCategoryClick(pagenumber, depthIndex);
  };
  

  const getIconPath = (icon) => {
    return icons[icon] || null;
  };

  if (!data || data.length === 0) {
    return <div className="nav_container">No navigation data available</div>;
  }

  return (
    <div className="nav_container">
      <nav>
        <ul>
          {data.map((category) => (
            <React.Fragment key={category.id}>
              {category.categories.map((cat) => (
                <li
                  key={cat.pagenumber}
                  className={cat.depth.length > 0 ? (openCategory === cat.pagenumber ? 'parent on' : 'parent') : 'parent'}
                >
                  <div onClick={() => handleCategoryClickInternal(cat.pagenumber, cat.depth.length > 0, cat.depth)}>
                    <div>
                      <span className='navIcon'>
                        <img src={getIconPath(cat.icon)} alt="nav icon" />
                      </span>
                      <span>{cat.name}</span>
                    </div>
                    <div>
                      {cat.depth.length > 0 && (
                        <span className='arrow'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15.625 7.74994L14.7113 6.875L10 11.375L5.28877 6.875L4.375 7.74994L10 13.125L15.625 7.74994Z"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                  {cat.depth.length > 0 && (
                    <ul>
                      {cat.depth.map((depthItem, depthIndex) => (
                        <li
                          key={depthIndex}
                          onClick={() => handleDepthItemClick(depthIndex, cat.pagenumber)}
                          className={activeDepth === depthIndex ? 'active' : ''}
                        >
                          {depthItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
