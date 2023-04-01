import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'

import './charList.scss';

const CharList = (props) => {
  const [charList, setCharList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(300)
  const [charEnded, setCharEnded] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    onRequest()

    return () => {

    }
  }, [])

  const onRequest = (offset) => {
    setNewItemLoading(true)

    marvelService.getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError)
  }

  const onCharListLoaded = (newCharList) => {
    setCharList(charList => [...charList, ...newCharList])
    setLoading(false)
    setNewItemLoading(false)
    setOffset(offset => offset + 9)
    setCharEnded(newCharList.length < 9)
  }

  const onError = () => {
    setLoading(false)
    setError(true)
  }

  const itemRefs = useRef([])

  const focusOnItem = (id) => {
    itemRefs.current
      .forEach(item => item.classList.remove('char__item_selected'))

    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  function renderChars (items) {
    const chars = items.map((item, index) => {
      const imgStyle = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

      return (
        <li className="char__item"
            tabIndex={0}
            ref={el => itemRefs.current[index] = el}
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id)
              focusOnItem(index)
            }}
            onKeyPress={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(index);
            }
            }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
          <div className="char__name">{item.name}</div>
        </li>
      )
    })

    return (
      <ul className="char__grid">
        {chars}
      </ul>
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null
  const spinner = loading ? <Spinner/> : null
  const content = !(loading || error) ? renderChars(charList) : null

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{display: charEnded ? 'none' : 'block'}}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
