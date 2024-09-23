import EventProduct from './sub/EventProduct';
import EventSetting from './sub/EventSetting';
import EventType from './sub/EventType';
import Fontpage from './sub/FontPage';
import '../styles/components/tab.scss'

const PageComponents = {
  '01': Fontpage,
  '02': EventType,
  '03': EventProduct,
  '04': EventSetting
};

export default PageComponents;
