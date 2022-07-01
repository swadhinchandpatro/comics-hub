const processCharacterResponse = (response) => {
    let { results, ...rest} = response

    results = results.map(character => {
        return {
            id: character.id,
            name: character.name,
            thumbnail: character.thumbnail.path + '.' +character.thumbnail.extension
        }
    })

    return {
        ...rest,
        results
    }
}

const processComicsResponse = (response) => {
    let { results, ...rest} = response

    results = results.map(character => {
        return {
            id: character.id,
            title: character.title,
            thumbnail: character.thumbnail.path + '.' +character.thumbnail.extension
        }
    })

    return {
        ...rest,
        results
    }
}

module.exports = {
    processCharacterResponse,
    processComicsResponse
}