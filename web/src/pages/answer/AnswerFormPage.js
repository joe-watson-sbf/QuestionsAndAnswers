import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../../components/Question'
import TextEditor from "../../components/TextEditor/TextEditor";

const FormPage = ({ dispatch, loading, redirect, match,hasErrors, question, userId }) => {

    
    const { id } = match.params
    const history = useHistory();
    const [answer, setAnswer] = useState();
    const [error, setError] = useState();


    const onSubmit = event => {
        event.preventDefault()
        const data = {
            "userId": userId,
            "questionId": id,
            "answer": answer
        }
        processData() === true && dispatch(postAnswer(data));
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
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }


    return (
        <section className="content">
            
            {renderQuestion()}

            <h1>New Answer</h1>

            <form onSubmit={onSubmit}>
                <div>
                    
                    <label htmlFor="answer">Answer</label>
                    <TextEditor  id="answer" action={setAnswer}/>
                </div>

                {
                    error && <div style={{color:"red", padding: 14 } }>
                                <p> {error} </p>
                            </div>
                }

                <button type="submit" className="button" disabled={loading} >
                    {loading ? "Saving ...." : "Save"}
                </button>

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