import { createContext, useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import Carousel from './components/Carousel';
import Comics from './components/Comics';
import { ReactQueryDevtools } from 'react-query/devtools'
import ComicsWithFilter from './components/ComicsWIthFilter'
import SearchBar from './components/SearchBar';

const queryClient = new QueryClient()

export const SuperHeroContext = createContext();

function App() {
  const [filterHeroes, setFilterHeroes] = useState([]);
  const [comicName, setComicName] = useState('');

  const filterHeroHandler = {
    removeHero: (id) => {
      setFilterHeroes(heroes => {
        const pos = filterHeroes.indexOf(id);
        if(pos !== -1) {
          heroes.splice(pos, 1)
          return [...heroes]
        }
        return heroes;
      })
    },
    addHero: (heroId) => {
      setFilterHeroes(heroes => {
        if(heroes.includes(heroId)) {
          return heroes;
        } else {
          return [...new Set([...heroes, heroId])]
        }
      })
    },
    reset: () => setFilterHeroes([])
  }
  const setComicHandler = (name) => setComicName(name)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <div className='marvel-logo'/>
          <SearchBar />
        </header>
        <SuperHeroContext.Provider value={{ filterHeroes, comicName, filterHeroHandler, setComicHandler}}>
          <Carousel />
          { filterHeroes.length ? <ComicsWithFilter /> : <Comics /> }
        </SuperHeroContext.Provider>
      </div>
      <ReactQueryDevtools initialIsOpem={false}/>
    </QueryClientProvider>
  );
}

export default App;
