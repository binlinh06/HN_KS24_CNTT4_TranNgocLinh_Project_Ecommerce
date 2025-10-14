import React, { useEffect, useState } from "react";
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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../stores/stores";
import { getAllProduct } from "../../stores/slices/ProductSlice";

import {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../../stores/slices/CategorySlice";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

export default function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: any) => state.category
  );
  const { products } = useSelector((state: any) => state.product);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form] = Form.useForm();

  //Lấy dữ liệu khi load
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProduct());
  }, [dispatch]);

  //Khi categories thay đổi → cập nhật bảng
  useEffect(() => {
    setFilteredData(categories);
  }, [categories]);

  //Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

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
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record)}
          />
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
      setFilteredData(categories);
    } else {
      setFilteredData(categories.filter((d: any) => d.status === value));
    }
  };

  // ======== Tìm kiếm ========
  const onSearch = (value: string) => {
    const searchData = categories.filter((d: any) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(
      statusFilter === "all"
        ? searchData
        : searchData.filter((d: any) => d.status === statusFilter)
    );
  };

  // ======== Mở modal thêm ========
  const handleOpenAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // ======== Mở modal sửa ========
  const handleEdit = (record: any) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // ======== Lưu (Thêm hoặc Cập nhật) ========
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingCategory) {
        const updatedCategory = { ...editingCategory, ...values };
        await dispatch(updateCategory(updatedCategory));
        alert("Cập nhật danh mục thành công!");
      } else {
        await dispatch(addCategory(values));
        alert("Thêm danh mục thành công!");
      }

      await dispatch(getAllCategory());
      setIsModalOpen(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (err) {
      console.error(err);
      alert("Lưu danh mục thất bại!");
    }
  };

  // ======== Mở modal xoá ========
  const openDeleteModal = (record: any) => {
    setSelectedCategory(record);
    setIsDeleteModalOpen(true);
  };

  // ======== Xác nhận xoá ========
  const handleConfirmDelete = async () => {
    try {
      //Kiểm tra xem danh mục có sản phẩm nào không
      const hasProducts = products.some(
        (p: any) => p.categoryId === selectedCategory.id
      );

      if (hasProducts) {
        alert("Không thể xoá! Danh mục này đang có sản phẩm liên quan.");
        return;
      }

      //Nếu không có sản phẩm thì cho phép xoá
      await dispatch(deleteCategory(selectedCategory.id));
      await dispatch(getAllCategory());
      alert("Xoá danh mục thành công!");
      setIsDeleteModalOpen(false);
    } catch {
      alert("Xoá thất bại!");
    }
  };

  return (
    <>
      {/* Hàng 1 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh mục</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAdd}>
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
            rules={[
              { required: true, message: "Vui lòng nhập mã danh mục" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  // Nếu đang thêm mới và mã đã tồn tại
                  const isDuplicate =
                    !editingCategory &&
                    filteredData.some((d) => d.code === value.trim());

                  if (isDuplicate) {
                    return Promise.reject(new Error("Mã danh mục đã tồn tại!"));
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder="Nhập mã danh mục"
              disabled={!!editingCategory}
            />
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

      {/* Modal Xoá */}
      <Modal
        title={
          <span className="text-lg font-semibold text-red-600">
            <ExclamationCircleOutlined className="mr-2 text-red-500" />
            Xác nhận xoá
          </span>
        }
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
        centered
      >
        <p>
          Bạn có chắc chắn muốn xoá sản phẩm <b>{selectedCategory?.name}</b>{" "}
          không?
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setIsDeleteModalOpen(false)}>Huỷ</Button>
          <Button danger type="primary" onClick={handleConfirmDelete}>
            Xoá
          </Button>
        </div>
      </Modal>

      {/* Bảng */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        rowKey="id"
      />
    </>
  );
}