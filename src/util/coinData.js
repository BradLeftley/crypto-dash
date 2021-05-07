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
];

export const getCoinsGraphData = (index, priceData) =>{
    return coinsData.map((item)=>{
        if(priceData[item.name]){
            const percentage = (((item.target[index] - priceData[item.name][0].ticker.lastPrice)/priceData[item.name][0].ticker.lastPrice)*100)
            const roundedPercent = Math.round((percentage + Number.EPSILON) * 100) / 100;
            console.log(item.target[index], priceData[item.name][0].ticker.lastPrice, roundedPercent)
            return { name: item.name, percentage: roundedPercent, color: "red"}
        }
        return null;
    })
}

export default coinsData