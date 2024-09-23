import './styles/common/index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Main from './routes/Main';
import Page01 from './routes/Page01';
import Page02 from './routes/Page02';

function AppRouter() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={< Main />} />
          <Route path="Page01" element={<Page01 />} />
          <Route path="Page02" element={<Page02 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;