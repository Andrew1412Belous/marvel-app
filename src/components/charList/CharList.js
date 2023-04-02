import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'

import './charList.scss';

const CharList = (props) => {
  const [charList, setCharList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(300)
  const [charEnded, setCharEnded] = useState(false)

  const { loading, error, getAllCharacters } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)

    return () => {

    }
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllCharacters(offset)
      .then(onCharListLoaded)
  }

  const onCharListLoaded = (newCharList) => {
    setCharList(charList => [...charList, ...newCharList])
    setNewItemLoading(false)
    setOffset(offset => offset + 9)
    setCharEnded(newCharList.length < 9)
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
  const spinner = loading && !newItemLoading ? <Spinner/> : null
  const items = renderChars(charList)

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
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
