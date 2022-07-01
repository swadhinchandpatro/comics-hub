import React from 'react'
import './styles.scss'

export default function ComicsCard({ thumbnail, id, title, className }) {
    return (
        <div className="card-layout">
            <div className="card-layout__img" style={{
                backgroundImage: `url(${thumbnail})`
            }}>
            </div>
            <div className="card-layout__title">
                <p>{title}</p>
            </div>
        </div>
    )
}
