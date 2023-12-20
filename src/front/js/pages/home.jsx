import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom"

export const Home = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (store.loginRes.includes('success')) {
			navigate('/private')
		}

		if (store.newUserRes == "success") {
			setMsg("User Created")
			setAlertColor("alert alert-success")
		}

		if (localStorage.access_token == "logOut") {
			setMsg("you are logged out")
			setAlertColor("alert alert-warning")

			setTimeout(() => {
				localStorage.setItem("access_token", "")
				setAlertColor("")
				setMsg("")
			}, 10000)
		}

		if (store.loginRes.includes("fail")) {
			setMsg("The password or the email you've entered is incorrect")
			setAlertColor("alert alert-danger")
		}

	}, [store.loginRes.length, store.newUserRes.length])


	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [msg, setMsg] = useState("")
	const [alertColor, setAlertColor] = useState("")


	const sendLoginForm = () => {
		let emailInput = email
		emailInput = emailInput.toLocaleLowerCase()
		if (password.length < 6) {
			setMsg("this password is not valid")
			setAlertColor(" alert alert-danger")

		} else {

			let loginObj = {
				email: emailInput,
				password: password
			}

			actions.getToken(loginObj)
			setMsg('')
			setEmail('')
			setPassword('')
			setAlertColor('')
		}
	}



	return (
		<div className="text-center m-auto w-25 mt-5">
			<div style={{backgroundColor: 'rgba(0, 102, 102, 0.4)', padding: '20px', borderRadius: '10px' }}>
				<h1 style={{ color: 'white', marginBottom: '20px' }}>Login</h1>

				<div className={alertColor} role="alert">{msg}</div>

				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required ></input>
					<label htmlFor="floatingInput" className="text-center">Email address</label>
				</div>

				<div className="form-floating">
					<input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
					<label htmlFor="floatingPassword">Password</label>
				</div>



				<button type="button" className="btn btn-success w-25 py-2 m-3" onClick={() => sendLoginForm()}>Login</button>
				<p className='mt-3' style={{ fontSize: '15px', color: 'white' }}>
					Don't have an account yet?{' '}
					<Link to="/signup" syle={{ color: 'black', textDecoration: 'underline' }}>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};
