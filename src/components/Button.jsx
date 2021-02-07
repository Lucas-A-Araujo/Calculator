import React from 'react'

import '../css/button.css'

export default props => {

    
    return(
        <button 
        onClick={e => props.click && props.click(props.label)} className={`
            buttons
            ${props.equal ? 'equal' : ''}
            ${props.double ? 'double' : ''}
            ${props.calculation ? 'calculation' : ''}
            `}>
            {props.label}
        </button>
    )
}