import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchQuestion, updateQuestion, postQuestion } from '../../actions/questionActions'
import RenderHtml from '../../components/renderHtml/RenderHtml'
import TextEditor from '../../components/TextEditor/TextEditor'

const UpdateQuestion = ({
	match,
	dispatch,
	question,
	loading,
	redirect
}) => {
	const { id } = match.params

    const [message, setMessage] = useState();
    const [content, setContent] = useState();

	useEffect(()=>{
		dispatch(fetchQuestion(id))
	}, [dispatch, id])

	useEffect(() => {
		if(redirect){
			dispatch(fetchQuestion(id))
		}
	}, [dispatch, id, redirect])

	const onUpdate = (event) => {
        event.preventDefault();

        setMessage(processData);
        const data = question;
        data.question = content;
        processData()==="update" && dispatch(updateQuestion(data))
        processData()==="save" && dispatch(postQuestion(data))
        
	}

    const processData = () => {

        if(content===undefined || content.length<1){
            setMessage("The answer is required!");
            return 'denied';
        }
        if(question.answers.length>0){
            setMessage("Can't update the answer, " + 
            "but we're saved a new one successfully with your entry data!")
            return "save";
        }
        setMessage("Updated successfully!!!")
        return "update";
    }

    const renderAlert = (option) =>{
        return(
            <div style={{color:"blue", padding:8}}>
                {
                    <>
                        <p> {message} </p>
                        <Link to={`/list`} className="button"> Ok </Link>
                    </>
                    
                }
                
            </div>
        )
    }

    const renderInputForm = () =>{
        return(
            <>
                <RenderHtml tag='h2' data={question.question} />
            
                <br/> <br/>
                <form onSubmit={onUpdate}>
                    <div>
                        <label htmlFor="question">Update the question Page</label>
                        <TextEditor id="question" value="ok" action={setContent}/>
                    </div>
                    
                    
                    <button type="submit" className="button"> 
                    { loading ? "Updating" : "Update" }</button>
                </form>
            </>
        )
    }

    return(
        <section className="content">
            {message ? renderAlert() : renderInputForm() }
        </section>
    )


}


const mapStateToProps = state => ({
    loading: state.question.loading,
    question: state.question.question,
    redirect: state.question.redirect
})

export default connect(mapStateToProps)(UpdateQuestion)

