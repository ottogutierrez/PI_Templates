import React, {useState, useEffect} from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import "prismjs/themes/prism.css";
import pretty from 'pretty'

const ExportComponent=({state})=>{
    const copyTemplateCode = ()=>{
        //var copyText = document.getElementById("templateCode")
        navigator.clipboard.writeText(templateOutput)
        alert('Code has been copied to your clipboard')
    }

    const [templateOutput, setTemplateOutput] = useState('')

    useEffect(()=>{
        const outputString = document.getElementById('final-output').innerHTML
        var myNewString = outputString.replace(/\n/g, '<br/>');
        ///\n|\s{2,}/g, '<br/>'
        myNewString = pretty(myNewString,{ocd:true})
        setTemplateOutput(myNewString)
    },[state])
    return(
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
    )
}

export default ExportComponent