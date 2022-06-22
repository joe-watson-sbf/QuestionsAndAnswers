const URL_BASE = 'https://questionanswer-blog.herokuapp.com'; //'http://localhost:8080'  //
import axios from "axios";
export const LOADING = 'LOADING'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAILURE = 'LOADED_FAILURE'

export const loading = () => ({ type: LOADING })

export const success = payload => ({ type: LOADED_SUCCESS, payload });

export const failure = () => ({ type: LOADED_FAILURE })



export function fetchQuestions() {
    return async dispatch => {
        dispatch(loading())

        await axios.get(`${URL_BASE}/getAll`)
            .then(response => {
                dispatch(success({ questions: response.data, redirect: null }))
            })
            .catch(() => {
                dispatch(failure())
            })

    }
}

export function fetchOwnerQuestions(userId) {
    return async dispatch => {

        dispatch(loading())

        await axios.get(`${URL_BASE}/getOwnerAll/${userId}`)
            .then(response => {
                dispatch(success({ questions: response.data, redirect: null }))
            })
            .catch(() => {
                dispatch(failure())
            })

    }
}

export function fetchQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        await axios.get(`${URL_BASE}/get/${id}`)
            .then(response => {
                dispatch(success({ question: response.data, redirect: null }))
            })
            .catch(() => {
                dispatch(failure())
            })

    }
}

export function postQuestion(question) {
    return async dispatch => {
        dispatch(loading())

        await axios.post(`${URL_BASE}/create`, question)
            .then(response => {
                dispatch(success({ redirect: `/question/${response.data}` }));
            })
            .catch(() => {
                dispatch(failure())
            })

    }
}


export function updateQuestion(question) {
    return async dispatch => {
        dispatch(loading())

        await axios.put(`${URL_BASE}/update`, question)
            .then(response => {
                dispatch(success({ redirect: `/question/${response.data}` }));
            })
            .catch(() => {
                dispatch(failure())
            })
    }
}

export function deleteQuestion(id) {
    return async dispatch => {
        dispatch(loading())

        await axios.delete(`${URL_BASE}/delete/${id}`)
            .then(() => {
                dispatch(success({ redirect: `/list` }));
            })
            .catch(() => {
                dispatch(failure())
            })
    }
}


export function deleteAnswerByOwner(id) {
    return async dispatch => {
        dispatch(loading())
        await axios.delete(`${URL_BASE}/delete/answer/${id}`)
            .then(() => {
                dispatch(success({ redirect: `/question/${id}` }))
            })
            .catch(() => {
                dispatch(failure())
            })
    }
}



export function postAnswer(answer) {
    return async dispatch => {
        dispatch(loading())
        await axios.post(`${URL_BASE}/add`,answer)
            .then(() => {
                dispatch(success({ redirect: `/question/${answer.questionId}` }));
            })
            .catch(() => {
                dispatch(failure())
            })
    }
}



