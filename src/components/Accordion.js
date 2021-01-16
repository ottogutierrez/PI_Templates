import React, {useState, useRef, useEffect} from 'react'
import './Accordion.css'
import ChevronIcon from '../icons/ChevronIcon'



const Accordion = ({children,title}) =>{

    const [accordionActive,setAccordionActive] = useState(false)
    const [accordionHeight, setAccordionHeight] = useState("0px")

    const contentRef = useRef(null)
    const secondRef = useRef(null)

    const toggleAccordion= ()=>{
        setAccordionActive(!accordionActive)
        
    }

    useEffect(()=>{
        setAccordionHeight(accordionActive ? `${contentRef.current.scrollHeight}px` : "0px")
        //contentRef.current.scrollIntoView({behavior:"smooth", block:"end", inline:"center"})
        
        
        
    },[accordionActive])

    useEffect(()=>{
        if (accordionHeight !== "0px") {
            setTimeout(() => {
                secondRef.current.scrollIntoView({behavior:"smooth", block:"center"})
            }, 200);
            
        }
    },[accordionHeight])

    return (
        <div className="border mb-2 shadow-sm">
            
            <button 
                className={`${accordionActive ?'bg-gray-200' : 'bg-white' } items-center w-full flex flex-row justify-between p-4 focus:outline-none hover:bg-gray-300`}
                onClick={toggleAccordion}
            >
                <p>{title}</p>
                <ChevronIcon className={`${accordionActive ? 'accordion-icon rotate' : 'accordion-icon'} stroke-current text-gray-500`} height={20}/>
            </button>
            
            <div ref={contentRef} 
                className='content'
                style={{maxHeight:`${accordionHeight}`}}
            >
                {children}
            </div>
            <div>
                <div className="text-white h-0" ref={secondRef}>.</div>
            </div>
        </div>
    )
}

export default Accordion