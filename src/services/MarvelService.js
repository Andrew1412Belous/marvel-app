import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=02d715fb4f50e3d9a4286c535410624f'
  const _baseCharOffset = 300
  let _totalCharacters = 0

  const getAllCharacters = async (offset = _baseCharOffset) => {
    const result =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
    _totalCharacters = result.data.total;

    return result.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const result = await request(`${_apiBase}characters/${id}?${_apiKey}`)

    return _transformCharacter(result.data.results[0])
  }

  const getCharacterByName = async (name) => {
    const result = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)

    if (result.data.results.length) {
      return _transformCharacter(result.data.results[0])
    }
  }

  const getAllComics = async (offset = 0) => {
    const result = await request((`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`))

    return result.data.results.map(_transformComics)
  }

  const getComics = async (id) => {
    const result = await request(`${_apiBase}comics/${id}?${_apiKey}`)

    return _transformComics(result.data.results[0])
  }

  const _transformCharacter = (char) => {
    const homepage = char.name.split(' ').map(word => word.indexOf('(')
      ? word
      : word.replace(/[()]/g, ''))
      .join('-')

    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: `https://www.marvel.com/characters/${homepage}`,
      wiki: char.urls.length === 3 ? char.urls[2].url : char.urls[1].url,
      comics: char.comics.items,
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    }
  }

  return {
    getCharacter,
    getAllCharacters,
    getComics,
    getAllComics,
    getCharacterByName,
    clearError,
    process,
    setProcess,
  }
}

export default useMarvelService
