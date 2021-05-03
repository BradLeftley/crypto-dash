import { Statistic, Card, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';
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
    const { value } = props;
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <Card >
            <Statistic
            title="Active"
            value={data.markets[0].ticker.lastPrice}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
            />
        </Card>
    );
}

export default PriceCard;
