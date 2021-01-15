import React, { useState, useEffect } from 'react'
import './StandardImText.css'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import "prismjs/themes/prism.css";
import pretty from 'pretty'
import Field from './Field'
import ImageField from './ImageField'
import ZoomComponent from './ZoomComponent'

const StandardImText = ()=>{
    const [state, setState] = useState({
        title:'',
        content:'',
        imageLink:''
    })

    const [templateOutput, setTemplateOutput] = useState('')

    const updateState= (parameter,value) => {
        setState({...state,[parameter]:value})
    }

    useEffect(()=>{
        const root = document.documentElement
        root.style.setProperty('--title-font',"large")
        root.style.setProperty('--content-font',"medium")
        root.style.setProperty('--image-size', "50%")
    },[])

    const updateZoom = (newZoom)=>{
        // Update the styling of the zoom
        const root = document.documentElement
        switch (newZoom) {
            case '100':
                root.style.setProperty('--title-font',"large")
                root.style.setProperty('--content-font',"medium")
                root.style.setProperty('--image-size', "50%")
                break;
            case '50':
                root.style.setProperty('--title-font',"medium")
                root.style.setProperty('--content-font',"small")
                root.style.setProperty('--image-size', "25%")
                break;
            case '25':
                root.style.setProperty('--title-font',"small")
                root.style.setProperty('--content-font',"x-small")
                root.style.setProperty('--image-size', "13%")
                break;
            default:
                root.style.setProperty('--title-font',"large")
                root.style.setProperty('--content-font',"medium")
                root.style.setProperty('--image-size', "50%")
                break;
        }
    }


    useEffect(()=>{
        const outputString = document.getElementById('final-output').innerHTML
        var myNewString = outputString.replace(/\n/g, '<br/>');
        ///\n|\s{2,}/g, '<br/>'
        myNewString = pretty(myNewString,{ocd:true})
        setTemplateOutput(myNewString)
    },[state.title,state.content, state.imageLink])

    const copyTemplateCode = ()=>{
        //var copyText = document.getElementById("templateCode")
        navigator.clipboard.writeText(templateOutput)
        alert('Code has been copied to your clipboard')
    }

    return(
        <div className="flex flex-grow text-gray-700">
            {/* Form */}
            <div className=" flex flex-grow flex-col bg-white p-4 mx-3 rounded shadow-md w-48 ">
                <h3 className="font-semibold mb-4">Standard and Image Text Template</h3>
                <Field title="Title" text={state.title} setText={updateState} maxLen={80} identifier="title" />
                <Field title="Content" text={state.content} setText={updateState} maxLen={2500} identifier="content" />
                <ImageField title="Image Link" text={state.imageLink} setText={updateState} identifier="imageLink" />
            </div>
            {/* Preview Column*/}
            <div className=" flex flex-grow flex-col w-48">
                <div className="flex flex-col mb-4 bg-white p-4 mx-3 rounded shadow-md">
                    <div className="flex flex-row justify-between items-center mb-4 flex-shrink-0">
                        <h3 className="font-semibold">Preview...</h3>
                        <ZoomComponent zoomHandler={updateZoom}/>
                    </div>
                    {/* ***** Template ****** */}
                    <div className="rounded border-2 border-gray-400 p-4 overflow-auto h-auto">
                        <div id="final-output" className="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><img src={state.imageLink} /> </td>
                                    </tr>
                                    <tr>
                                        <th>{state.title}</th>
                                    </tr>
                                    <tr>
                                        <td>{state.content}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Export component */}
                <div className="bg-white p-4 mx-3 mt-3 flex flex-col flex-grow-0 rounded shadow-md">
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
        </div>
    )
}

export default StandardImText
