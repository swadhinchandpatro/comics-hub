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
const fetchComics = (params) => {
    return axios.get(`/fetch-comics${params}`)
}

const fetchComicsByCharacter = (id, params) => {
    return axios.get(`/fetch-comics/${id}${params}`)
}

export const useCharacters = (options) => {
    const { queryParams, ...rest } = options
    return useQuery(["super-heroes", joinQueryParams(queryParams)], () => fetchCharacters(joinQueryParams(queryParams)), {
        ...rest,
        staleTime: 300000 // fresh for 5mins
    })
}

export const useComicsByCharacters = (ids, queryParams) => {
    return useQueries(ids.map(id => {
        return {
            queryKey: ['comic-by-character', id, joinQueryParams(queryParams)],
            queryFn: () => fetchComicsByCharacter(id, joinQueryParams(queryParams))
        }
    }))
}

export const useComics = (options, filters) => {
    const { queryParams, ...rest } = options
    return useQuery(["comics", joinQueryParams(queryParams)], () => fetchComics(joinQueryParams(queryParams)), {
        ...rest,
        staleTime: 300000 // fresh for 5mins
    })
}