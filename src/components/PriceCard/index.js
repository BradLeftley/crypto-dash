import { Statistic, Card, Carousel, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { useQuery, gql } from '@apollo/client';
import GoalIndicator from '../GoalIndicator'
import xrp from './xrp.png'
import eos from './eos.png'
import zcash from './zec.png'
import bch from './bch.png'
import dash from './dash.png'
import doge from './doge.png'
import 'antd/dist/antd.css';



const EXCHANGE_RATES = gql`
    query MarketTicker($marketSymbol: String!) {
    markets(marketSymbol: $marketSymbol) {
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

 // const { name } = props
    // Will move to component

    const coinsData = [
        {name: 'Xrp', image: xrp, target: [10, 55]},
        {name: 'Eos', image: eos, target: [94,354]},
        {name: 'Zcash', image: zcash, target: [2544, 4000,6600]},
        {name: 'Dash', image: dash, target: [3300,6700,28480]},
        {name: 'Bitcoin Cash', image: bch, target: [94,18312,76720]},
        {name: 'Doge', image: doge, target: [1,10,50]},
    ]

function PriceCard(props) {
    const { value, marketSymbol, name } = props;
    const { loading, error, data } = useQuery(EXCHANGE_RATES,{
        variables: { marketSymbol },
      });
     const coin = coinsData.filter(image => image.name === name)[0] || {};
    if (error) return <p>Error :(</p>;
    const isNegative = data?.markets[0].ticker.percentChange.includes('-');
    return (
        <Card >
            <img src={coin.image || ''} className="image" alt="Logo" />
            <Statistic
            title={name}
            value={data?.markets[0].ticker.percentChange}
            precision={2}
            valueStyle={isNegative? { color: '#cf1322' } : { color: '#3f8600' }}
            prefix={isNegative?  <ArrowDownOutlined /> : <ArrowUpOutlined /> }
            suffix="%"
            loading={loading}
            />
            <Statistic  value={data?.markets[0].ticker.lastPrice} prefix="$" precision={2} loading={loading} />
            <Divider style={{ margin: '17px 0' }}/>
            
            <Carousel >
            {coin.target.map((target, index) => (
                    <div>
                    <Statistic title="Price Target" value={target} prefix="$" precision={0} loading={loading} />
                    <GoalIndicator currentPrice={data?.markets[0].ticker.lastPrice} targetPrice={target} />
                    </div>
                ))}       
            </Carousel>
        </Card>
    );
}
   


export default PriceCard;