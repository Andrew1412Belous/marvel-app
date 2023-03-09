class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=02d715fb4f50e3d9a4286c535410624f'

  getResource = async (url) => {
    let result = await fetch(url)

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`)
    }

    return result.json()
  }

  getAllCharacters = async () => {
    const result =  await this.getResource(`${this._apiBase}characters?limit=9&offset=400&${this._apiKey}`)

    return result.data.results.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)

    return this._transformCharacter(result.data.results[0])
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }
}

export default MarvelService
