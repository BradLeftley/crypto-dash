import { Timeline } from "react-twitter-widgets";

function BlockchainBacker(props) {
  return (
    <div>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "BCBacker",
        }}
        options={{
          height: "400",
        }}
      />
    </div>
  );
}

export default BlockchainBacker;
