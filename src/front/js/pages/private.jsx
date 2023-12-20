import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/private.css";

export const Private = () => {
    const navigate = useNavigate()

    useEffect(() => {
        actions.privateViewRequest()
        if (!localStorage.access_token || localStorage.access_token.length == 0 || localStorage.access_token == "logOut") {
            navigate('/')
        }

    }, [])


    const randomPokemon = Math.floor(Math.random() * 1017) + 1;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`;

    const logOut = () => {
        localStorage.setItem("access_token", "logOut")
        navigate('/')
        actions.clearPrivateData()
    }

    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5" style={{ color: 'white' }}>
            {!store.loginRes.includes(true) ? <h1>Private Route. Login to see content</h1> :
                <div className="container">
                    <h1 className="m-5">Private Page</h1>
                    <div className="row">
                        <div className="col-lg-4">
                            <h2 className="text-start" style={{ marginLeft: '115px' }}>My Avatar</h2>
                            <img src={imageUrl} alt="User Avatar" className="rounded-circle avatar" />
                        </div>
                        <div className="col-lg-8">
                            <h2>Account details:</h2>
                            <table className="table table-light table-striped mt-4">
                                <tbody>
                                    <tr>
                                        <th>User ID</th>
                                        <td>{store.privateData.user_id}</td>
                                    </tr>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>{store.privateData.first_name + ' ' + store.privateData.last_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{store.privateData.email}</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                            <button type="button" className="btn btn-danger w-25 mt-4" onClick={() => logOut()}>Log out</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};