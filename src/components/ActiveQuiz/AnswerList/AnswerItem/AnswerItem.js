import React from 'react';
import classes from './AnswerItem.css';
export default (props) => {
  const status = [classes.AnswerItem];
  if (props.statusOfAnswer) {
    status.push(classes[props.statusOfAnswer]);
  }
  const nameofcls = status.join(' ');
  return (
    <li
      className={nameofcls}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};
