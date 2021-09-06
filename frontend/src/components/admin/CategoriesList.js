import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import swal from 'sweetalert'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, deleteCategory, clearErrors } from '../../actions/categoryActions'
import { DELETE_CATEGORY_RESET } from '../../constants/categoryConstants'

const CategoriesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, categories } = useSelector(state => state.categories);
    const { isDeleted } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getCategories())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Category deleted successfully')
            history.push('/admin/categories');
            dispatch({ type: DELETE_CATEGORY_RESET })
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
                    dispatch(deleteCategory(id))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Haha Nope!")
                }
            })
    }

    const setCategories = () => {
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

        categories && categories.forEach(category => {
            data.rows.push({
                id: category._id,
                name: category.name,

                actions:
                    <Fragment>
                        <Link to={`/admin/category/${category._id}`} className="icon icon-edit">
                            <i className="bx bxs-pencil" />
                        </Link>
                        <a href className="icon icon-delete" onClick={() => deleteUserHandler(category._id)}>
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
                            <h3>All Categories (Total: {categories && categories.length})</h3>
                            <Link to='/admin/categories/new' className="btn btn-new-user">Add New Category</Link>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTableV5
                                data={setCategories()}
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

export default CategoriesList
