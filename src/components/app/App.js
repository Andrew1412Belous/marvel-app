import { Component } from 'react'
import AppHeader from '../appHeader/AppHeader'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import RandomChar from '../randomChar/RandomChar'
import decoration from '../../resources/img/vision.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

class App extends  Component {
  state = {
    selectedChar: null,
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="app">
          <AppHeader/>
          <main>
            <RandomChar/>
            <div className="char__content">
              <CharList onCharSelected={this.onCharSelected}/>
              <ErrorBoundary>
                <CharInfo charId={this.state.selectedChar}/>
              </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
          </main>
        </div>
      </div>
    )
  }
}

export default App;
