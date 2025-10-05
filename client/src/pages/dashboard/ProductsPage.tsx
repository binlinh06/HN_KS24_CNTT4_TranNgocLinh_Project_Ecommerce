import React, { useState } from "react";
import { Table, Button, Tag, Space, Select, Input } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const data = [
  {
    code: "SP001",
    name: "Iphone 12 Pro",
    price: "12.000.000",
    quantity: 10,
    discount: 0,
    status: "active",
  },
  {
    code: "SP002",
    name: "Samsung Galaxy X20",
    price: "21.000.000",
    quantity: 100,
    discount: 5,
    status: "inactive",
  },
  {
    code: "SP003",
    name: "Phone 8 Plus",
    price: "5.000.000",
    quantity: 10,
    discount: 0,
    status: "active",
  },
  {
    code: "SP004",
    name: "Iphone 14 Pro max",
    price: "25.000.000",
    quantity: 20,
    discount: 2,
    status: "inactive",
  },
  {
    code: "SP005",
    name: "Oppo X3",
    price: "2.000.000",
    quantity: 10,
    discount: 5,
    status: "inactive",
  },
  {
    code: "SP006",
    name: "Iphone 16",
    price: "20.000.000",
    quantity: 20,
    discount: 3,
    status: "inactive",
  },
  {
    code: "SP007",
    name: "Iphone 7 Plus",
    price: "4.000.000",
    quantity: 10,
    discount: 4,
    status: "active",
  },
  {
    code: "SP008",
    name: "Samsung S20 Ultra",
    price: "30.000.000",
    quantity: 15,
    discount: 2,
    status: "inactive",
  },
];

export default function ProductsPage() {
  const [filteredData, setFilteredData] = useState(data);
  const [statusFilter, setStatusFilter] = useState("all");

  const columns = [
    {
      title: <span className="text-gray-700">Mã sản phẩm</span>,
      dataIndex: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: <span className="text-gray-700">Tên sản phẩm</span>,
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: <span className="text-gray-700">Giá</span>,
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price.localeCompare(b.price),
      render: (text: string) => <Text strong>{text}{"đ"}</Text>,
    },
    {
      title: <span className="text-gray-700">Số lượng</span>,
      dataIndex: "quantity",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: <span className="text-gray-700">Giảm giá</span>,
      dataIndex: "discount",
      render: (text: string) => (
        <Text strong>
          {text}
          {"%"}
        </Text>
      ),
    },
    {
      title: <span className="text-gray-700">Trạng thái</span>,
      dataIndex: "status",
      render: (s: string) =>
        s === "active" ? (
          <Tag color="green" className="px-2 py-1 rounded-full">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Đang hoạt động
          </Tag>
        ) : (
          <Tag color="red" className="px-2 py-1 rounded-full">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Ngừng hoạt động
          </Tag>
        ),
    },
    {
      title: <span className="text-gray-700">Chức năng</span>,
      render: () => (
        <Space>
          <Button type="text" danger icon={<DeleteOutlined />} />
          <Button
            type="text"
            style={{ color: "#facc15" }}
            icon={<EditOutlined />}
          />
        </Space>
      ),
    },
  ];

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    if (value === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((d) => d.status === value));
    }
  };

  const onSearch = (value: string) => {
    const searchData = data.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(
      statusFilter === "all"
        ? searchData
        : searchData.filter((d) => d.status === statusFilter)
    );
  };

  return (
    <>
      {/* Hàng 1: Tiêu đề + nút thêm */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sản phẩm</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm mới sản phẩm
        </Button>
      </div>

      {/* Hàng 2: Select + Search */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <Select
          defaultValue="all"
          className="w-45"
          onChange={handleStatusChange}
        >
          <Option value="all">Lọc theo danh mục</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Ngừng hoạt động</Option>
        </Select>
        <Select
          defaultValue="all"
          className="w-45"
          onChange={handleStatusChange}
        >
          <Option value="all">Lọc theo trạng thái</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Ngừng hoạt động</Option>
        </Select>
        <Search
          placeholder="Tìm kiếm sản phẩm theo tên"
          onSearch={onSearch}
          className="!w-72"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8, position: ["bottomCenter"] }}
      />
    </>
  );
}
