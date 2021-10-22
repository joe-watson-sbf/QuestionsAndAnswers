import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../../actions/questionActions'
import { Question } from '../../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const [listQuestion, setListQuestion] = useState(null);
    const [questionFound, setQuestionFound] = useState(null);
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        if(questionFound){
            return (<Question key={questionFound.id} question={questionFound} excerpt />)
        }else{
            return questions.map(question => <Question key={question.id} question={question} excerpt />)
        }
        
    }

    const handleSearching = (event) => {
        setQuestionFound(null);
        var input = event.target.value.toUpperCase();
        if(input.length>0){

            const datas = questions.filter( data => {
                return (data!==undefined && data.category.includes(input)) && data.category
            });
            
            if(datas.length>0){
                setListQuestion(datas);
            }
            
        }else{
            setListQuestion(null);
        }
    }

    const handleEnterClick=(event) => {
        if(event.key === "Enter"){
            if(listQuestion){
                setQuestionFound(listQuestion[0]);
                setListQuestion(null)
            }
        }
    }

    const handleSelectClick=(event) => {

        const question = listQuestion.filter( e => e.id===event.target.id);
        setQuestionFound(question[0]);
        setListQuestion(null)

    }

    return (
        <section className="content">
            <h1>Questions</h1>
            <div>
                <input 
                    type="search" 
                    placeholder="Search by category" 
                    onChange={handleSearching}
                    onKeyPress={handleEnterClick}
                />
                
                
                <div className='seach-suggest'>
                    {listQuestion && 
                        listQuestion.map((data, idx) => {
                            return (
                                <p onClick={handleSelectClick} id={data.id} key={idx}> 
                                    {data.category.toLowerCase()}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {renderQuestions()}
            </div>
            
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
