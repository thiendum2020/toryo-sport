import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Banner from '../../assets/banner.png'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import axios from 'axios'

const Register = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(register(name, email, password, avatar))
    }

    const onChangeAvatar = async e => {
        const file = e.target.files[0]
        if (!file) {
            return alert.error('File not exist!')
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            return alert.error('File format is incorrect!')
        }
        if (file.size > 1024 * 1024 * 5) {
            return alert.error('File too large!')
        }

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setAvatar(res.data)
    }

    const deleteImageHandler = async () => {
        setAvatarPreview('/images/default_avatar.jpg')

        await axios.post('/api/destroy', { public_id: avatar.public_id }, {
        })
        setAvatar('')
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Register'} />
                    <section className="account">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <img src={Banner} alt="" />
                                </div>
                                <div className="col-6">
                                    <div className="account-form">
                                        <div className="form-header">
                                            <span><Link to="/login">Login</Link></span>
                                            <div className="register">
                                                <span>Register</span>
                                            </div>
                                        </div>
                                        <form onSubmit={submitHandler}>

                                            <label htmlFor="name_field">Name</label>
                                            <input
                                                type="text"
                                                id="name_field"
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Name" />

                                            <label htmlFor="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email" />

                                            <label htmlFor="password_field">Password</label>
                                            <input
                                                type="password"
                                                id="password_field"
                                                className="form-control"
                                                name='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password" />

                                            <div className='form-group'>
                                                <div className='avatar-upload align-items-center'>
                                                    <div>
                                                        <figure className='avatar mr-3 item-rtl'>
                                                            <img
                                                                src={avatarPreview}
                                                                className='rounded-circle'
                                                                alt='Avatar Preview' />
                                                            <span onClick={deleteImageHandler}>X</span>
                                                        </figure>
                                                    </div>
                                                    <div className='custom-file'>
                                                        <input
                                                            type='file'
                                                            name='avatar'
                                                            className='custom-file-input'
                                                            id='customFile'
                                                            accept="images/*"
                                                            onChange={onChangeAvatar}
                                                        />
                                                        <label className='custom-file-label' htmlFor='customFile'>
                                                            Choose Avatar
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                id="register_button"
                                                type="submit"
                                                className="btn btn-login"
                                                disabled={loading ? true : false}>
                                                REGISTER
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment >
            )
            }
        </Fragment >
    )
}

export default Register
