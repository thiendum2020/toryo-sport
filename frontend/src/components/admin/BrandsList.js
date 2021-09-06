import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import swal from 'sweetalert'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, deleteBrand, clearErrors } from '../../actions/brandActions'
import { DELETE_BRAND_RESET } from '../../constants/brandConstants'

const BrandsList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, brands } = useSelector(state => state.brands);
    const { isDeleted } = useSelector(state => state.brand)

    useEffect(() => {
        dispatch(getBrands())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Brand deleted successfully')
            history.push('/admin/brands');
            dispatch({ type: DELETE_BRAND_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteUserHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteBrand(id))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Haha Nope!")
                }
            })
    }

    const setBrands = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        brands && brands.forEach(brand => {
            data.rows.push({
                id: brand._id,
                name: brand.name,

                actions:
                    <Fragment>
                        <Link to={`/admin/brand/${brand._id}`} className="icon icon-edit">
                            <i className="bx bxs-pencil" />
                        </Link>
                        <a href className="icon icon-delete" onClick={() => deleteUserHandler(brand._id)}>
                            <i className='bx bxs-trash-alt' ></i>
                        </a>
                    </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Admin - All Users'} />
            <div className="row admin-users">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="users-list-header my-4">
                            <h3>All Brands (Total: {brands && brands.length})</h3>
                            <Link to='/admin/brands/new' className="btn btn-new-user">Add New Brand</Link>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTableV5
                                data={setBrands()}
                                className="px-3"
                                entriesOptions={[10, 20, 50]}
                                entries={10}
                                hover
                                searchTop
                                searchBottom={false}
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default BrandsList
