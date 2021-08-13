import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import axios from 'axios'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'

const NewProduct = ({ history }) => {

    const categories = [
        'Balls',
        'Clothing',
        'Shoes'
    ]
    const brands = [
        'Adidas',
        'Nike',
        'Puma'
    ]

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0])
    const [brand, setBrand] = useState(brands[0])
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [imagesPreview1, setImagesPreview1] = useState('/images/no-image.png')
    const [imagesPreview2, setImagesPreview2] = useState('/images/no-image.png')
    const [imagesPreview3, setImagesPreview3] = useState('/images/no-image.png')
    const [imagesPreview4, setImagesPreview4] = useState('/images/no-image.png')


    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/products');
            alert.success('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(newProduct(name, price, stock, description, category, brand, images))
    }

    const onChange1 = async e => {
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
                setImagesPreview1(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
    }
    const onChange2 = async e => {
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
                setImagesPreview2(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
    }
    const onChange3 = async e => {
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
                setImagesPreview3(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
    }
    const onChange4 = async e => {
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
                setImagesPreview4(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
    }

    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="row admin-products">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-5 col-md-5">
                    <Fragment>
                        <div className="my-4">
                            <h3>New Product</h3>
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
                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="price_field">Price</label>
                                            <input
                                                type="number"
                                                id="price_field"
                                                className="form-control"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="stock_field">Stock</label>
                                            <input
                                                type="number"
                                                id="stock_field"
                                                className="form-control"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="category_field">Category</label>
                                            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                                {categories.map(category => (
                                                    <option key={category} value={category} >{category}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="brand_field">Brand</label>
                                            <select className="form-control" id="category_field" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                                {brands.map(brand => (
                                                    <option key={brand} value={brand} >{brand}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-update btn-block">
                                    CREATE
                                </button>

                            </form>
                        </div>

                    </Fragment>
                </div>
                <div className="col-5 col-md-5">
                    <div className="new-img">
                        <div className="row">
                            <div className="col-6 col-md-6 img-preview">
                                <img src={imagesPreview1} alt="" />
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange1}
                                />
                                <span className="delete-img">X</span>
                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={imagesPreview2} alt="" />
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange2}
                                />
                                <span className="delete-img">X</span>
                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={imagesPreview3} alt="" />
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange3}
                                />
                                <span className="delete-img">X</span>
                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={imagesPreview4} alt="" />
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange4}
                                />
                                <span className="delete-img">X</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </Fragment >
    )
}

export default NewProduct
