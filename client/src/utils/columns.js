const columns = [
  {
    name: "ID",
    selector: "userId",
    width: "100px",
    //sortable: true,0
  },
  {
    name: "Name",
    selector: "name",
    //sortable: true,
    style: {
      fontWeight: "600",
    },
  },
  {
    name: "Age",
    selector: "age",
    //sortable: true,
    hide: "sm",
  },
  {
    name: "Gender",
    selector: "gender",
    //sortable: true,
    width: "150px",
    hide: "md",

  },
];

export default columns;