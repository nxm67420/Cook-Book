//React imports
import React from 'react'
import { useFetch } from '../../hooks/useFetch'

//styles
import './Home.css'

//components
import RecipeList from '../../components/RecipeList'

export default function Home() {
  const {data , error, isLoading } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
