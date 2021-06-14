import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import DataTable from "react-data-table-component";
import { User, Student, Home, Manage, Arrow, Profile, Close } from "./icons";
import { Drawer, Select, Button, Dropdown, Menu , Spin} from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const Dashboard = ({ isUser }) => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [updatedCourses, setUpdatedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableCount, setTableCount] = useState(0);
  const [isLoading , setIsLoading] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const availableCourses = [
    "Physics",
    "Maths",
    "Chemistry",
    "Biology",
    "Computer",
    "Arts",
    "Music",
    "Sports",
  ];

  const onClose = () => {
    setVisible(false);
    setIsEdit(false);
  };

  const handleLogout = () => {};

  // if(!isUser){
  //     history.push('/login');
  // }
  // else{
  //     history.push('/dashboard');
  // }

  useEffect(() => {
    // axios.get("http://localhost:8080/students").then((res) => {
    //   setList(res.data);
    // });
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/students?limit=${perPage}&page=${currentPage}`
      )
      .then((res) => {
        console.log("++++++++++++", res.data);
        setList(res.data.result);
        setTableCount(res.data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentPage, perPage]);

  console.log(availableCourses);

  const columns = [
    {
      name: "ID",
      selector: "userId",
      //sortable: true,0
    },
    {
      name: "Name",
      selector: "name",
      //sortable: true,
      // width: "300px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Age",
      selector: "age",
      //sortable: true,
      // width: "200px",
      hide: 'sm'
    },
    {
      name: "Gender",
      selector: "gender",
      //sortable: true,
      // width: "100px",
      hide: 'md'
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
        // width: "800px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    headRow: {
      style: {
        // width: "800px",
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
        maxWidth: "100%",
        width: "800px",
        fontSize: '16px'
      },
    },
  };

  console.log("------------------------------------", item);

  const handleAddCourse = () => {
    setIsEdit(false);
    item.courses = updatedCourses;
    delete item["_id"];
    axios
      .post("http://localhost:8080/courses/add", {
        userId: item.userId,
        courses: item.courses,
      })
      .then(
        (response) => {
          setItem(JSON.parse(JSON.stringify(item)));
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const handleChange = (value) => {
    setUpdatedCourses(value);
  };

  const filteredOptions = availableCourses.filter(
    (c) => !updatedCourses.includes(c)
  );

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

  const handlePerRowsChange = (limit) => {
    setPerPage(limit);
  };

  const handlePageChange = (page) => {
    console.log("Semal : ", page);
    setCurrentPage(page);
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
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
            placement="topRight"
          >
            <div className="down-arrow">
              <Arrow />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="second-line">
          <div className="student-icon">
            <Student />
          </div>
          <h1 className="student-heading">Students</h1>
          <div className="student-count">{tableCount}</div>
        </div>
        <div className="container">
          <div className="filters">Academic Calender - Spring 2021</div>
          <div className="content">
            {/* {isLoading ? <div className="spin"><Spin size="large" /></div> :  */}
            <DataTable
              columns={columns}
              // customStyles={customStyles}
              data={list}
              customStyles={customStyle}
              width="100%"
              pagination={true}
              paginationServer
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              paginationTotalRows={tableCount}
              onRowClicked={(e) => {
                setItem(e);
                showDrawer();
              }}
              pointerOnHover={true}
              highlightOnHover={true}
              progressPending={isLoading}
              progressComponent={<div className="spin"><Spin size="large" /></div>}
            />
            {/* } */}
          </div>
          <Drawer
            title={<h2>Profile</h2>}
            placement="right"
            onClose={onClose}
            closable={true}
            closeIcon={
              <div
                style={{ width: "20px", position: "absolute", right: "30px" }}
              >
                <Close />
              </div>
            }
            visible={visible}
            className="custom-antd-drawer"
            width={400}
            mask={false}
            getContainer={false}
            style={{ position: "fixed" }}
            contentWrapperStyle={{
              boxShadow: "0px 0px 0px 0px black",
              borderTop: "1px solid #F0F0F0",
              borderLeft: "1px solid #E0E0E0",
            }}
          >
            <div className="drawer-container">
              <div className="drawer-profile">
                <Profile />
              </div>
              <div className="drawer-info">
                <h1>{item.name}</h1>
                <div className="course-console">
                  <div className="course-title">Courses</div>
                  {!isEdit ? (
                    <></>
                  ) : (
                    <>
                      <div className="edit-mode">
                        <Select
                          mode="multiple"
                          defaultValue={item.courses}
                          style={{ width: "100%" }}
                          placeholder="Tags Mode"
                          onChange={handleChange}
                        >
                          {filteredOptions.map((course) => {
                            return (
                              <Option value={course} label={course}>
                                {course}
                              </Option>
                            );
                          })}
                        </Select>
                        <Button
                          onClick={handleAddCourse}
                          type="primary"
                          size="large"
                          shape="round"
                          className="ant-button"
                        >
                          Apply
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                {!isEdit ? (
                  <>
                    <div className="courses-list">
                      {item?.courses?.map((course, index) => {
                        return (
                          <div className="course" key={index}>
                            {course}
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      onClick={() => {
                        setIsEdit(true);
                        setUpdatedCourses(item.courses);
                      }}
                      type="primary"
                      size="large"
                      shape="round"
                      className="ant-button"
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
