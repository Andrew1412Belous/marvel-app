import { useParams } from 'react-router-dom'
import {
  useEffect,
  useState,
} from 'react'

import useMarvelService from '../../services/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import setContent from '../../utils/setContent'

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams()

  const [data, setData] = useState(null)

  const { getComics, getCharacter, clearError, process, setProcess }= useMarvelService()

  useEffect(() => updateData(), [id])

  const updateData = () => {
    clearError()

    dataType === 'comic'
      ? getComics(id)
        .then(onDataLoaded)
        .then(() => setProcess('confirmed'))
      : getCharacter(id)
        .then(onDataLoaded)
        .then(() => setProcess('confirmed'))
  }

  const onDataLoaded = (data) => {
    setData(data)
  }

  return (
    <>
      <AppBanner/>
      {setContent(process, Component, data)}
    </>
  )
}

export default SinglePage
