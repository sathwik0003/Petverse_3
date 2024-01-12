import React from 'react';
import Button from 'react-bootstrap/Button';

const DashBoardButton = (props) => {
  return (
    <Button variant="primary" size="lg">
      {props.buttonContent.icon}
      {props.buttonContent.desc}
    </Button>
  );
}

export default DashBoardButton;
