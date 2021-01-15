import React, {useState} from 'react'

const ImageField = ({title, text, setText, identifier})=>{
    
    const urlChecker = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    const [urlValid, setUrlValid] = useState('URL not Valid')
    const handleChangeText = e =>{
        var urlTestResult = "URL not Valid"
        setText(identifier, e.target.value)
        //setTitleLen(e.target.value.length.toString())
        if (e.target.value.match(urlChecker)) {
            urlTestResult = "URL Valid"
        }
        setUrlValid(urlTestResult)
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
            <div className={`text-sm text-right ${urlValid === "URL not Valid" ? "text-red-300": "text-green-300"} px-1`}>{urlValid}</div>
            {/* // TODO: A component that will tell you that the link is valid or not valid */}
            {/* // TODO: A button that when clicked, will set the value or load the image... something like that */}
        </div>
        
    )
}

export default ImageField