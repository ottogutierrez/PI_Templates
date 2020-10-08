import React, {useState, useEffect} from 'react'

const ZoomComponent = ({zoomHandler})=>{
    const [zoom, setZoom] = useState('100')
    const handleClick = (e)=>{
        setZoom(e.target.dataset.value)
        zoomHandler(e.target.dataset.value)
    }
    return (
        <div className="flex flex-row items-center h-auto rounded text-sm overflow-hidden cursor-pointer ">
            <div 
                className={`p-2 h-full ${zoom==='100' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={handleClick}
                data-value={100}
            >100%</div>
            <div 
                className={`p-2 h-full ${zoom==='50' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={handleClick}
                data-value={50}
            >50%</div>
            <div 
                className={`p-2 h-full ${zoom==='25' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={handleClick}
                data-value={25}
                >25%
            </div>
        </div>
    )
}

export default ZoomComponent