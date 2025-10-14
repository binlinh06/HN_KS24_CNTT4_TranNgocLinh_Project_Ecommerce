import { Layout, Menu, Avatar } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FireTwoTone,
  FolderOutlined,
  HomeFilled,
  SwitcherOutlined,
} from "@ant-design/icons";
import NotificationsIcon from "@mui/icons-material/Notifications";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const location = useLocation();

  // Lấy key hiện tại theo URL để highlight menu
  const pathKeyMap: Record<string, string> = {
    "/dashboard": "dashboard",
    "/categories": "categories",
    "/products": "products",
  };

  const selectedKey = pathKeyMap[location.pathname] || "dashboard";

  //Menu items theo format mới
  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeFilled />,
      label: <Link to="/dashboard">Thống kê</Link>,
    },
    {
      key: "categories",
      icon: <SwitcherOutlined />,
      label: <Link to="/categories">Danh mục</Link>,
    },
    {
      key: "products",
      icon: <FolderOutlined />,
      label: <Link to="/products">Sản phẩm</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider width={200} theme="light" className="border-r border-r-gray-300">
        <div className="p-4 font-bold flex items-center gap-2 text-lg">
          <FireTwoTone twoToneColor="#eb2f96" /> Ecommerce
        </div>
        <Menu mode="inline" selectedKeys={[selectedKey]} items={menuItems} />
      </Sider>

      <Layout>
        <Header className="!bg-white !h-16 flex justify-end items-center pr-5 gap-5 border-b border-b-gray-300">
          <NotificationsIcon className="text-gray-400" />
          <Avatar src="https://res.cloudinary.com/dcti4xpqa/image/upload/v1759127048/samples/animals/cat.jpg" />
        </Header>

        <Content className="m-4">
          <Outlet /> {/* Trang con render ở đây */}
        </Content>
      </Layout>
    </Layout>
  );
}
