import { Component } from 'react'
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }

  componentDidCatch(error, errorInfo) {

  }

  updateChar = () => {
    const { charId } = this.props

    if (!charId) return

    this.onCharLoading()

    this.marvelService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
      error: false,
    })
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  render() {
    const { char, loading, error } = this.state

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const View = ({ char }) => {
  const { name, description, homepage, wiki, thumbnail, comics } = char

  const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
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
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item, index) => {
          if (index > 9) return

          return (
            <li key={index} className="char__comics-item">
              {item.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
