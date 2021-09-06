import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import axios from 'axios'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryDetailsById, updateCategory, clearErrors } from '../../actions/categoryActions'
import { UPDATE_CATEGORY_RESET, CATEGORY_DETAILS_RESET } from '../../constants/categoryConstants'

const UpdateCategory = ({ match, history }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, category } = useSelector(state => state.categoryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.category)

    const categoryId = match.params.id

    useEffect(() => {
        if (!category || category._id !== categoryId) {
            dispatch(getCategoryDetailsById(categoryId))
        } else {
            setName(category.name)
            setDescription(category.description)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Category updated successfully')
            history.push('/admin/categories')
            dispatch({ type: UPDATE_CATEGORY_RESET })
            dispatch({ type: CATEGORY_DETAILS_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, category, categoryId])


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

        dispatch(updateCategory(categoryId, name, description))
    }

    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row admin-products">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-5 col-md-5">
                    <Fragment>
                        <div className="my-4">
                            <h3>Update Category #{categoryId}</h3>
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
                                    id="update_button"
                                    type="submit"
                                    className="btn btn-update btn-block">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>


            </div>

        </Fragment>
    )
}

export default UpdateCategory
