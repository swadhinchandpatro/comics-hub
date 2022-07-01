const md5 = require('md5')
const axios = require("axios")
const processResponse = require("./processResponse")

//these would be replaced with ENV_VARIABLES in Prod
const PRIVATE_API_KEY = "d30cd1f8ea224938b5c3b82ba56e224fa3f77c65";
const PUBLIC_API_KEY = "708eb2d87d905c9209fbb2376ccbe5c4";

const COMICS_HOST = "http://gateway.marvel.com"

const getComicsEndpoint = (path, queryParam) => {
    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`);
    return `${COMICS_HOST}/${path}?ts=${timeStamp}&apikey=${PUBLIC_API_KEY}&hash=${hash}&${queryParam}`
}

const joinQueryParams = (query) => {
  return query && Object.keys(query).length ? Object.entries(query).reduce((str, [key, value]) => {
      return `${str}&${key}=${value}`
  }, '') : ''
}

const fetchComics = async (query = {}) => {
  const response =  await axios.get(getComicsEndpoint('/v1/public/comics', joinQueryParams(query)));
  return processResponse.processComicsResponse(response.data.data)
}

const fetchCharacters = async (query = {}) => {
  const response =  await axios.get(getComicsEndpoint('/v1/public/characters', joinQueryParams(query)));
  return processResponse.processCharacterResponse(response.data.data)
}

const fetchComicsOnCharacter = async (characterId, query = {}) => {
  const response =  await axios.get(getComicsEndpoint(`/v1/public/characters/${characterId}/comics`, joinQueryParams(query)));
  return processResponse.processComicsResponse(response.data.data)
}

module.exports = {
  fetchComics,
  fetchCharacters,
  fetchComicsOnCharacter
}