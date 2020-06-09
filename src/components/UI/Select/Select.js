import classes from './Select.css';
import React from 'react';

export default (props) => {
  const htmlFor = `${props.label}-${Math.random()}`;
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select value={props.value} id={htmlFor} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
