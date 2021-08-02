import { Row, Col } from "antd";
import PriceCard from "../PriceCard";
import "./App.scss";
import "antd/dist/antd.css";
import News from "../News";
import BarGraph from "../PotentialBarGraph";
import GrowthChart from "../GrowthChart";
import BoxChart from "../BoxChart";
import TreeMap from "../TreeMap";
import PriceCardList from "../PriceCardList";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <div className="site-statistic-demo-card">
        <h1>Cypto Dash</h1>
      </div>
      
      <Content style={{ padding: '10px 50px' }}><PriceCardList /></Content>
        <Content style={{ padding: '10px 50px' }}><BarGraph /></Content>
        <Content style={{ padding: '10px 50px' }}><GrowthChart /></Content>
        <Content style={{ padding: '10px 50px' }}><TreeMap /></Content>
        <Content style={{ padding: '10px 50px' }}><News /></Content>
    </div>
  );
}

export default App;
