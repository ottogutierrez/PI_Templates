import React, { useState, useEffect } from 'react'
import './StandardImText.css'

import Field from './Field'
import ImageField from './ImageField'
import ZoomComponent from './ZoomComponent'
import ExportComponent from './ExportComponent'

const StandardImText = ()=>{

    // **** Component State ****
    const [state, setState] = useState({
        mainTitle:'',
        title1:'',
        title2:'',
        title3:'',
        content1:'',
        content2:'',
        content3:'',
        image1Link:'',
        image2Link:'',
        image3Link:'',
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
            <div className=" flex flex-grow flex-col bg-white p-4 mx-3 rounded shadow-md w-48 overflow-y-scroll">
                <h3 className="font-semibold mb-4">Standard and Image Text Template</h3>
                <Field title="Main Title" text={state.mainTitle} setText={updateState} maxLen={80} identifier="mainTitle" textArea={false} />
                <ImageField title="Image 1 Link" text={state.image1Link} setText={updateState} identifier="image1Link" />
                <ImageField title="Image 2 Link" text={state.image2Link} setText={updateState} identifier="image2Link" />
                <ImageField title="Image 3 Link" text={state.image3Link} setText={updateState} identifier="image3Link" />
                <Field title="Title 1" text={state.title1} setText={updateState} maxLen={80} identifier="title1" textArea={false} />
                <Field title="Content 1" text={state.content1} setText={updateState} maxLen={2500} identifier="content1" textArea={true} />
                <Field title="Title 2" text={state.title2} setText={updateState} maxLen={80} identifier="title2" textArea={false} />
                <Field title="Content 2" text={state.content2} setText={updateState} maxLen={2500} identifier="content2" textArea={true} />
                <Field title="Title 3" text={state.title3} setText={updateState} maxLen={80} identifier="title3" textArea={false} />
                <Field title="Content 3" text={state.content3} setText={updateState} maxLen={2500} identifier="content3" textArea={true} />
                
            </div>
            {/* Preview Column*/}
            <div className=" flex flex-grow flex-col w-48">
                <div className="flex flex-col mb-4 bg-white p-4 mx-3 rounded shadow-md">
                    <div className="flex flex-row justify-between items-center mb-4 flex-shrink-0">
                        <h3 className="font-semibold">Preview...</h3>
                        <ZoomComponent zoomHandler={updateZoom}/>
                    </div>
                    {/* ***** Template ****** */}
                    <div className="rounded border-2 border-gray-400 p-4 overflow-y-auto overflow-x-hidden h-auto">
                        <div id="final-output" className="">
                            <table>
                                <tbody>
                                    <tr>
                                        <th colSpan="3">{state.mainTitle}</th>
                                    </tr>
                                    <tr>
                                        <td><img src={state.image1Link} /> </td>
                                        <td><img src={state.image2Link} /> </td>
                                        <td><img src={state.image3Link} /> </td>
                                    </tr>
                                    <tr>
                                        <th>{state.title1}</th>
                                        <th>{state.title2}</th>
                                        <th>{state.title3}</th>
                                    </tr>
                                    <tr>
                                        <td>{state.content1}</td>
                                        <td>{state.content2}</td>
                                        <td>{state.content3}</td>
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


