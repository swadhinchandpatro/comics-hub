import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import './styles.scss'
export default function Pagination({total, pageNo, setOffset}) {
    const [page1, setPage1] = useState(0);
    const [page2, setPage2] = useState(1);
    const selectedClass = 'block selected';
    const blockClass = 'block';
    const blockDisabledClass = 'block disabled';
    return (
        <div className='pagination'>
            <div className={ true ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" size='sm'/>
                </div>
            {/* {total > 0 ? (
                <div className={ true ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" size='sm'/>
                </div>
            ) : null} */}
            {/* {total > 0 && <div className={pageNo === page1 ? selectedClass : blockClass}>{page1}</div>}
            {total === 2 (
                <div className={pageNo === page2 ? selectedClass : blockClass}>{page2}</div>
            )}
            {total > 2 && (
                <div className='block'>...</div>
            )}
            {total > 2 (
                <div className={pageNo === page1 ? selectedClass : blockClass}>{page2}</div>
            )} */}
            {/* {total > 0 (
                <div className={true ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowRight} color="white" size='sm'/>
                </div>
            )} */}
        </div>
    )
}
