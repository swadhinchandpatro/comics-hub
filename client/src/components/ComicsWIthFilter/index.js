import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCharacters, useComics, useComicsByCharacters } from '../../hooks/useSuperHeroes'
import { v4 } from 'uuid'

import '../Comics/styles.scss'
import { SuperHeroContext } from '../../App';
import ComicsCard from '../ComicsCard';
import Pagination from '../Pagination';
import { DEFAULT_LIMIT } from '../../constants';

function ComicsWithFilter() {
    let comics = [];
    let [offset, setOffset] = useState(0);
    const totalCount = useRef(0);
    const filterHeroesCount = useRef(0);

    const { comicName, filterHeroes, filterHeroHandler } = useContext(SuperHeroContext)
    
    const limit = parseInt(DEFAULT_LIMIT / filterHeroes.length) * filterHeroes.length
    const results = useComicsByCharacters(filterHeroes, {
        limit: parseInt(DEFAULT_LIMIT / filterHeroes.length),
        offset: filterHeroesCount.current !== filterHeroes.length ? 0 : parseInt(offset / filterHeroes.length)
    });
    console.log(results);

    useEffect(() => {
        if (comicName) {
            filterHeroHandler.reset()
        }
    }, [comicName])

    useEffect(() => {
        if(filterHeroesCount.current !== filterHeroes.length) {
            filterHeroesCount.current = filterHeroes.length
            setOffset(0)
        }
    }, [filterHeroes])

    useEffect(() => {
        if (offset) {
            results.forEach(result => {
                result.refetch()
            })
        }
    }, [offset])

    const isLoading = results.some(result => result.isLoading)

    if (!isLoading) {
        console.log('loading stopped');
        console.log(results)
        totalCount.current = 0;

        comics = results.reduce((combinedResult, comicsOnHero) => {
            const result = comicsOnHero.data.data.data
            totalCount.current += result.total
            return combinedResult.concat(result.results)
        }, [])

        // //shuffle
        // comics.sort((a, b) => 0.5 - Math.random())

        console.log(filterHeroes, totalCount);
    }

    return (
        <div className='comics-container'>
            {isLoading ? <h1 className='center white'>Loading...</h1> : null}
            <div className='comics'>
                {comics?.map(comic => {
                    return <ComicsCard key={v4()} id={comic.id} thumbnail={comic.thumbnail} title={comic.title} />
                })}
            </div>
            {totalCount.current > limit && !isLoading && <Pagination total={totalCount.current} pageNo={offset} limit={limit} setOffset={setOffset} />}
        </div>
    )
}

export default ComicsWithFilter