import {  Row, Col } from 'antd';
import PriceCard from '../PriceCard'
import './App.css';
import 'antd/dist/antd.css';
import News from '../News';
import BarGraph from '../PotentialBarGraph';
import GrowthChart from '../GrowthChart';
import TreeMap from '../TreeMap';

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
        <h1>Cypto Dashboard</h1>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },16]} justify="center">
      <Col  xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard  name="Dash" marketSymbol="Binance:dash/USDT"/>
      </Col>
      <Col xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard  name="Xrp" marketSymbol="Binance:XRP/USDT"/>
      </Col>
      <Col xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard  name="Zcash" marketSymbol="Binance:ZEC/USDT"/>
      </Col>
      <Col xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard  name="Eos" marketSymbol="Binance:EOS/USDT"/>
      </Col>
      <Col xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard name="Bitcoin Cash" marketSymbol="bitcoin-cash" coingecko/>
      </Col>
      <Col xs={16} sm={12} md={8} lg={8} xl={4}>
        <PriceCard name="Doge" marketSymbol="Binance:DOGE/USDT"/>
      </Col>
    </Row>
  </div>
  
    <BarGraph />
    <GrowthChart/>
   <TreeMap />
  <News />
    </div>
  );
}

export default App;
