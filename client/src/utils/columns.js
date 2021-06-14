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
    hide: "sm",
  },
  {
    name: "Gender",
    selector: "gender",
    //sortable: true,
    // width: "100px",
    hide: "md",
  },
];

export default columns;