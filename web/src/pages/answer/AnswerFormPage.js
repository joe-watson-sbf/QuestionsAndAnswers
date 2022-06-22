import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../../components/Question'
import TextEditor from "../../components/TextEditor/TextEditor";

const FormPage = ({ dispatch, loading, redirect,hasErrors, question, userId }) => {

    
    const { id } = useParams()
    const navigate = useNavigate();
    const [answer, setAnswer] = useState();
    const [error, setError] = useState();


    const onSubmit = event => {
        event.preventDefault()
        const data = {
            "userId": userId,
            "questionId": id,
            "answer": answer
        }
        processData(data) === true && dispatch(postAnswer(data));
    };

    const processData=(data)=>{
        return (answer!==undefined && answer.length > 1 && answer.length <= 300) 
        ? true : setError("The answer is required");
    }



    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            navigate(redirect);
        }
    }, [redirect, navigate])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }


    return (
        <section className="content">
            
            {renderQuestion()}

            <hr/>
            <h1> Add A Comment </h1>
            

            <form onSubmit={onSubmit}>
                <div>
                    
                    <label htmlFor="answer">Comment</label>
                    <TextEditor  id="answer" action={setAnswer}/>
                </div>

                {
                    error && <div style={{color:"#f0c88c", padding: 14 } }>
                                <p> {error} </p>
                            </div>
                }

                <div style={{marginTop: '1em' } }>
                <button type="submit" className="button" disabled={loading} >
                    Send
                </button>
                </div>

                

            </form>

        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)