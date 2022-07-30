import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './styles.scss'
export default function Pagination({total, pageNo, firstPage, limit, setOffset, setFirstPage}) {
    const lastPage = parseInt(total/limit)
    const currentPage = parseInt(pageNo/limit)
    const diff = lastPage - firstPage;
    const selectedClass = 'block selected';
    const blockClass = 'block';
    const blockDisabledClass = 'block disabled';

    const increment = () => {
        setOffset(pageNo + limit);
        setFirstPage(page => page + 1)
    }

    const decrement = () => {
        setOffset(pageNo - limit);
        setFirstPage(page => page - 1)
    }

    const updateOffset = (page) => {
        return pageNo !== page && setOffset(page*limit)
    }

    return (
        <div className='pagination'>
            {lastPage > 0 ? (
                <div onClick={() => decrement()} className={!firstPage ? blockDisabledClass : blockClass}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" size='sm'/>
                </div>
            ) : null}
            {lastPage > 0 && <div onClick={() => updateOffset(firstPage)} className={currentPage === firstPage ? selectedClass : blockClass}>{firstPage + 1}</div>}
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
