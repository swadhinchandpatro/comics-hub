import React, { forwardRef } from 'react'
import './styles.scss'

function Hero({thumbnail, id, className, onClick}, ref) {
    return (
        <div ref={ref} id={id} className={`hero ${className}`} style={{
            backgroundImage: `url(${thumbnail})`
        }} onClick={onClick}>
        </div>
    )
}

export default forwardRef(Hero)
