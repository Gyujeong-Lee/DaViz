import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';
import Home from './pages/Home';
import DataList from './pages/DataList';
import DetailOverall from './pages/DetailOverall';
import DetailColumn from './pages/DetailColumn';
import Footer from './layout/Footer';
import ScrollToTop from './utils/ScrollRestoration';
import './App.css';

function App() {
  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/datalist" component={DataList} />
          <Route exact path="/:id/detail/" component={DetailOverall} />
          <Route exact path="/:id/detail/column" component={DetailColumn} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </StylesProvider>
  );
}

export default App;
