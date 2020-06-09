import React from 'react';
import classes from './Menu.css';
export default (props) => {
  const cls = [classes.Menu];
  if (props.menu) {
    cls.push('fa fa-times');
    cls.push(classes.open);
  } else {
    cls.push('fa fa-bars');
  }
  return <i className={cls.join(' ')} onClick={props.onToggle} />;
};
