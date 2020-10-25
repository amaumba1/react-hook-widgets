import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Convert = ({ language, text }) => {
  const [translated, setTranslated ] = useState('')
  const [debouncedText, setDebouncedText] = useState(text)

  // useEffect 1. we want to run whenever text change
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text)
    }, 500)

    // cancle the timer 
    return () => {
      clearTimeout(timerId)
    }
  }, [text])

  // useEffect 2. 
  useEffect(() => {
    const doTranslatin = async () => {
       const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {},{
         params: {
           q: debouncedText,
           target: language.value,
           key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
         }
       })
       // first data is info from axios, second data is the request data
       setTranslated(data.data.translations[0].translatedText)
    }
    doTranslatin()
  }, [language, debouncedText])

  return (
    <div>
        <h1 className="ui header">{translated}</h1>
    </div>
  )
}

export default Convert