import React, { useState } from 'react'

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/shop')
        }
    }

    return (
        <form onSubmit={searchHandler}>
            <div className="search">
                <input type="text" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
                <button type="submit">
                    <i className="bx bx-search-alt" />
                </button>
            </div>

        </form>
    )
}

export default Search
