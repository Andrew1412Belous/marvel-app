import { useState } from 'react'

import AppHeader from '../appHeader/AppHeader'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import RandomChar from '../randomChar/RandomChar'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import decoration from '../../resources/img/vision.png'

const App = () => {
  const [selectedChar, setChar] = useState(null)

  const onCharSelected = (id) => {
    setChar(id)
  }

  return (
    <div className="App">
      <div className="app">
        <AppHeader/>
        <main>
          <ErrorBoundary>
            <RandomChar/>
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={selectedChar}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    </div>
  )
}

export default App;
