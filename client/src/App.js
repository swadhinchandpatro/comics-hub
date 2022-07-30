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

const SuperHeroProvider = ({ children }) => {
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
    <SuperHeroContext.Provider value={{ filterHeroes, comicName, filterHeroHandler, setComicHandler}}>
      {children}
      { filterHeroes.length && !comicName ? <ComicsWithFilter /> : <Comics /> }
    </SuperHeroContext.Provider>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <SuperHeroProvider>
          <header className="App-header">
            <div className='marvel-logo'/>
            <SearchBar />
          </header>
          <Carousel />
        </SuperHeroProvider>
      </div>
      <ReactQueryDevtools initialIsOpem={false}/>
    </QueryClientProvider>
  );
}

export default App;
