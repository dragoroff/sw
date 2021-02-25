import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

export default function CustomPagination(props) {
  const classes = useStyles();

  const handleChange = (event, value) => {
    props.handlePageChange(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        data-test="pagination"
        classes={{ ul: classes.ul }}
        count={props.count}
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}

CustomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
