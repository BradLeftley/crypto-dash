import { Progress } from 'antd';
import 'antd/dist/antd.css';



function GoalIndicator(props) {
    const { targetPrice = 0, currentPrice = 0 } = props;
    const percentage = (currentPrice/targetPrice) * 100;
    return (
        <Progress type="circle" percent={percentage.toFixed(2)} />
    );
}

export default GoalIndicator;
