import React from 'react'


const ChevronIcon = ({height, width, className})=>{

    return (
        <div>
            <svg 
                className={className}
                height={height}
                width={width}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24" 
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    )
}

export default ChevronIcon