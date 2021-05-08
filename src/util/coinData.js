import xrp from '../assets/xrp.png'
import eos from '../assets/eos.png'
import zcash from '../assets/zec.png'
import bch from '../assets/bch.png'
import dash from '../assets/dash.png'
import doge from '../assets/doge.png'

const coinsData = [
    {name: 'Xrp', image: xrp, target: [10, 55]},
    {name: 'Eos', image: eos, target: [94,354]},
    {name: 'Zcash', image: zcash, target: [2544, 4000,6600]},
    {name: 'Dash', image: dash, target: [3300,6700,28480]},
    {name: 'Bitcoin Cash', image: bch, target: [10500,18312,76720]},
    {name: 'Dogecoin', image: doge, target: [1,10,50]},
];

export const getCoinsGraphData = (index, priceData) =>{
    return coinsData.map((item)=>{
            const coinData = priceData.filter((coin)=>coin.name.toLowerCase() === item.name.toLowerCase())
            const percentage = (((item.target[index] - coinData[0].current_price)/coinData[0].current_price)*100)
            const roundedPercent = Math.round((percentage + Number.EPSILON) * 100) / 100;
            return { name: item.name, percentage: roundedPercent}
        
    })
}

export default coinsData