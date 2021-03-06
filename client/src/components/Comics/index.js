import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useComics } from '../../hooks/useSuperHeroes'
import { v4 } from 'uuid'

import './styles.scss'
import { SuperHeroContext } from '../../App';
import ComicsCard from '../ComicsCard';
import Pagination from '../Pagination';
import { DEFAULT_LIMIT } from '../../constants';

function Comics() {
    const [offset, setoffset] = useState(0);
    const [firstPage, setFirstPage] = useState(0);
    const totalCount = useRef(0);

    const { comicName } = useContext(SuperHeroContext)
    const { isLoading , data: comics, isError, error, refetch } = useComics({
        queryParams: comicName ? { offset: offset, title: comicName}: { offset },
        refetchOnMount: false,
        select: (res) => {
            totalCount.current = res.data.data.total
            return res && res.data.data;
        }
    });
    console.log(comics);

    useEffect(() => {
        if(offset) {
            refetch()
        }
    }, [offset])

    return (
      <div className="comics-container">
        {isLoading ? <h1 className="center white">Loading...</h1> : null}
        <div className="comics">
          {comics &&
            comics.results?.map((comic) => {
              return (
                <ComicsCard
                  key={v4()}
                  id={comic.id}
                  thumbnail={comic.thumbnail}
                  title={comic.title}
                />
              );
            })}
        </div>
        {!isLoading && comics && comics.results && !comics?.results?.length && (
          <h1 className="center">No Comics Found...</h1>
        )}
        {totalCount.current > DEFAULT_LIMIT && !isLoading && (
          <Pagination
            firstPage={firstPage}
            setFirstPage={setFirstPage}
            total={totalCount.current}
            pageNo={offset}
            limit={DEFAULT_LIMIT}
            setOffset={setoffset}
          />
        )}
      </div>
    );
}

export default Comics