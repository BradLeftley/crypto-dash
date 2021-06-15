import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import BlockchainBacker from "../BlockchainBacker";
import BradleyAssets from "../BradleyAssets";
const { Meta } = Card;
import TrendingCoins from "../TrendingCoins";
import FearDial from "../FearDial"
function News() {
  return (
    <div className="container">
      <h1>News</h1>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
        <Col className="gutter-row" xs={16} sm={12} md={8} lg={8} xl={6}>
          <BlockchainBacker />
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
          <iframe
            width="100%"
            scrolling="yes"
            allowtransparency="true"
            frameborder="0"
            src="https://cryptopanic.com/widgets/news/?bg_color=FFFFFF&amp;font_family=sans&amp;header_bg_color=30343B&amp;header_text_color=FFFFFF&amp;link_color=0091C2&amp;news_feed=recent&amp;text_color=333333&amp;title=Latest%20News"
            height="350px"
          ></iframe>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
          {/* <TrendingCoins /> */}
          <FearDial />
          {/* <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" /> */}
        </Col>
      </Row>
    </div>
  );
}

export default News;
