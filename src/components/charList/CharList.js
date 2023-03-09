import { Component } from 'react'
import './charList.scss';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.marvelService.getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  renderChars = (items) => {
    const chars = items.map(item => {
      const imgStyle = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

      return (
        <li className="char__item"
            key={item.id}
            onClick={() => this.props.onCharSelected(item.id)}>
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


  render() {
    const { charList, loading, error } = this.state

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? this.renderChars(charList) : null

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;
