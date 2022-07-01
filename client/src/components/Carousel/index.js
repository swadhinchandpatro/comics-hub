import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCharacters } from '../../hooks/useSuperHeroes'
import { v4 } from 'uuid'

import './styles.scss'
import Hero from '../Hero';
import { SuperHeroContext } from '../../App';
import { DEFAULT_LIMIT } from '../../constants';

function Carousel() {
    const [offset, setoffset] = useState(0);
    const [disabled, setDisable] = useState(false);
    const totalCount = useRef(0);
    const heroToFocus = useRef(10);
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

    const observer = useRef()
    const lastCharacterRef = useCallback((node) => {
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setoffset(offset => offset + DEFAULT_LIMIT)
            }
        })
        if(node) observer.current.observe(node)
    }, [heroes, isLoading])

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

    const scrollLeft = () => {
        const newHeroPos = Math.max(0, heroToFocus.current - 10);
        const view = document.getElementById(heroes.results[newHeroPos]?.id)
        heroToFocus.current = heroToFocus.current - 6;
        view.scrollIntoView({
            behavior: 'smooth'
        })
    }
    
    const scrollRight = () => {
        const newHeroPos = Math.min(heroes?.results?.length - 1, heroToFocus.current + 6);
        const view = document.getElementById(heroes.results[newHeroPos]?.id)
        heroToFocus.current = newHeroPos;
        view.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <div className={disabled ? 'carousel carousel-disabled' : 'carousel'}>
            <div className='left' onClick={scrollLeft}>
                <FontAwesomeIcon icon={faArrowLeft} color="white" />
            </div>
            <div className={'carousel-container'}>
                {heroes && heroes.results?.map((hero, i) => {
                    const className = filterHeroes.includes(hero.id) ? 'ticked' : ''
                    if(i + 1 === heroes.results.length) {
                        return (
                        <Hero
                            key={v4()}
                            ref={lastCharacterRef}
                            className={className}
                            onClick={() => selectSuperHero(hero.id)}
                            id={hero.id}
                            thumbnail={hero.thumbnail} />
                        )
                    }
                    return (
                    <Hero
                        key={v4()}
                        className={className}
                        onClick={() => selectSuperHero(hero.id)}
                        id={hero.id}
                        thumbnail={hero.thumbnail} />
                    )
                })}
            </div>
            <div className='right' onClick={scrollRight}>
                <FontAwesomeIcon icon={faArrowRight} color="white" />
            </div>
        </div>
    )
}

export default memo(Carousel)
