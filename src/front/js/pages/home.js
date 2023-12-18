import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        actions.handleSubmitLogin(e, navigate);
    };

	return (
		<div className="container text-center mt-5">
			<form onSubmit={handleSubmit} className='trololo montañes mx-auto my-5 p-3 ' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)' }}>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: 'white' }}>Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} autoComplete="off" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: 'white' }}>Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} />
                </div>
                <button className='btn w-100' style={{ backgroundColor: '#4f89ee' }}>Sign in</button>
            </form>
		</div>
	);
};
