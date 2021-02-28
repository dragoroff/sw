import React from "react";
import PropTypes from "prop-types";

function CustomButton(props) {
  return (
    <>
      <button
        style={props.style}
        data-test={props.dataTest}
        className={props.classes}
        onClick={props.onClick}
      >
        {props.text.title}
      </button>
    </>
  );
}

CustomButton.propTypes = {
  style: PropTypes.object,
  dataTest: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

export default CustomButton;
