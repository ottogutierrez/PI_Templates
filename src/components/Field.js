import React, {useState} from 'react'

const Field = ({title, text, setText, maxLen, identifier})=>{
    
    const [titleLen, setTitleLen] = useState(0)
    const handleChangeText = e =>{
        setText(identifier, e.target.value)
        setTitleLen(e.target.value.length.toString())
    }
    return(
        <div className="">
            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="title">{title}</label>
            <input 
                type="text" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id={identifier}
                placeholder={title}
                value={text}
                onChange={handleChangeText}
            />    
            <div className={`text-sm text-right ${titleLen > {maxLen} ? "text-red-400": "text-gray-400"} px-1`}>{titleLen}/{maxLen}</div>
        </div>
        
    )
}

export default Field