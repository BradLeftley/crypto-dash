import { Statistic, Card, Carousel, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import useFetch from '../../util/useFetch'
import { useQuery, gql } from '@apollo/client';
import GoalIndicator from '../GoalIndicator'
import xrp from '../../assets/xrp.png'
import eos from '../../assets/eos.png'
import zcash from '../../assets/zec.png'
import bch from '../../assets/bch.png'
import dash from '../../assets/dash.png'
import doge from '../../assets/doge.png'
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
        {name: 'Bitcoin Cash', image: bch, target: [10500,18312,76720]},
        {name: 'Doge', image: doge, target: [1,10,50]},
    ]



function PriceCard(props) {
    const { value, marketSymbol, name, coingecko } = props;
    const { loading, error, data } = coingecko?  // decides which api to use
    useFetch(`https://api.coingecko.com/api/v3/coins/${marketSymbol}`) 
    : useQuery(EXCHANGE_RATES,{
        variables: { marketSymbol },
      });
     const coin = coinsData.filter(image => image.name === name)[0] || {};
    if (error) return <p>Error :(</p>;
        
    const percentChange = coingecko? data?.market_data.price_change_percentage_24h : data?.markets[0].ticker.percentChange;
    const price = coingecko? data?.market_data.current_price.usd : data?.markets[0].ticker.lastPrice;
    const isNegative = percentChange?.toString().includes("-");
    return (
        <Card >
            <img src={coin.image || ''} className="image" alt="Logo" />
            <Statistic
            title={name}
            value={percentChange}
            precision={2}
            valueStyle={isNegative? { color: '#cf1322' } : { color: '#3f8600' }}
            prefix={isNegative?  <ArrowDownOutlined /> : <ArrowUpOutlined /> }
            suffix="%"
            loading={loading}
            />
            <Statistic  value={price} prefix="$" precision={2} loading={loading} />
            <Divider style={{ margin: '17px 0' }}/>
            
            <Carousel >
            {coin.target.map((target, index) => (
                    <div>
                    <Statistic title="Price Target" value={target} prefix="$" precision={0} loading={loading} />
                    <GoalIndicator currentPrice={price} targetPrice={target} />
                    </div>
                ))}       
            </Carousel>
        </Card>
    );
}
   


export default PriceCard;
