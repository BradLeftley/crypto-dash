import xrp from "../assets/xrp.png";
import eos from "../assets/eos.png";
import zcash from "../assets/zec.png";
import bch from "../assets/bch.png";
import dash from "../assets/dash.png";
import doge from "../assets/doge.png";

const coinsData = [
  { id: "ripple", name: "Xrp", image: xrp, target: [10, 23, 55] },
  { id: "eos", name: "Eos", image: eos, target: [94, 94, 354] },
  { id: "zcash", name: "Zcash", image: zcash, target: [2544, 4000, 6600] },
  { id: "dash", name: "Dash", image: dash, target: [3300, 6700, 28480] },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    image: bch,
    target: [10500, 18312, 76720],
  },
];

export const defaultlocalStorageCoinData = [
  { id: "ripple", name: "Xrp", target: [10, 23, 55] },
  { id: "eos", name: "Eos", target: [94, 94, 354] },
  { id: "zcash", name: "Zcash", target: [2544, 4000, 6600] },
  { id: "dash", name: "Dash", target: [3300, 6700, 28480] },
  { id: "bitcoin-cash", name: "Bitcoin Cash", target: [10500, 18312, 76720] },
];

export const getCoinsGraphData = (coins, index, priceData) => {
  return coins.map((item) => {
    const coinData = priceData.filter(
      (coin) => coin.id.toLowerCase() === item.id.toLowerCase()
    );
    const percentage =
      ((item.target[index] - coinData[0].current_price) /
        coinData[0].current_price) *
      100;
    const roundedPercent =
      Math.round((percentage + Number.EPSILON) * 100) / 100;
    return { name: item.name, percentage: roundedPercent };
  });
};

export default coinsData;
