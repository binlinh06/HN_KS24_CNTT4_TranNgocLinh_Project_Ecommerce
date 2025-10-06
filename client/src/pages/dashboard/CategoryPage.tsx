import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Select,
  Input,
  Modal,
  Form,
  message,
  Radio,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const initialData = [
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
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // ✅ Biến xác định đang thêm hay sửa
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // ======== Cột bảng ========
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
      render: (record: any) => (
        <Space>
          <Button type="text" danger icon={<DeleteOutlined />} />
          <Button
            type="text"
            style={{ color: "#facc15" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </Space>
      ),
    },
  ];

  // ======== Lọc theo trạng thái ========
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    if (value === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((d) => d.status === value));
    }
  };

  // ======== Tìm kiếm ========
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

  // ======== Mở modal thêm ========
  const handleOpenAdd = () => {
    setEditingCategory(null); // xóa dữ liệu cũ
    form.resetFields();
    setIsModalOpen(true);
  };

  // ======== Mở modal sửa ========
  const handleEdit = (record: any) => {
    setEditingCategory(record);
    form.setFieldsValue(record); // đổ dữ liệu vào form
    setIsModalOpen(true);
  };

  // ======== Lưu (Thêm hoặc Cập nhật) ========
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCategory) {
          // Cập nhật
          const updatedList = data.map((item) =>
            item.code === editingCategory.code ? { ...item, ...values } : item
          );
          setData(updatedList);
          setFilteredData(updatedList);
          message.success("Cập nhật danh mục thành công!");
        } else {
          // Thêm mới
          if (data.some((d) => d.code === values.code)) {
            message.error("Mã danh mục đã tồn tại!");
            return;
          }
          const updated = [...data, values];
          setData(updated);
          setFilteredData(updated);
          message.success("Thêm danh mục thành công!");
        }
        setIsModalOpen(false);
        form.resetFields();
        setEditingCategory(null);
      })
      .catch(() => {});
  };

  return (
    <>
      {/* Hàng 1 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh mục</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenAdd}
        >
          Thêm mới danh mục
        </Button>
      </div>

      {/* Hàng 2 */}
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
          allowClear
          className="!w-72"
        />
      </div>

      {/* Bảng */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        rowKey="code"
      />

      {/* Modal (Thêm / Cập nhật) */}
      <Modal
        title={
          <h3 className="font-semibold text-lg">
            {editingCategory ? "Cập nhật danh mục" : "Thêm mới danh mục"}
          </h3>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingCategory(null);
        }}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Mã danh mục"
            rules={[{ required: true, message: "Vui lòng nhập mã danh mục" }]}
          >
            <Input placeholder="Nhập mã danh mục" disabled={!!editingCategory} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue="active"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Radio.Group>
              <Radio value="active">Đang hoạt động</Radio>
              <Radio value="inactive">Ngừng hoạt động</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
                setEditingCategory(null);
              }}
            >
              Hủy
            </Button>
            <Button type="primary" onClick={handleSave}>
              {editingCategory ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
