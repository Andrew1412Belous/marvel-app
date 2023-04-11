import {
  useState,
  useEffect,
} from 'react'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null)

  const {
    getCharacter,
    clearError,
    process,
    setProcess,
  } = useMarvelService()

  useEffect(() => updateChar(), [props.charId])

  const updateChar = () => {
    const { charId } = props

    if (!charId) return

    clearError()

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  )
}

const View = ({ data }) => {
  const { name, description, homepage, wiki, thumbnail, comics } = data

  const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' }

  const comicsList = comics.length === 0
    ? 'Sorry, there is no comics'
    : comics.map((comic, i) => {
      return (
        <li key={i} className="char__comics-item">
          <Link to={`/comics/${comic.resourceURI.substring(43)}`}>{comic.name}</Link>
        </li>
      )
    })

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target="_blank" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} target="_blank" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsList}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo
