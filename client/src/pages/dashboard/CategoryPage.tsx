import React, { useState } from "react";
import { Table, Button, Tag, Space, Select, Input } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const data = [
  { code: "DM001", name: "Quần áo", status: "active" },
  { code: "DM002", name: "Kính mắt", status: "inactive" },
  { code: "DM003", name: "Giày dép", status: "active" },
  { code: "DM004", name: "Thời trang nam", status: "inactive" },
  { code: "DM005", name: "Thời trang nữ", status: "inactive" },
  { code: "DM006", name: "Hoa quả", status: "inactive" },
  { code: "DM007", name: "Rau", status: "active" },
  { code: "DM008", name: "Điện thoại", status: "inactive" },
];

export default function CategoryPage() {
  const [filteredData, setFilteredData] = useState(data);
  const [statusFilter, setStatusFilter] = useState("all");

  const columns = [
    {
      title: <span className="text-gray-700">Mã danh mục</span>,
      dataIndex: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: <span className="text-gray-700">Tên danh mục</span>,
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string) => <Text strong>{text}</Text>,
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
        <h2 className="text-2xl font-bold">Danh mục</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm mới danh mục
        </Button>
      </div>

      {/* Hàng 2: Select + Search */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <Select
          defaultValue="all"
          className="w-40"
          onChange={handleStatusChange}
        >
          <Option value="all">Tất cả</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Ngừng hoạt động</Option>
        </Select>

        <Search
          placeholder="Tìm kiếm danh mục theo tên"
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
