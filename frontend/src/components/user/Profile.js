import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import MenuProfile from './MenuProfile'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import axios from 'axios'

const Profile = ({ history }) => {

    const { userLogin } = useSelector(state => state.auth)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (userLogin) {
            setName(userLogin.name)
            setEmail(userLogin.email)
            setAvatarPreview(userLogin.avatar.url)
            setAvatar(userLogin.avatar)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser())

            history.push('/profile')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, userLogin, alert, error, history, isUpdated])



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

        const reader = new FileReader();
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

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateProfile(name, email, avatar))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />

                    <div className="container">
                        <div class="row">
                            <div className="col-2">
                                <MenuProfile />
                            </div>
                            <div className="col-6">
                                <div className="profile">
                                    <div className="profile-header">
                                        <h3>Profile</h3>
                                        <span>Joined On {String(userLogin.createdAt).substring(0, 10)}</span>
                                    </div>
                                    <div className="user-info">
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="email_field">Name</label>
                                                <input
                                                    required
                                                    type="name"
                                                    id="name_field"
                                                    className="form-control"
                                                    name='name'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email_field">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    id="email_field"
                                                    className="form-control"
                                                    name='email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-update btn-block" disabled={loading ? true : false} >Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='form-group user-avatar'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <figure className='avatar-profile'>
                                        <img className="rounded-circle img-fluid" src={avatarPreview} alt={userLogin.name} />
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='images/*'
                                            onChange={onChangeAvatar}
                                        />
                                    </figure>
                                    <p>Max size: 5MB</p>
                                    <p>Type:.JPEG, .PNG</p>
                                    <label className='choose-avatar' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
