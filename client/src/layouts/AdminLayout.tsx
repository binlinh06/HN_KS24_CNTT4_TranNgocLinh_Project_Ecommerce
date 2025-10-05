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

  // lấy key hiện tại theo URL để highlight menu
  const pathKeyMap: Record<string, string> = {
    "/dashboard": "dashboard",
    "/categories": "categories",
    "/products": "products",
  };

  const selectedKey = pathKeyMap[location.pathname] || "dashboard";

  return (
    <Layout className="min-h-screen">
      <Sider width={200} theme="light" className="border-r border-r-gray-300">
        <div className="p-4 font-bold flex items-center gap-2 text-lg">
          <FireTwoTone twoToneColor="#eb2f96" /> Ecommerce
        </div>
        <Menu mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="dashboard" icon={<HomeFilled />}>
            <Link to="/dashboard"> Thống kê</Link>
          </Menu.Item>
          <Menu.Item key="categories" icon={<SwitcherOutlined />}>
            <Link to="/categories"> Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<FolderOutlined />}>
            <Link to="/products"> Sản phẩm</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="!bg-white !h-16 flex justify-end items-center pr-5 gap-5 border-b border-b-gray-300">
          <NotificationsIcon className="text-gray-400" />
          <Avatar src="https://i.pravatar.cc/300" />
        </Header>

        <Content className="m-4 ">
          <Outlet /> {/* Trang con render ở đây */}
        </Content>
      </Layout>
    </Layout>
  );
}
