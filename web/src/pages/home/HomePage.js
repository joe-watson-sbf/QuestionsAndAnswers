import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../connexion/Auth'
const HomePage = () => {





  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '60vh'
      }}
      className="content">
      <h1> Home </h1>

      <p style={{ fontSize: '1.4rem', fontWeight: '300' }}>
        {Auth.currentUser ?
          <p>{"Welcome back " + Auth.currentUser.displayName}</p> :
          'Welcome to the question and answer blog'
        }

      </p>
      <Link to="/questions" className="button">
        View Questions
      </Link>

    </div>
  )
}
export default HomePage
