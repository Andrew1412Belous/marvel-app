import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'


import Spinner from '../spinner/spinner'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const SingleComicItem = lazy(() => import('../pages/singleComicItem/SingleComicItem'))
const SingleCharItem = lazy(() => import('../pages/singleCharItem/singleCharItem'))

const App = () => {
  return (
   <Router>
     <div className="App">
       <div className="app">
         <AppHeader/>
         <main>
           <Suspense fallback={<Spinner/>}>
             <Routes>
               <Route path="/" element={<MainPage/>}/>
               <Route path="/comics" element={<ComicsPage/>}/>
               <Route path="/comics/:id"
                      element={<SinglePage
                          Component={SingleComicItem}
                          dataType='comic'
               />}/>
               <Route path="/characters/:id"
                      element={<SinglePage
                        Component={SingleCharItem}
                        dataType='char'
                      />}/>
               <Route path="*" element={<Page404/>}/>
             </Routes>
           </Suspense>
         </main>
       </div>
     </div>
   </Router>
  )
}

export default App;
