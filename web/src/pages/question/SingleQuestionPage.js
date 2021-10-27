import React, { useEffect} from 'react'
import { connect } from 'react-redux'

import { fetchQuestion } from '../../actions/questionActions'
import { Question } from '../../components/Question'
import { Answer } from '../../components/Answer'
import { Link } from 'react-router-dom'
import { deleteAnswerByOwner } from '../../actions/questionActions'

const SingleQuestionPage = ({
	match,
	dispatch,
	question,
	hasErrors,
	loading,
	userId,
	redirect
}) => {
	const { id } = match.params

	useEffect(()=>{
		dispatch(fetchQuestion(id))
	}, [dispatch, id])

	useEffect(() => {
		if(redirect){
			dispatch(fetchQuestion(id))
		}
	}, [dispatch, id, redirect])

	const renderQuestion = () => {
		if (loading.question) return <p>Loading question...</p>
		if (hasErrors.question) return <p>Unable to display question.</p>

		return <Question question={question}/>
	}

	const onDeleteAnswer=(id)=>{
		dispatch(deleteAnswerByOwner(id));
	}

	const renderAnswers = () => {
		return (question.answers && question.answers.length) ? question.answers.map((answer, idx) => (
			<Answer key={idx} 
				answer={answer} 
				userId={userId} 
				onDelete={onDeleteAnswer}
			/>
		))

			:

		<p>Empty answer!</p>;
	}

	return (
		<section className="content">
			{renderQuestion()}
			{userId && <Link to={"/answer/" + id} className="button right">
				Reply
			</Link>}

			<h2>Answers</h2>
			{renderAnswers()}
		</section>
	)
}

const mapStateToProps = (state, action) => ({
	question: state.question.question,
	loading: state.question.loading,
	hasErrors: state.question.hasErrors,
	redirect: state.question.redirect,
	userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)
