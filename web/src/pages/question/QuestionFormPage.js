import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postQuestion } from '../../actions/questionActions'
import { connect } from 'react-redux'
import TextEditor from "../../components/TextEditor/TextEditor";

const FormPage = ({ dispatch, redirect, userId, loading }) => {

    const [question, setQuestion] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();


    const onSubmit = event => {
        event.preventDefault();
        const data = {
            "userId": userId,
            "question": question,
            "type": event.target.type.value,
            "category": event.target.category.value
        }

        processData()===true && dispatch(postQuestion(data));
    };

    const processData = () =>{
        return (question!==undefined && question.length > 1 && question.length <= 300) 
            ? true : setError("Erorr saving; maximum characters 300...");
            
    }

    useEffect(() => {
        if (redirect) {
            navigate(redirect);
        }
    }, [redirect])

    return (
        <section className="content">

            <h1>New Question</h1>
            <hr/>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="type">Type</label>
                    <select id="type">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category">
                        <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="question">Question</label>
                    <TextEditor id="question" action={setQuestion}/>
                </div>
                {
                    error && <div style={{color:"red", padding: 14 } }>
                                <p> {error} </p>
                            </div>
                }
                <div style={{marginTop:'2em'}}>
                    <button type="submit" className="button"> {loading ? 'Saving...' : 'Save'} </button>
                </div>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)