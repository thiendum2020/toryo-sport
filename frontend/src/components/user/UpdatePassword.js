import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import MenuProfile from './MenuProfile'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { logout } from '../../actions/userActions'
import { CART_RESET } from '../../constants/cartConstants'

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/profile')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, password))
        dispatch(logout())
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="container">
                <div class="row">
                    <div className="col-2">
                        <MenuProfile />
                    </div>
                    <div className="col-6">
                        <div className="profile">
                            <div className="profile-header">
                                <h3>Change Password</h3>
                            </div>
                            <div className="user-info">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label for="old_password_field">Old Password</label>
                                        <input
                                            type="password"
                                            id="old_password_field"
                                            className="form-control"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="new_password_field">New Password</label>
                                        <input
                                            type="password"
                                            id="new_password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-update btn-block" disabled={loading ? true : false} >Update Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
