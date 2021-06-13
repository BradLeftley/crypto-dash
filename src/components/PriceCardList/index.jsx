import React, { useState, useEffect } from "react";
import {
  Row,
  Form,
  Col,
  Button,
  Modal,
  Select,
  InputNumber,
  Spin,
  Input,
  Radio,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import useFetch from "../../util/useFetch";
import useLocalStorage from "../../util/useLocalStorage";
import { defaultlocalStorageCoinData } from "../../util/coinData";
import PriceCard from "../PriceCard";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const createCoinsSelection = (data) => {
  return data.map((item) => <Option value={item.id}>{item.name}</Option>);
};

const createPriceCard = (data) => {
  return data.map((item) => (
    <Col xs={16} sm={12} md={8} lg={8} xl={4}>
      <PriceCard
        name={item.name}
        marketSymbol={item.id}
        coingecko
        targets={item.target}
      />
    </Col>
  ));
};

function PriceCardList() {
  const [coins, setCoins] = useLocalStorage(
    "coinData",
    defaultlocalStorageCoinData
  );
  const [isModalVisible, setIsModalVisible, isRemoveModalVisible] =
    useState(false);
  const { loading, error, data } = useFetch(
    `https://api.coingecko.com/api/v3/coins/list`
  );
  const [form] = Form.useForm();
  if (loading) return <Spin />;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const coin = data.filter((item) => values.coinId === item.id);
        setCoins([
          ...coins,
          {
            id: values.coinId,
            name: coin[0].name,
            target: [
              values.target1 || 0,
              values.target2 || 0,
              values.target3 || 0,
            ],
          },
        ]);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectFields = createCoinsSelection(data);
  console.log(coins);
  return (
    <>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} justify="center">
        {createPriceCard(coins)}
      </Row>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="Large"
        onClick={showModal}
      />
      <Button
        danger
        type="primary"
        shape="circle"
        icon={<MinusOutlined />}
        size="Large"
        onClick={showModal}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="coinId"
            label="Coin Name"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="search..."
              allowClear
            >
              {selectFields}
            </Select>
          </Form.Item>
          <Form.Item name="target1" label="target 1">
            <InputNumber defaultValue={0} />
          </Form.Item>
          <Form.Item name="target2" label="target 2">
            <InputNumber defaultValue={0} />
          </Form.Item>
          <Form.Item name="target3" label="target 3">
            <InputNumber defaultValue={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default PriceCardList;
