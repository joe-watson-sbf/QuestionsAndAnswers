import React from 'react'
import Modal from './modal/Modal'

export const Answer = ({ answer, userId, onDelete }) => (
	<aside className="answer">
		<p>{answer.answer}</p>

		{userId === answer.userId &&

			<Modal
				title="Delete Answer"
				message="Are you sure you want to delete your answer?"
				deleteAction={() => onDelete(answer.questionId)}
				url={null}
			/>
		}

	</aside>
)
