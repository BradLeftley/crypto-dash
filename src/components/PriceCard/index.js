import { Statistic, Card, Carousel, Divider } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import useFetch from "../../util/useFetch";
import { useQuery, gql } from "@apollo/client";
import GoalIndicator from "../GoalIndicator";
import xrp from "../../assets/xrp.png";
import eos from "../../assets/eos.png";
import zcash from "../../assets/zec.png";
import bch from "../../assets/bch.png";
import dash from "../../assets/dash.png";
import doge from "../../assets/doge.png";
import "antd/dist/antd.css";

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

function PriceCard(props) {
  const { value, marketSymbol, name, coingecko, targets = [] } = props;
  const { loading, error, data } = coingecko // decides which api to use
    ? useFetch(`https://api.coingecko.com/api/v3/coins/${marketSymbol}`)
    : useQuery(EXCHANGE_RATES, {
        variables: { marketSymbol },
      });
  if (error) return <p>Error :(</p>;

  const percentChange = coingecko
    ? data?.market_data.price_change_percentage_24h
    : data?.markets[0].ticker.percentChange;
  const price = coingecko
    ? data?.market_data.current_price.usd
    : data?.markets[0].ticker.lastPrice;
  const isNegative = percentChange?.toString().includes("-");
  return (
    <Card>
      <img src={data?.image?.small || ""} className="image" alt="Logo" />
      <Statistic
        title={name}
        value={percentChange}
        precision={2}
        valueStyle={isNegative ? { color: "#cf1322" } : { color: "#3f8600" }}
        prefix={isNegative ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
        suffix="%"
        loading={loading}
      />
      <Statistic value={price} prefix="$" precision={2} loading={loading} />
      <Divider style={{ margin: "17px 0" }} />

      <Carousel>
        {targets.map((target, index) => (
          <div>
            <Statistic
              title="Price Target"
              value={target}
              prefix="$"
              precision={0}
              loading={loading}
            />
            <GoalIndicator currentPrice={price} targetPrice={target} />
          </div>
        ))}
      </Carousel>
    </Card>
  );
}

export default PriceCard;
