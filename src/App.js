// import logo from './logo.svg';
import './App.css';

import React,{useState} from "react"

import AllProducts from './components/AllProducts';
import NewProductForm from './components/NewProductForm';
import ProductDetails from './components/ProductDetails';
import EditForm from './components/EditForm';

import {
  BrowserRouter,
  Switch, 
  Route, 
  Link, 
} from "react-router-dom"

function App() {
 
  const [formSubmitted, setFormSubmitted] =useState(false)
  return (
    <BrowserRouter>
    <div >
    <div className="App container" >
         <h1> Hello World!</h1>
         <Link to="/" className=" btn btn-primary"> Home </Link>
         <Switch>
           <Route exact path = "/"> 
         <NewProductForm formSubmitted = {formSubmitted} setFormSubmitted = {setFormSubmitted} />

          <hr />
         <AllProducts formSubmitted = {formSubmitted}/>
           </Route>

           <Route path = "/product/:id">
              <ProductDetails></ProductDetails>
           </Route>

           <Route exact path = "/edit/:id">
              <EditForm></EditForm>
           </Route>

         </Switch>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
