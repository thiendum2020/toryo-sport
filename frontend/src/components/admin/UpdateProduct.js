import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import axios from 'axios'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET, PRODUCT_DETAILS_RESET } from '../../constants/productConstants'

const UpdateProduct = ({ match, history }) => {
    const categories = [
        'Accessories',
        'Clothing',
        'Shoes',
    ]

    const brands = [
        'Adidas',
        'Nike',
        'Puma'
    ]
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])

    const [oldImages, setOldImages] = useState([])
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [imagesPreview1, setImagesPreview1] = useState('/images/no-image.png')
    const [imagesPreview2, setImagesPreview2] = useState('/images/no-image.png')
    const [imagesPreview3, setImagesPreview3] = useState('/images/no-image.png')
    const [imagesPreview4, setImagesPreview4] = useState('/images/no-image.png')


    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    const productId = match.params.id

    useEffect(() => {
        if (!product || product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setBrand(product.brand)
            setStock(product.stock)
            setOldImages(product.images)
            setImages(product.images)
            setImage1(product.images[0] ? product.images[0].public_id : '')
            setImage2(product.images[1] ? product.images[1].public_id : '')
            setImage3(product.images[2] ? product.images[2].public_id : '')
            setImage4(product.images[3] ? product.images[3].public_id : '')
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
            alert.success('Product updated successfully')
            history.push('/admin/products')
            dispatch({ type: UPDATE_PRODUCT_RESET })
            dispatch({ type: PRODUCT_DETAILS_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId])


    const submitHandler = (e) => {
        e.preventDefault()
        images.forEach(function (v) { delete v._id })
        dispatch(updateProduct(product._id, name, price, stock, description, category, brand, images))
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

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
        setImage1(res.data.public_id)

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview1(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
        setImage2(res.data.public_id)

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview2(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
        setImage3(res.data.public_id)

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview3(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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


        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        setImages(oldArray => [...oldArray, res.data])
        setImage4(res.data.public_id)

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview4(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const deleteImage = (index) => e => {
        let newImages = [...oldImages]
        newImages[index] = ''
        setOldImages(newImages)
        if (index === 0) {
            setImages(images.filter(item => item.public_id !== image1))
            setImage1('')
        }
        else if (index === 1) {
            setImages(images.filter(item => item.public_id !== image2))
            setImage2('')
        }
        else if (index === 2) {
            setImages(images.filter(item => item.public_id !== image3))
            setImage3('')
        }
        else if (index === 3) {
            setImages(images.filter(item => item.public_id !== image4))
            setImage4('')
        }
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
                            <h3>Update Product #{productId}</h3>
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
                                            <select className="form-control" id="brand_field" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                                {brands.map(brand => (
                                                    <option key={brand} value={brand} >{brand}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
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

                <div className="col-5 col-md-5">
                    <div className="new-img">
                        <div className="row">
                            <div className="col-6 col-md-6 img-preview">
                                <img src={oldImages && oldImages[0] ? oldImages[0].url : imagesPreview1} alt="" />
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange1}
                                />
                                <span className="delete-img" id="delete1" onClick={deleteImage(0)}>X</span>
                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={oldImages && oldImages[1] ? oldImages[1].url : imagesPreview2} alt="" />

                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange2}
                                />
                                <span className="delete-img" id="delete2" onClick={deleteImage(1)}>X</span>

                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={oldImages && oldImages[2] ? oldImages[2].url : imagesPreview3} alt="" />

                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange3}
                                />
                                <span className="delete-img" id="delete3" onClick={deleteImage(2)}>X</span>

                            </div>
                            <div className="col-6 col-md-6 img-preview">
                                <img src={oldImages && oldImages[3] ? oldImages[3].url : imagesPreview4} alt="" />

                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='images/*'
                                    onChange={onChange4}
                                />
                                <span className="delete-img" id="delete4" onClick={deleteImage(3)}>X</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProduct
