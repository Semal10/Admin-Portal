import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import DataTable from "react-data-table-component";
import { User, Student, Home, Manage, Arrow } from "./icons";
import { Drawer } from 'antd';
import 'antd/dist/antd.css';

const Dashboard = ({ isUser }) => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [visible , setVisible] = useState(false);
  const [item , setItem] = useState({});

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // if(!isUser){
  //     history.push('/login');
  // }
  // else{
  //     history.push('/dashboard');
  // }

  useEffect(() => {
    axios.get("http://localhost:8080/students").then((res) => {
      setList(res.data);
    });
  }, []);

  console.log(list);

  const columns = [
    {
      name: "ID",
      selector: "userId",
      sortable: true,
      width: "200px",
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      width: "300px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
      width: "200px",
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
      width: "100px",
    },
  ];

  const customStyle = {
    cells: {
      style: {
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        width: "800px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    headRow: {
      style: {
        width: "800px",
        borderBottomWidth: "0px",
        marginBottom: "10px",
        "&:nth-child(2)": {
          color: "#1e61dc",
        },
      },
    },
    header: {
      style: {
        display: "none",
      },
    },
    pagination: {
      style: {
        width: "800px",
      },
    },
  };

  return (
    <div className="dashboard-main">
      <div className="heading-line">
        <div className="left-headingline">
          <div className="left-heading">Stanford</div>
          <div className="navigations">
            <div className="home">
              <div className="home-icon">
                <Home />
              </div>
              <div className="home-title">Home</div>
            </div>
            <div className="manage">
              <div className="manage-icon">
                <Manage />
              </div>
              <div className="manage-title">Manage</div>
            </div>
          </div>
        </div>
        <div className="right-heading">
          <div className="user-profile">
            <User />
          </div>
          <div className="down-arrow">
            <Arrow />
          </div>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="second-line">
          <div className="student-icon">
            <Student />
          </div>
          <h1 className="student-heading">Students</h1>
          <div className="student-count">112</div>
        </div>
        <div className="container">
          <div className="filters"></div>
          <div className="content">
            <DataTable
              columns={columns}
              // customStyles={customStyles}
              data={list}
              customStyles={customStyle}
              width="1000px"
              pagination={true}
              onRowClicked={(e) => {
                  setItem(e);
                  showDrawer();  
                }}
              pointerOnHover={true}
              highlightOnHover={true}
            />
          </div>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            style={{ position: "absolute" }}
          >
            <p>{item.name}</p>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
