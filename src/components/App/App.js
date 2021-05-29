import {  Row, Col } from 'antd';
import PriceCard from '../PriceCard'
import './App.scss';
import 'antd/dist/antd.css';
import News from '../News';
import BarGraph from '../PotentialBarGraph';
import GrowthChart from '../GrowthChart';
import BoxChart from '../BoxChart';
import TreeMap from '../TreeMap';
import PriceCardList from '../PriceCardList';

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
        <h1>Cypto Dashboard</h1>
  </div>
  <PriceCardList/>
  
    <BarGraph />
    <GrowthChart/>
   {/* <PieChart /> */}
   
   <TreeMap />
  <News />
    </div>
  );
}

export default App;
