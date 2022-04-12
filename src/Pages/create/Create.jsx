//React imports
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

//styles
import './Create.css'


export default function Create() {
  
  //Constants
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const { postData, data, error } = useFetch("http://localhost:3000/recipes", "POST")
  const history = useHistory();

  //Methods
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes ' });
    //console.log(title, method, cookingTime, ingredients);
  }

  //Method
  const addIngredient = (e) => { 
    e.preventDefault();
    const ingredient = newIngredient.trim();

    if(ingredient && !ingredients.includes(ingredient)){ 
      setIngredients(prevIngredient => [...prevIngredient, ingredient]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  }

  //Send User Home, After Creating Recipe
    useEffect(() => {
      if(data) { 
        history.push('/');
      }
    },[data])

  return (
    <div className='create'>
      {error && <div>{error}</div>}
      
      <h2 className='page-title'>Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
        
          <label>
            <span>Recipe Title:</span>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required/>
          </label>

        {/*Ingredients Go Here */}
        <label>
          <span>Ingredients</span>
          <div className='ingredients'>
            <input type="text" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} ref={ingredientInput} />
            <button onClick={addIngredient} className="btn">add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i => <em key={i}> {i}, </em> ) }</p>
        
          <label>
            <span>Recipe Method:</span>
            <textarea onChange={(e) => setMethod(e.target.value)} value={method} required/>
          </label>

          <label>
            <span>Cooking Time (minutes):</span>
            <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required/>
          </label>

          <button className='btn'>submit</button>
        </form>

      </div>
  )
}
