import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [name,setName]=useState("");
  const [recipe,setRecipe]=useState("");
  const [fetchState, setFetchState] = useState('init');
  const [array,setArray]=useState([]);

  useEffect(()=>{
    if (fetchState !== 'fetched') {
    axios.get('/server/new_recipe_app_function/all',
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
       console.log("recipes1")
       console.log(response.data.data.recipes);
       setArray(response.data.data.recipes)
       console.log("array",array);
       console.log("recipes2")
       setFetchState('fetched');
      
    })
    .catch((err)=>{
      console.log("error")
      console.log(err)
    })
  }
  },[fetchState],[array])
  
  return (
    <div className="App">
        <nav class="navbar navbar-expand-lg bg-body-tertiary topclass">
          <div class="container-fluid">
              <a class="navbar-brand" href="#">RecipeZone</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                      <a class="nav-link" href="#">About Us</a>
                      <a class="nav-link" href="#">Services</a> 
                    </div>
                </div>
          </div>
        </nav>
        <div class="container-fluid main">
             <h1 class="mb-3 heading">Share your Recipe!</h1>
             <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"></span>
              <input type="text" class="form-control" placeholder="Recipe Name" aria-label="Recipe Name" aria-describedby="basic-addon1"
              onChange={(event)=>
                {
                  setName(event.target.value);
                }
              }
              />
            </div>

            <div class="input-group mb-3 input-group-lg">
              <span class="input-group-text">Your Recipe</span>
              <textarea class="form-control" aria-label="Recipe"
               onChange={(event)=>
                {
                  setRecipe(event.target.value);
                }
              }
              ></textarea>
            </div>

            <button type="button" class="btn btn-success mb-3"
            onClick={()=>
              {
                axios.post('/server/new_recipe_app_function/add',
                  {
                       name,
                       recipe
                  }
                ).then((response) => {
                  console.log("success")
                  console.log(response)
                })
                .catch((err)=>{
                  console.log(err);
                })
              }
            }
            >Submit</button>
              
        <div className="row">
          {array.map((ele, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-header">{ele.name}</div>
                <div className="card-body">
                  <p className="card-text">{ele.recipe}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
}

export default App;
