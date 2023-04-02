import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import RandomChar from '../randomChar/RandomChar'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import decoration from '../../resources/img/vision.png'
import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList'

const App = () => {
  const [selectedChar, setChar] = useState(null)

  const onCharSelected = (id) => {
    setChar(id)
  }

  return (
   <Router>
     <div className="App">
       <div className="app">
         <AppHeader/>
         <main>
           <Switch>
             <Route exact path="/">
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
             </Route>
             <Route exact path="/comics">
               <AppBanner/>
               <ComicsList/>
             </Route>
           </Switch>
         </main>
       </div>
     </div>
   </Router>
  )
}

export default App;
