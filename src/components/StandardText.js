import React, {useState,useEffect} from 'react'
import "./StandardText.css"
import ZoomComponent from './ZoomComponent'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import "prismjs/themes/prism.css";
import pretty from 'pretty'


const StandardText = ()=>{
    const [title, setTitle] = useState('')
    const [titleLen, setTitleLen] = useState('0')
    const [content, setContent] = useState('')
    const [contentLen, setContentLen] = useState('0')
    const [templateOutput, setTemplateOutput] = useState('')

    useEffect(()=>{
        const root = document.documentElement
        root.style.setProperty('--title-font',"large")
        root.style.setProperty('--content-font',"medium")
    },[])

    useEffect(()=>{
        const outputString = document.getElementById('final-output').innerHTML
        var myNewString = outputString.replace(/\n/g, '<br/>');
        ///\n|\s{2,}/g, '<br/>'
        myNewString = pretty(myNewString,{ocd:true})
        setTemplateOutput(myNewString)
    },[title,content])

    const handleChangeTitle = e =>{
        setTitle(e.target.value)
        setTitleLen(e.target.value.length.toString())
    }

    const handleChangeContent = e =>{
        var newString = e.target.value
        //var myNewString = newString.replace(/\n|\s{2,}/g, '<br/>');
        setContent(newString)
        setContentLen(newString.length.toString())
        //console.log(myNewString)
    }

    const updateZoom = (newZoom)=>{
        // Update the styling of the zoom
        const root = document.documentElement
        switch (newZoom) {
            case '100':
                root.style.setProperty('--title-font',"large")
                root.style.setProperty('--content-font',"medium")
                break;
            case '50':
                root.style.setProperty('--title-font',"medium")
                root.style.setProperty('--content-font',"small")
                break;
            case '25':
                root.style.setProperty('--title-font',"small")
                root.style.setProperty('--content-font',"x-small")
                break;
            default:
                root.style.setProperty('--title-font',"large")
                root.style.setProperty('--content-font',"medium")
                break;
        }
    }

    const copyTemplateCode = ()=>{
        //var copyText = document.getElementById("templateCode")
        navigator.clipboard.writeText(templateOutput)
        alert('Code has been copied to your clipboard')
    }

    return (
        <div className="py-2 w-full h-full flex flex-row flex-grow">
            {/* Form component */}
            <div className="w-1/2 bg-white p-4 mx-3 rounded shadow-md text-gray-700 flex flex-col flex-grow-0">
                <h3 className="font-semibold mb-4">Standard Text Template</h3>     
                <div className="mb-4 flex-grow-0">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        id="title" 
                        placeholder="Title"
                        value={title}
                        onChange={handleChangeTitle}
                    />    
                    <div className={`text-sm text-right ${titleLen > 80 ? "text-red-400": "text-gray-400"} px-1`}>{titleLen}/80</div>
                </div>  
                <div className="mb-6 h-auto flex flex-col flex-grow">
                    <label className="block text-gray-500 text-sm font-bold mb-2 flex-shrink-0" htmlFor="title">Content</label>
                    <textarea 
                        className="flex-grow shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline h-auto"
                        id="content" 
                        placeholder="Content"
                        value={content}
                        onChange={handleChangeContent}
                    />
                    <div className={`text-sm text-right ${contentLen > 2500 ? "text-red-400": "text-gray-400"} px-1`}>{contentLen}/2500</div>
                </div>    
            </div>
            {/* Preview component */}
            <div className="w-1/2 flex flex-col ">
                <div className=" h-1/2 bg-white p-4 mx-3 mb-3 flex flex-col flex-grow-0 rounded shadow-md text-gray-700">
                    <div className="flex flex-row justify-between mb-4 flex-shrink-0">
                        <h3 className="font-semibold ">Preview...</h3>
                        <ZoomComponent zoomHandler={updateZoom}/>
                    </div>
                    
                    <div className="rounded border-2 border-gray-400 p-4 overflow-auto h-auto">
                        <div id="final-output" className="">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{title}</th>
                                    </tr>
                                    <tr>
                                        <td>{content}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="h-1/2 bg-white p-4 mx-3 mt-3 flex flex-col flex-grow-0 rounded shadow-md">
                    <div className="flex flex-col justify-between mb-4 flex-grow-0">
                            <div className="flex flex-row mb-4 justify-between flex-shrink-0">
                                <h3 className="font-semibold ">Output...</h3>
                                <button 
                                    className="p-2 rounded bg-gray-300 shadow-md hover:bg-clip-border hover:bg-gray-400"
                                    onClick={copyTemplateCode}    
                                >Copy</button>
                            </div>
                            
                            <div 
                                className="rounded border-2 border-gray-400 p-4 flex flex-grow "
                                id = "output-code">
                                <Editor
                                    textareaId="templateCode"
                                    className="h-auto w-full overflow-auto "
                                    placeholder="Type some code..."
                                    value={templateOutput}
                                    disabled={true}
                                    onValueChange={code => setCode( code )}
                                    highlight={code => highlight(code, languages.html)}
                                    padding={10}
                                    style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                    backgroundColor:"#F5F5F5",
                                    overflowY:"scroll"
                                    }}
                                />
                            </div>
                    </div>
                </div>
            </div>
            {/* Export component */}
        </div>
        
    )
}

export default StandardText