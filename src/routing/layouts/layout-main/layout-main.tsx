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
      key: "/accordion",
      label: <Link to="/accordion">Accordion</Link>,
    },
    {
      key: "/dir-files",
      label: <Link to="/dir-files">Directory & files</Link>,
    },
    {
      key: "/drag",
      label: <Link to="/drag">Drag</Link>,
    },
    {
      key: "/infinity-scroll",
      label: <Link to="/infinity-scroll">Infinity scroll</Link>,
    },
    {
      key: "/lazy-pic",
      label: <Link to="/lazy-pic">Lazy pictures</Link>,
    },
    {
      key: "/modal",
      label: <Link to="/modal">Modal</Link>,
    },
    {
      key: "/pagination",
      label: <Link to="/pagination">Pagination</Link>,
    },
    {
      key: "/slider",
      label: <Link to="/slider">Slider</Link>,
    },
    {
      key: "/tabs",
      label: <Link to="/tabs">Tabs</Link>,
    },
    {
      key: "/tic-tac-toe",
      label: <Link to="/tic-tac-toe">Tic-tac-toe</Link>,
    },
    {
      key: "/todo",
      label: <Link to="/todo">Todo</Link>,
    },
    {
      key: "/tooltip",
      label: <Link to="/tooltip">Tooltip</Link>,
    },
  ]

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu className={styles.menu} selectedKeys={[location.pathname]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
