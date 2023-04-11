import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './singleCharItem.scss'

const SingleCharItem = ({ data }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = data

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
    <div className="single-comic">
      <Helmet>
        <meta
          name="description"
          content={`${name} page information`}
        />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <div className='single-comic__info-2'>
          <p className="single-comic__descr">{description}</p>
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {comicsList}
        </ul>
      </div>
      <div className="char__btns">
        <a href={homepage} target="_blank" className="button button__main">
          <div className="inner">homepage</div>
        </a>
        <a href={wiki} target="_blank" className="button button__secondary">
          <div className="inner">Wiki</div>
        </a>
        <Link to="/" className="button button__secondary single-comic-link">
          <div className="inner">Back to all</div>
        </Link>
      </div>
    </div>
  )
}

export default SingleCharItem
