import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Banner from '../../assets/banner.png'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <section className="account">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <img src={Banner} alt="" />
                        </div>
                        <div className="col-6">
                            {
                                loading ? (
                                    <div style={{ marginTop: '25%' }}>
                                        <Loader />
                                    </div>
                                ) : (
                                    <div className="account-form">
                                        <div className="form-header">
                                            <div className="login">
                                                <span>Forgot Password</span>
                                            </div>
                                        </div>
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="email_field">Enter Email</label>
                                                <input
                                                    type="email"
                                                    id="email_field"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <button
                                                id="forgot_password_button"
                                                type="submit"
                                                className="btn btn-login"
                                                disabled={loading ? true : false} >
                                                Send Email
                                            </button>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Fragment >
    )
}

export default ForgotPassword
