import React, { useEffect, useState } from "react";
import StandardText from './components/StandardText'

const App = () => {
  const [template, setTemplate] = useState("")

  return (
    <div className="h-screen flex flex-col ">
      <NavBar />
      <div className="flex h-full w-full max-h-full flex-grow bg-white">
        <SideBar updateTemplate={setTemplate}/>
        <div className=" py-2 w-5/6 flex flex-grow-0 max-h-full bg-gray-100">
          {template==="" && 
            <div className="text-lg font-normal text-gray-500 px-3">Please select a template to start...</div>
          }
          {template==="standardText" && 
            <StandardText />
          }
          {template==="standardIT" && 
            <div className="">Standard 3 Images and Text</div>
          }
          {template==="standardSLIB" && 
            <div className="">Standard Single Left Image B</div>
          }
        </div>
      </div>
    </div>
  )
  
}

const NavBar = ()=>{
  return (
    <div className="bg-white border-b border-gray-300 py-3">
      <div className="flex flex-row justify-start items-center">
        <button className="align-text-middle px-2 m-1">&#9776;</button>
        <h1 className="text-3xl font-semibold text-gray-800">PI Templates</h1>
      </div>
    </div>
  )
}

const SideBar = ({updateTemplate})=>{
  const handleUpdate = (e) =>{
    updateTemplate(e.target.value)
  }
  return (
    
    <div className="w-1/6 px-3 py-2 border-r flex flex-col">
      <h2 className="text-xl font-medium text-gray-600">Templates</h2>
      <form className=" px-2 py-2 text-gray-600 text-base">
        <input type="radio" id="standardText" name="template" value="standardText" onChange={handleUpdate}/>
        <label htmlFor="standardText" className="px-1">Standard Text</label><br/>
        <input type="radio" id="standardIT" name="template" value="standardIT" onChange={handleUpdate}/>
        <label htmlFor="standardIT" className="px-1">Stnd 3 Img & Text</label><br/>
        <input type="radio" id="standardSLIB" name="template" value="standardSLIB" onChange={handleUpdate}/>
        <label htmlFor="standardSLIB" className="px-1">Stnd Single Img Left B</label>
      </form>
    </div>

  )
}

export default App;
