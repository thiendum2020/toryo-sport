import React from 'react'

const PageNotFound = () => {
    return (
        <div>
            <div className="container-fluid">
                {/* 404 Error Text */}
                <div className="text-center">
                    <div className="error mx-auto mt-60" data-text={404}>404</div>
                    <p className="lead text-gray-800 mb-5">Page Not Found</p>
                    <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                    <a href="/">← Back to Home</a>
                </div>
            </div>

        </div>
    )
}

export default PageNotFound
