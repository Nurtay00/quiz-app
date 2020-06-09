import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.css';
import Loader from '../../components/UI/loader/loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';
class QuizList extends Component {
  // componentDidMount() {
  //   axios
  //     .get('https://sdfs-d9937.firebaseio.com/quiz.json')
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }

  componentDidMount() {
    this.props.fetchQuizes();
  }
  render() {
    console.log(this.props.quizes);
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>
              {this.props.quizes.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink to={'/quiz/' + item.id}>Quiz {item.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
