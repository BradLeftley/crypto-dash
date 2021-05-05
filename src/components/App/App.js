import {  Row, Col } from 'antd';
import PriceCard from '../PriceCard'
import './App.css';
import 'antd/dist/antd.css';
import News from '../News';

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
        <h1>Cypto</h1>
    <Row gutter={16} justify="center">
      <Col span={4}>
        <PriceCard  name="Dash" marketSymbol="Binance:dash/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard  name="Xrp" marketSymbol="Binance:XRP/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard  name="Zcash" marketSymbol="Binance:ZEC/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard  name="Eos" marketSymbol="Binance:EOS/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard name="Bitcoin Cash" marketSymbol="Kraken:EOS/USD"/>
      </Col>
    </Row>
  </div>

  <News />
    </div>
  );
}

export default App;
