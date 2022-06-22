import React from 'react'
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import rootReducer from './reducers'
import './index.css'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App dispatch={store.dispatch}/>
  </Provider>
)
