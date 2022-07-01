import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import './styles.scss'
export default function Pagination({total, pageNo, limit, setOffset}) {
    const lastPage = parseInt(total/limit)
    const currentPage = parseInt(pageNo/limit)
    const diff = lastPage - currentPage;
    // const [lastPage, setPage2] = useState(lastPage);
    const selectedClass = 'block selected';
    const blockClass = 'block';
    const blockDisabledClass = 'block disabled';

    // useEffect(() => {
    //     setPage1(0);
    //     setPage2(lastPage);
    // }, [total])

    const increment = () => {
        // setPage1(page => page + 1)
        setOffset(pageNo + limit);
    }

    const decrement = () => {
        // setPage1(page => page - 1)
        setOffset(pageNo - limit);
    }

    const updateOffset = (page) => {
        return pageNo !== page && setOffset(page*limit)

    }

    return (
        <div className='pagination'>
            {lastPage > 0 ? (
                <div onClick={() => decrement()} className={!currentPage ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" size='sm'/>
                </div>
            ) : null}
            {lastPage > 0 && <div onClick={() => updateOffset(currentPage)} className={currentPage === currentPage ? selectedClass : blockClass}>{currentPage + 1}</div>}
            {diff === 1 && (
                <div onClick={() => updateOffset(lastPage)} className={currentPage === lastPage ? selectedClass : blockClass}>{lastPage + 1}</div>
            )}
            {diff > 1 && (
                <div className='block'>...</div>
            )}
            {diff > 1 && (
                <div onClick={() => updateOffset(lastPage)} className={currentPage === lastPage ? selectedClass : blockClass}>{lastPage + 1}</div>
            )}
            {lastPage > 0 && (
                <div onClick={() => increment()} className={currentPage === lastPage ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowRight} color="white" size='sm'/>
                </div>
            )}
        </div>
    )
}
