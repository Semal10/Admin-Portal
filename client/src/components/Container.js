import React from "react";
import "../styles/App.css";
import { Profile, Close } from "../icons";
import { Drawer, Select, Button, Spin } from "antd";
import DataTable from "react-data-table-component";
import columns from "../utils/columns";
import customStyle from "../utils/customStyle";

const { Option } = Select;

const Container = ({
  list,
  visible,
  isEdit,
  isLoading,
  filteredOptions,
  handlePerRowsChange,
  handleChange,
  handlePageChange,
  handleAddCourse,
  showDrawer,
  onClose,
  item,
  tableCount,
  setItem,
  setIsEdit,
  setUpdatedCourses
}) => {
  return (
    <div className="container">
      <div className="filters">Academic Calender - Spring 2021</div>
      <div className="content">
        <DataTable
          columns={columns}
          data={list}
          width="100%"
          pagination={true}
          customStyles={customStyle}
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
          progressComponent={
            <div className="spin">
              <Spin size="large" />
            </div>
          }
        />
      </div>
      <Drawer
        title={<h2>Profile</h2>}
        placement="right"
        onClose={onClose}
        closable={true}
        closeIcon={
          <div style={{ width: "20px", position: "absolute", right: "30px" }}>
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
  );
};

export default Container;
