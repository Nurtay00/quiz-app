import React from 'react';
import classes from './Input.css';
function isInvalid({ valid, touched, validation }) {
  return !valid && validation && touched;
}
export default (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlfor = `${inputType}-${Math.random()}`;
  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlfor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlfor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'ведите верное значение'}</span>
      ) : null}
    </div>
  );
};
