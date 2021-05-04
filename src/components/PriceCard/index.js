import { Statistic, Card, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';
import xrp from './xrp.png'
import eos from './eos.png'
import zcash from './zec.png'
import bch from './bch.png'
import dash from './dash.png'
import 'antd/dist/antd.css';



const EXCHANGE_RATES = gql`
    query MarketTicker {
    markets(marketSymbol:"Binance:XRP/USDT") {
        ticker {
        percentChange
        lastPrice
        lowPrice
        highPrice
        baseVolume
        quoteVolume
        }
    }
}
`;

function PriceCard(props) {
    const { value, name } = props;
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Card >
            {IconFinder(name)}
            <Statistic
            title={name}
            value={data.markets[0].ticker.lastPrice}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
            />
        </Card>
    );
}

function IconFinder(name) {
    // const { name } = props
    // Will move to component

    const images = [
        {name: 'XRP', image: xrp},
        {name: 'eos', image: eos},
        {name: 'zcash', image: zcash},
        {name: 'dash', image: dash},
        {name: 'bch', image: bch},
    ]

     const result = images.filter(image => image.name === name)

     return result[0] ?  <img src={result[0].image} className="image" alt="Logo" /> : ''
}

export default PriceCard;
