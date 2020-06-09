import React, { Component } from 'react';
import classes from './Layout.css';
import Menu from '../../components/Navigation/Menu/Menu';
import List from '../../components/Navigation/List/List';
import { connect } from 'react-redux';
class Layout extends Component {
  state = {
    menu: false,
  };
  ToggleFunction = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };
  CloseByBackground = () => {
    this.setState({
      menu: false,
    });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <List
          menu={this.state.menu}
          onClose={this.CloseByBackground}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Menu menu={this.state.menu} onToggle={this.ToggleFunction} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}
export default connect(mapStateToProps)(Layout);
