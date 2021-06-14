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
      fontSize: "16px",
    },
  },
};

export default customStyle;
