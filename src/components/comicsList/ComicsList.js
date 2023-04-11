import {
  useState,
  useEffect,
} from 'react'

import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>
    case 'loading':
      return newItemLoading ? <Component/> : <Spinner/>
    case 'confirmed':
      return <Component/>
    case 'error':
      return <ErrorMessage/>
    default:
      throw new Error('Unexpected process state')
  }
}

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(100)
  const [comicsEnded, setComicsEnded] = useState(false)

  const { getAllComics, process, setProcess } = useMarvelService()

  useEffect(() => onRequest(offset, true), [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onComicsListLoaded = (newComicsList) => {
    setComicsList(comicsList => [...comicsList, ...newComicsList])
    setNewItemLoading(false)
    setOffset(offset => offset + 8)
    setComicsEnded(newComicsList.length < 8)
  }

  function renderComics (items) {
    const comics = items.map((item, index) => {
      const imgStyle = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

      return (
        <li className="comics__item" key={index}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {comics}
      </ul>
    )
  }

  return (
    <div className="comics__list">
      {setContent(process, () => renderComics(comicsList), newItemLoading)}
      <button
        disabled={newItemLoading}
        style={{'display' : comicsEnded ? 'none' : 'block'}}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;
