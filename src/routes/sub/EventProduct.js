import React from 'react';
import eventProductionData from '../../data/eventProductionData';

const EventProduct = ({ depthIndex, sectionRefs }) => {
  const dataForDepth = eventProductionData[depthIndex] || []; // 현재 depthIndex에 따라 데이터 가져오기

  return (
    <>
      <div className="sections"> {/* sections는 여기서 사용 */}
        {dataForDepth.map((item, index) => (
          <div
            key={index}
            className="scroll-tab inner"
            ref={(el) => (sectionRefs.current[index] = el)} // 섹션 참조 설정
          >
            <h3 className='section_title'><span>{item.listNum}.</span> {item.title}</h3>
            <div className='description_area'>
              {item.mainDescription && (
                <div className='main_description_area'>
                  {item.mainDescription.map((desc, idx) => (
                    <p key={idx} className='main_description'>{desc}</p>
                  ))}
                </div>
              )}
              {item.subDescription && (
                <div className='sub_description_area'>
                  {item.subDescription.map((desc, idx) => (
                    <p key={idx} className='sub_description'>{desc}</p>
                  ))}
                </div>
              )}
            </div>
            {item.asset && (
              <div className='image_area'>
                {Array.isArray(item.asset)
                  ? item.asset.map((img, idx) => <img key={idx} src={img} alt={`asset-${idx}`} />)
                  : <img src={item.asset} alt="asset" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default EventProduct;
