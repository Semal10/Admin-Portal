import { Menu } from "antd";

const handleLogout = () => {};

const menu = (
  <Menu style={{ borderRadius: "5px" }}>
    <Menu.Item
      key="0"
      style={{
        padding: "5px 20px",
        fontSize: "15px",
        cursor: "pointer",
        "&:hover": { backgroundColor: "white" },
      }}
      onClick={handleLogout}
    >
      Logout
    </Menu.Item>
  </Menu>
);

export default menu;
