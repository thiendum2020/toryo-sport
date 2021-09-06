import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import axios from 'axios'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandDetailsById, updateBrand, clearErrors } from '../../actions/brandActions'
import { UPDATE_BRAND_RESET, BRAND_DETAILS_RESET } from '../../constants/brandConstants'

const UpdateBrand = ({ match, history }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, brand } = useSelector(state => state.brandDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.brand)

    const brandId = match.params.id

    useEffect(() => {
        if (!brand || brand._id !== brandId) {
            dispatch(getBrandDetailsById(brandId))
        } else {
            setName(brand.name)
            setDescription(brand.description)
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
            alert.success('Brand updated successfully')
            history.push('/admin/brands')
            dispatch({ type: UPDATE_BRAND_RESET })
            dispatch({ type: BRAND_DETAILS_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, brand, brandId])


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

        dispatch(updateBrand(brandId, name, description))
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
                            <h3>Update Brand #{brandId}</h3>
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

export default UpdateBrand
