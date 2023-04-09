import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner'
import AppBanner from '../appBanner/AppBanner'

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams()

  const [data, setData] = useState(null)
  const { loading, error, getComics, getCharacter, clearError }= useMarvelService()

  useEffect(() => updateData(), [id])

  const updateData = () => {
    clearError()

    dataType === 'comic'
      ? getComics(id)
        .then(onDataLoaded)
      : getCharacter(id)
        .then(onDataLoaded)
  }

  const onDataLoaded = (data) => {
    setData(data)
  }

  const errorMessage = error ? <ErrorMessage/> : null
  const spinner = loading ? <Spinner/> : null
  const content = !(loading || error || !data) ? <Component data={data}/> : null

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SinglePage
