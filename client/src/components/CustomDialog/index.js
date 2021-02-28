import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import CustomButton from "../Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <div className="row">
        <div className="col-5">Share this link with your friends</div>
        <div className="col-7">{props.url}</div>
      </div>
    </div>
  );

  return (
    <div>
      <CustomButton
        dataTest="share"
        classes="btn btn-primary btn-sm mt-4"
        onClick={props.handleClick}
        text={{ title: "Share My Choices" }}
      />

      <Modal
        data-test="share-modal"
        open={props.open}
        onClose={props.handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}

SimpleModal.propTypes = {
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
