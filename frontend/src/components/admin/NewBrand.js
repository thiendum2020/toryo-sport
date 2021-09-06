import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newBrand, clearErrors } from '../../actions/brandActions'
import { NEW_BRAND_RESET } from '../../constants/brandConstants'

const NewBrand = ({ history }) => {


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newBrand)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/brands');
            alert.success('Brand created successfully')
            dispatch({ type: NEW_BRAND_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name === '') {
            alert.error('Please enter a name!')
            return
        }

        if (description === '') {
            alert.error('Please enter a description!')
            return
        }

        dispatch(newBrand(name, description))
    }

    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="row admin-products">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-8">
                    <Fragment>
                        <div className="my-4">
                            <h3>New Brand</h3>
                        </div>
                        <div className="wrapper">
                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>


                                <button
                                    id="create_button"
                                    type="submit"
                                    className="btn btn-update btn-block">
                                    CREATE
                                </button>

                            </form>
                        </div>

                    </Fragment>
                </div>
            </div >

        </Fragment >
    )
}

export default NewBrand
