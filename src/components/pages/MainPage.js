import { useState } from 'react'
import { Helmet } from 'react-helmet'

import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

import decoration from '../../resources/img/vision.png'
import CharSearchForm from '../charSearchForm/CharSearchForm'

const MainPage = () => {
  const [selectedChar, setChar] = useState(null)

  const onCharSelected = (id) => {
    setChar(id)
  }

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
        />
        <title>Marvel Geeks</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected}/>
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage
