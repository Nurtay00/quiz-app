import React, { Component } from 'react';
import classes from './List.css';
import Background from '../../UI/background/Background';
import { NavLink } from 'react-router-dom';

export default class List extends Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    console.log('auth', this.props.isAuthenticated);
    const cls = [classes.List];
    if (!this.props.menu) {
      cls.push(classes.close);
    }
    const links = [{ to: '/', label: 'список', exact: true }];
    if (this.props.isAuthenticated) {
      links.push({
        to: '/quiz-creator',
        label: 'создать список',
        exact: false,
      });
      links.push({ to: '/logout', label: 'выйти', exact: false });
    } else {
      links.push({ to: '/auth', label: 'авторизация', exact: false });
    }
    console.log('links', links);

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.menu ? <Background onClose={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
