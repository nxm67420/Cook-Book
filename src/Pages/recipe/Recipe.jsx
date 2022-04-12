//React imports
import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

//styles
import './Recipe.css'

//components
import RecipeList from '../../components/RecipeList'
import { useEffect } from 'react/cjs/react.production.min'

export default function Recipe() {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { data:recipe, isLoading, error } = useFetch(url);

  return (
    <div className='recipe'>
        {error && <p className='error'>{error}</p>}
        {isLoading && <p className='laoding'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Take {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) =>
              <li key={ing}>{ing}</li>
            )}
          </ul>
          <p className="method">{recipe.method }</p>
        </>
        )}
    </div>
  )
}
