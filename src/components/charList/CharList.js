import { Component } from 'react'
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'

import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 300,
    charEnded: false,
    pageEnded: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.onRequest()

    window.addEventListener('scroll', this.checkPageEnded)
    window.addEventListener('scroll', this.onUpdateCharListByScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkPageEnded)
    window.removeEventListener('scroll', this.onUpdateCharListByScroll)
  }

  checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      this.setState({ pageEnded: true })
    }
  }

  onUpdateCharListByScroll = () => {
    const { pageEnded, charEnded, newItemLoading } = this.state

    if (pageEnded && !newItemLoading && !charEnded) {
      this.onRequest(this.state.offset)
    }
  }

  onRequest = (offset) => {
    this.setState({
      newItemLoading: true,
    })

    this.marvelService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoaded = (newCharList) => {
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: newCharList.length < 9,
      pageEnded: false
    }))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  itemRefs = []

  setRef = (ref) => {
    this.itemRefs.push(ref)
  }

  focusOnItem = (id) => {
    this.items
      .forEach(item => item.classList.remove('char__item_selected'))

    this.itemRefs[id].classList.add('char__item_selected')
    this.itemRefs[id].focus()
  }

  renderChars = (items) => {
    const chars = items.map((item, index) => {
      const imgStyle = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

      return (
        <li className="char__item"
            tabIndex={0}
            ref={this.setRef}
            key={item.id}
            onClick={() => {
              this.props.onCharSelected(item.id)
              this.focusOnItem(item.id)
            }}
            onKeyPress={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
              this.props.onCharSelected(item.id);
              this.focusOnItem(index);
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


  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? this.renderChars(charList) : null

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{display: charEnded ? 'none' : 'block'}}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
