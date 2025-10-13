import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Space, Select, Input, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../stores/stores";
import { getAllCategory } from "../../stores/slices/CategorySlice";
import { getAllProduct } from "../../stores/slices/ProductSlice";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { products, loading, error } = useSelector(
    (state: any) => state.product
  );
  const { categories } = useSelector((state: any) => state.category);

  // 🔹 Lấy dữ liệu khi load
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProduct());
  }, [dispatch]);

  // 🔹 Khi products thay đổi → cập nhật bảng
  useEffect(() => {
    setFilteredData(products);
  }, [products]);
  // 🔹 Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);
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
      render: (text: string) => (
        <Text strong>
          {text}
          {"đ"}
        </Text>
      ),
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

  // ======== Lọc theo trạng thái ========
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    if (value === "all") {
      setFilteredData(products);
    } else {
      setFilteredData(products.filter((d: any) => d.status === value));
    }
  };
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    if (value === "all") {
      setFilteredData(products);
    } else {
      const filtered = products.filter(
        (p: any) => p.categoryId === Number(value)
      );
      setFilteredData(filtered);
    }
  };

  // ======== Tìm kiếm ========
  const onSearch = (value: string) => {
    const searchData = products.filter((d: any) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(
      statusFilter === "all"
        ? searchData
        : searchData.filter((d: any) => d.status === statusFilter)
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
        {/* Lọc theo danh mục */}
        <Select
          defaultValue="all"
          className="w-48"
          onChange={handleCategoryChange}
        >
          <Option value="all">Tất cả danh mục</Option>
          {categories.map((c: any) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>

        {/* Lọc theo trạng thái */}
        <Select
          defaultValue="all"
          className="w-48"
          onChange={handleStatusChange}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Ngừng hoạt động</Option>
        </Select>

        {/* Ô tìm kiếm */}
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
        loading={loading}
        pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        rowKey="id"
      />
    </>
  );
}
