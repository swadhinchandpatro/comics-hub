import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCharacters } from '../../hooks/useSuperHeroes'
import { v4 } from 'uuid'

import './styles.scss'
import Hero from '../Hero';
import { SuperHeroContext } from '../../App';

function Carousel() {
    // const [heroes, setHeroes] = useState([]);
    const [offset, setoffset] = useState(0);
    const [disabled, setDisable] = useState(false);
    const totalCount = useRef(0);
    const oldHeroes = useRef({ results: []});

    const { comicName, filterHeroes, filterHeroHandler } = useContext(SuperHeroContext)
    const { isLoading , data: heroes, isError, error, refetch } = useCharacters({
        queryParams: { offset: offset},
        refetchOnMount: false,
        select: (res) => {
            totalCount.current = res.data.data.total
            const serverData = res && res.data.data;
            if(serverData.offset !== oldHeroes.current?.offset) {
                serverData.results = [...oldHeroes.current.results, ...serverData.results]
            }
            oldHeroes.current = serverData
            return serverData
        }
    });
    console.log(heroes);
    // useEffect(() => {
    //     if(serverData?.results?.length) {
    //         setHeroes(heroes => [...heroes, ...serverData.results])
    //     }
    // }, [serverData])

    useEffect(() => {
        refetch()
    }, [offset])

    useEffect(() => {
        if(comicName) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [comicName])

    const selectSuperHero = (id) => {
        const pos = filterHeroes.indexOf(id);
        if(pos !== -1) {
            filterHeroHandler.removeHero(id);
        } else {
            filterHeroHandler.addHero(id);
        }
    }

    return (
        <div className={disabled ? 'carousel carousel-disabled' : 'carousel'}>
            <div className='left'>
                <FontAwesomeIcon icon={faArrowLeft} color="black" />
            </div>
            <div className={isLoading ? 'center' : 'carousel-container'}>
                {heroes && heroes.results?.map(hero => {
                    const className = filterHeroes.includes(hero.id) ? 'ticked' : ''
                    return <Hero key={v4()} className={className} onClick={() => selectSuperHero(hero.id)} id={hero.id} thumbnail={hero.thumbnail} />
                })}
            </div>
            <div className='right'>
                <FontAwesomeIcon icon={faArrowRight} color="black" />
            </div>
        </div>
    )
}

export default memo(Carousel)
