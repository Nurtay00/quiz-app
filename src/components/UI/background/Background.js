import React from 'react';
import classes from './Background.css';
export default (props) => {
  return <div className={classes.Backgound} onClick={props.onClose}></div>;
};
