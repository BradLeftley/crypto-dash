import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PriceCard from '../PriceCard'
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
    <Row gutter={16 } justify="center">
      <Col span={4}>
        <PriceCard value={11.28} title="Dash" marketSymbol="Binance:XRP/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} title="Xrp" marketSymbol="Binance:dash/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} title="Zcash" marketSymbol="Binance:ZEC/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} title="Eos" marketSymbol="Binance:EOS/USDT"/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} title="Bitcoin Cash" marketSymbol="Binance:EOS/USDT"/>
      </Col>
    </Row>
  </div>
    </div>
  );
}

export default App;
