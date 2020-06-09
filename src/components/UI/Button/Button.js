import React from 'react';
import classes from './Button.css';
export default (props) => {
  let cls = [classes.button, classes[props.type]];
  if (props.disabled) {
    cls = [classes.button, classes.disabled];
  }
  return (
    <button onClick={props.onClick} className={cls.join(' ')}>
      {props.children}
    </button>
  );
};
