import React from 'react'
import Modal from './modal/Modal'
import { Link } from 'react-router-dom'
import RenderHtml from './renderHtml/RenderHtml'

export const Question = ({ question, excerpt, onDelete, owner }) => {


	return (
		<article className={excerpt ? 'question-excerpt' : 'question'}>
			
			<RenderHtml data={question.question} tag="h2" />
			<RenderHtml data={question.category} tag="p"/>
			<RenderHtml data={question.type} tag="small"/>
			<br/><br/><br/>

			{onDelete && (
				<>
					<Modal
						title="Delete Question"
						message="Are you sure you want to delete your question?"
						deleteAction={() => onDelete(question.id)}
						urlView={`/question/${question.id}`}
						urlUpdate = {`/question/update/${question.id}`}
					>

					</Modal>

				</>

			)}

			{!owner && excerpt && (
				<Link to={`/question/${question.id}`} className="button">
					View Question
				</Link>
			)}
		</article>
	)
} 
