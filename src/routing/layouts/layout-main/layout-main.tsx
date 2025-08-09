import { Layout, Menu, type MenuProps } from "antd"
import { Link, Outlet, useLocation } from "react-router"
import styles from "./layout-main.module.scss"

const { Content, Sider } = Layout

export const LayoutMain = () => {
  const location = useLocation()

  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "tooltip",
      label: <Link to="/tooltip">Tooltip</Link>,
    },
  ]

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu className={styles.menu} defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
