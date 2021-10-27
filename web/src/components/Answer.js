import React from 'react'
import Modal from './modal/Modal'
import RenderHtml from './renderHtml/RenderHtml'

export const Answer = ({ answer, userId, onDelete }) => {

	return (
		<aside className="answer">
			
			<RenderHtml data={answer.answer} tag={"p"}/>

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
}