import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MyIconImg from './MyIconImg/MyIconImg';

const AllLinks = [
	{
		to: "/",
		access: 'pp',
		name: "Home"
	},
	{
		to: "/questions",
		access: 'pp',
		name: "Questions"
	},
	{
		to: "/new",
		access: 'pri',
		name: "New"
	},
	{
		to: "/list",
		access: 'pri',
		name: "List"
	},
	{
		to: "/login",
		access: 'pub',
		name: "Login In"
	},
	{
		to: "/account",
		access: 'pri',
		name: "Update Profile"
	}

]

export const PublicNavbar = () => {

	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(!show);
	}

	const renderLinks = () => {
		return (AllLinks.filter(data => (data.access === 'pub' || data.access === 'pp'))).map((link, idx) => {
			return <Link key={idx} to={link.to}>{link.name}</Link>

		})
	}

	return (
		<nav className='public-nav'>
			<div>
				<MyIconImg />
			</div>
			<div className='links'>

				{renderLinks()}
			</div>

			<div className='hamburger' onClick={handleClick}>
				<button> {show ? 'X':'MENU'} </button>
				{show && <div className='mobile-menu'>
					{renderLinks()}
				</div>}
			</div>

		</nav>
	)
}

export const PrivateNavbar = (props) => {

	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(!show);
	}

	const renderLinks = () => {
		return (AllLinks.filter(data => (data.access === 'pri' || data.access === 'pp'))).map((link, idx) => {
			return <Link key={idx} to={link.to}>{link.name}</Link>

		})
	}

	return (
		<nav className='private-nav'>
			<div>
				<MyIconImg />
			</div>
			<div className='links'>
				{renderLinks()}
				{props.children}
			</div>

			<div className='hamburger' onClick={handleClick}>
			<button> {show ? 'X':'MENU'} </button>
				{show && <div className='mobile-menu'>
					{renderLinks()}
					{props.children}
				</div>}
			</div>
		</nav>
	)
}
