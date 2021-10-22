import React from 'react'
import Modal from './modal/Modal'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete, owner }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <p>{question.category}  - <small>{question.type}</small></p>
   
    {onDelete && (
      <>
        <Modal
          title="Delete Question"
          message = "Are you sure you want to delete your question?"
          deleteAction = {()=> onDelete(question.id)}
          url={`/question/${question.id}`}
        />

      </>
      
    )}

    {!owner && excerpt && (
          <Link to={`/question/${question.id}`} className="button">
            View Question
          </Link>
      )}
  </article>
)
