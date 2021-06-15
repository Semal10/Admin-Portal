import { Menu } from "antd";
import axios from 'axios';
import { SERVER_ORIGIN } from "../config";

const handleLogout = () => {
    axios.post(`${SERVER_ORIGIN}users/logout`,{},{
        withCredentials:true
    }).then(response => {
        window.location.reload();
    }).catch(err => {
        console.log(err);
    });
};

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
