import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
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

        if (questionFound) {
            return (<Question key={questionFound.id} question={questionFound} excerpt />)
        } else {
            return questions.map(question => <Question key={question.id} question={question} excerpt />)
        }

    }

    const handleSearching = (event) => {
        setQuestionFound(null);

        var input = event.target.value.toLowerCase();
        if (input.length > 0) {

            const datas = questions.filter(data => 
                    (data.category.toLowerCase().includes(input) ||  data.question.toLowerCase().includes(input)));

            setListQuestion(datas)

        } else {
            setListQuestion(null);
        }
    }

    const handleEnterClick = (event) => {
        if (event.key === "Enter") {
            if (listQuestion) {
                setQuestionFound(listQuestion[0]);
                setListQuestion(null)
            }
        }
    }

    const handleSelectClick = (id) => {
        const question = listQuestion.filter(e => e.id === id);
        setQuestionFound(question[0]);
        setListQuestion(null)

    }

    return (
        <section className="content question-page">
            
            <Outlet/>
            <div className='en-tete'>
                <h1> All Question</h1>
            </div>

            <div>
                <input
                    type="search"
                    placeholder="Search by question"
                    onChange={handleSearching}
                    onKeyPress={handleEnterClick}
                />



                {listQuestion && <div className='seach-suggest'>
                    {listQuestion &&
                        listQuestion.map((data, idx) => {
                            return (
                                <div className='question' onClick={() => handleSelectClick(data.id)} key={idx}>
                                    <div className='item'>
                                        <strong className='category'> {data.category.toLowerCase()} </strong>

                                        <p className='text'
                                            dangerouslySetInnerHTML={{ __html: data.question }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>}
            </div>
            
            <div style={{marginTop:'2em'}}>
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
