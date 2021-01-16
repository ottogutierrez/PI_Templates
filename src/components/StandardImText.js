import React, { useState, useEffect } from 'react'
import './StandardImText.css'

import Field from './Field'
import ImageField from './ImageField'
import ZoomComponent from './ZoomComponent'
import ExportComponent from './ExportComponent'

const StandardImText = ()=>{

    // **** Component State ****
    const [state, setState] = useState({
        title:'',
        content:'',
        imageLink:''
    })
    
    // **** Update State Function (helper) ****
    const updateState= (parameter,value) => {
        setState({...state,[parameter]:value})
    }
    // **** Initialize Zoom ****
    useEffect(()=>{
        const root = document.documentElement
        root.style.setProperty('--title-font',"large")
        root.style.setProperty('--content-font',"medium")
        root.style.setProperty('--image-size', "50%")
    },[])

    // ***** Update Zoom *****
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

    return(
        <div className="flex flex-grow text-gray-700">
            {/* Form */}
            <div className=" flex flex-grow flex-col bg-white p-4 mx-3 rounded shadow-md w-48 overflow-scroll">
                <h3 className="font-semibold mb-4">Standard and Image Text Template</h3>
                <Field title="Title" text={state.title} setText={updateState} maxLen={80} identifier="title" textArea={false} />
                <Field title="Content" text={state.content} setText={updateState} maxLen={2500} identifier="content" textArea={true} />
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
                    <ExportComponent state={state}/>
                </div>
                
            </div>
        </div>
    )
}

export default StandardImText


