import "../styles/App.css";

import React, { useState, useEffect } from "react";
import Container from "./Container";
import axios from "axios";
import { useHistory } from "react-router";
import { User, Student, Home, Manage, Arrow } from "../icons";
import { Dropdown } from "antd";
import availableCourses from "../utils/courses";
import menu from "../utils/menu";
import "antd/dist/antd.css";

const Dashboard = ({ userState }) => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [updatedCourses, setUpdatedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableCount, setTableCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setIsEdit(false);
  };

  useEffect(() => {
    console.log(userState);
    if(userState.type==='Failure'){
        history.push('/login');
    }
    else if(userState.type==='Success'){
        history.push('/dashboard');
    }
    else{
        return(
            <div>Loading...</div>
        );
    }
  },[userState])

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/students?limit=${perPage}&page=${currentPage}`,
        { withCredentials: true }
      )
      .then((res) => {
        setList(res.data.result);
        setTableCount(res.data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentPage, perPage]);

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

  const handlePerRowsChange = (limit) => {
    setPerPage(limit);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredOptions = availableCourses.filter(
    (c) => !updatedCourses.includes(c)
  );

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
        {true? <><Container
          list={list}
          visible={visible}
          isEdit={isEdit}
          isLoading={isLoading}
          filteredOptions={filteredOptions}
          handlePerRowsChange={handlePerRowsChange}
          handleChange={handleChange}
          handlePageChange={handlePageChange}
          handleAddCourse={handleAddCourse}
          showDrawer={showDrawer}
          onClose={onClose}
          item={item}
          tableCount={tableCount}
          setItem={setItem}
          setIsEdit={setIsEdit}
          setUpdatedCourses={setUpdatedCourses}
        /></> : <><h1 className='unauthorized'>You Are Unauthorized! Go Back To Studies :)</h1></>}
        
      </div>
    </div>
  );
};

export default Dashboard;
