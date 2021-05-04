import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PriceCard from '../PriceCard'
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
    <Row gutter={16} justify="center">
      <Col span={4}>
        <PriceCard value={11.28} name='XRP'/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} name='zcash'/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} name='eos'/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} name='bch'/>
      </Col>
      <Col span={4}>
        <PriceCard value={11.28} name='dash'/>
      </Col>
    </Row>
  </div>
    </div>
  );
}

export default App;
