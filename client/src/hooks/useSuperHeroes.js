import axios from "axios"
import { useQueries, useQuery } from "react-query"

const joinQueryParams = (query) => {
    return query && Object.keys(query).length ? Object.entries(query).reduce((str, [key, value]) => {
        return `${str}&${key}=${value}`
    }, '?') : ''
}

const fetchCharacters = (params) => {
    return axios.get(`/fetch-characters${params}`)
}
const fetchComics = () => {
    return axios.get('/fetch-comics')
}

const fetchComicsByCharacter = (id, params) => {
    return axios.get(`/fetch-comics/${id}${params}`)
}

export const useCharacters = (options) => {
    const { queryParams, ...rest } = options
    return useQuery("super-heroes", () => fetchCharacters(joinQueryParams(queryParams)), {
        ...rest,
        staleTime: 300000 // fresh for 5mins
    })
}

export const useComicsByCharacters = (ids, queryParams) => {
    return useQueries(ids.map(id => {
        return {
            queryKey: ['comic-by-character', id],
            queryFn: () => fetchComicsByCharacter(id, joinQueryParams(queryParams))
        }
    }))
}

export const useComics = (options, filters) => {
    return useQuery("comics", fetchComics, {
        ...options,
        staleTime: 300000 // fresh for 5mins
    })
}