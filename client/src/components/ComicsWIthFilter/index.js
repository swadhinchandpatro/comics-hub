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

function ComicsWithFilter() {
    let comics = [];
    const offset = useRef(0);
    const totalCount = useRef(0);
    const filterHeroesCount = useRef(0);

    const { comicName, filterHeroes, filterHeroHandler } = useContext(SuperHeroContext)
    const results = useComicsByCharacters(filterHeroes, { limit: 20/filterHeroes.length, offset: filterHeroesCount.current !== filterHeroes.length ? 0 : offset });
    console.log(results);
   
    useEffect(() => {
        if(comicName) {
            filterHeroHandler.reset()
        }
    }, [comicName])

    useEffect(() => {
        // refetch()
    }, [offset, filterHeroes])

    const isLoading = results.some(result => result.isLoading)

    if(!isLoading) {
        console.log('loading stopped');
        console.log(results)
        totalCount.current = 0;
        if(filterHeroesCount.current !== filterHeroes.length) {
            filterHeroesCount.current = filterHeroes.length
        }
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
            <div className='comics'>
                {isLoading ? <h1>Loading...</h1> : null}
                {comics?.map(comic => {
                    return <ComicsCard key={v4()} id={comic.id} thumbnail={comic.thumbnail} title={comic.title} />
                })}
            </div>
            <Pagination total={totalCount} pageNo={offset.current} />
        </div>
    )
}

export default ComicsWithFilter