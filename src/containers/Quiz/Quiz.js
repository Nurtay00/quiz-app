import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import Finished from '../../components/finished/finished';

import Loader from '../../components/UI/loader/loader';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryHandler,
} from '../../store/actions/quiz';
class Quiz extends Component {
  componentWillMount() {
    this.props.retryHandler();
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    console.log(this.props.quiz);
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <Finished
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryHandler: () => dispatch(retryHandler()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
