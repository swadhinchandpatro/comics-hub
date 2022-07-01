import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useComics } from '../../hooks/useSuperHeroes'
import { v4 } from 'uuid'

import './styles.scss'
import { SuperHeroContext } from '../../App';
import ComicsCard from '../ComicsCard';
import Pagination from '../Pagination';

function Comics() {
    const [offset, setoffset] = useState(0);
    const totalCount = useRef(0);

    const { comicName } = useContext(SuperHeroContext)
    const { isLoading , data: comics, isError, error, refetch } = useComics({
        queryParams: { offset: offset},
        refetchOnMount: false,
        select: (res) => {
            totalCount.current = res.data.data.total
            return res && res.data.data;
        }
    });
    console.log(comics);

    useEffect(() => {
        refetch()
    }, [offset])

    return (
        <div className='comics-container'>
            <div className='comics'>
                {isLoading ? <h1>Loading...</h1> : null}
                {comics && comics.results?.map(comic => {
                    return <ComicsCard key={v4()} id={comic.id} thumbnail={comic.thumbnail} title={comic.title} />
                })}
            </div>
            <Pagination total={totalCount.current} pageNo={offset}/>
        </div>
    )
}

export default Comics