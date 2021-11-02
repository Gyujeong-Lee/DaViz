import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import DataList from './pages/DataList';
import DetailOverall from './pages/DetailOverall';
import DetailColumn from './pages/DetailColumn';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/datalist" component={DataList} />
        {/* dataset id 추가하기 */}
        <Route exact path="/1/detail/" component={DetailOverall} />
        <Route exact path="/1/detail/column" component={DetailColumn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
