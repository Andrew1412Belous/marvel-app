import { useState } from 'react'
import { Field, Form, Formik, ErrorMessage as FormikErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import ErrorMessage from '../errorMessage/errorMessage'
import useMarvelService from '../../services/MarvelService'

import './charSearchForm.scss'

const CharSearchForm = () => {
  const [char, setChar] = useState(null)
  const {loading, error, getCharacterByName, clearError} = useMarvelService()

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const updateChar = (name) => {
    clearError()

    getCharacterByName(name)
      .then(onCharLoaded)
  }

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null
  let results = char === null
    ? null
    : char === undefined
      ? <p className="char__search-error">The character was not found. Check the name and try again</p>
      : <div className="char__search-wrapper">
         <div className="char__search-success">{`There is! Visit ${char.name} page?`}</div>
         <Link to={`/characters/${char.id}`} className="button button__secondary">
            <div className="inner">To page</div>
         </Link>
        </div>

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: ''
        }}
        onSubmit={({ charName }) => {
          updateChar(charName)
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required')
        })}
        validateOnBlur={false}>
        <Form onChange={(e) => !e.target.value ? setChar(null) : null}>
          <label className="char__search-label">Or find a character by name:</label>
          <div className="char__search-wrapper">
            <Field
              id='charName'
              type='text'
              name='charName'
              placeholder='Enter name'>
            </Field>
            <button
              type='submit'
              className='button button__main'
              disabled={loading}>
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage name='charName' className='char__search-error' component='div'></FormikErrorMessage>
        </Form>
      </Formik>
      {errorMessage}
      {results}
    </div>
  )
}

export default CharSearchForm
