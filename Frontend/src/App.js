import { React, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';

import Home from './pages/Home';
import DataList from './pages/DataList';
import NotFound from './pages/NotFound';
import Footer from './layout/Footer';
import ScrollToTop from './utils/ScrollRestoration';
import LoadingDetail from './components/LoadingDetail';
import './App.css';

const DetailOverall = lazy(() => import('./pages/DetailOverall'));
const DetailColumn = lazy(() => import('./pages/DetailColumn'));

function App() {
  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="loading">
              <LoadingDetail size={75} />
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/datalist" component={DataList} />
            <Route exact path="/:id/detail/" component={DetailOverall} />
            <Route exact path="/:id/detail/column" component={DetailColumn} />
            <Route exact path="/*" component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </StylesProvider>
  );
}

export default App;
