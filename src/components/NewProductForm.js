import React, {useState} from 'react';
import axios from "axios"


const NewProductForm = (props) => {

    const [formInfo, setFormInfo] = useState({
        title:"",
        price:"",
        description:""
    })

    // Display error messages
    const [formErrors, setFormErrors] = useState({
        title:"",
        price:"",
        description:""
    })

    // ChangeHandler to update the formInfo object with the information from the form as the form is being changed

    const ChangeHandler = (e)=>{
        console.log("changing form here!!")
        setFormInfo({
            ...formInfo, // hold on to entered info/ prevents rerendering with different info untill submited
            [e.target.name]: e.target.value
        })
    }


    //submitHandler for whent the form submit we send this info to the backend using the routes to create something new
     
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products/create", formInfo)
        .then(response => {
            console.log(response)

            if(response.data.err){
                setFormErrors(response.data.err.errors)
            }else{
                props.setFormSubmitted(!props.formSubmitted)

                //set the form back to empty after it is submitted
                setFormInfo({
                        title:"",
                        price:"",
                        description:""
                        
                    })

                setFormErrors({
                            title: "",
                            price: "",
                            description:""
                        })
                        
                }
        })
        .catch(error =>console.log("couldn't post/create product",error))
    }

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input onChange = {ChangeHandler} type="text" name="title" value ={formInfo.title} id="title" className="form-control" />
                    <p className="text-danger">{formErrors.title?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input onChange = {ChangeHandler} type="number" name="price" value ={formInfo.price} id="price" className="form-control" />
                    <p className="text-danger">{formErrors.price?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input onChange = {ChangeHandler} type="text" name="description" value ={formInfo.description} id="description" className="form-control" />
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <button className="btn btn-success mt-3" type="submit">Create Product</button>
            </form>
        </div>
    );
};



export default NewProductForm;