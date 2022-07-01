import React from 'react'
import './styles.scss'

export default function Hero({thumbnail, id, className, onClick}) {
    return (
        <div id={id} className={`hero ${className}`} style={{
            backgroundImage: `url(${thumbnail})`
        }} onClick={onClick}>
        </div>
    )
}
