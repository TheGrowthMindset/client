import React, {useState, useEffect} from 'react';
import axios from "axios"
import { useParams } from 'react-router';
import { useHistory } from 'react-router';


const EditForm = (props) => {

    const history = useHistory()
    const { id } = useParams();

    const [formInfo, setFormInfo] = useState({
        title:"",
        price:"",
        description:""
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
         .then( response => {
             console.log("response when getting one product to update", response)
            setFormInfo(response.data.results)
            

         })
         .catch(err => console.log(err))
        
    }, []);

    // Display error messages
    // const [formErrors, setFormErrors] = useState({
    //     title:"",
    //     price:"",
    //     description:""
    // })

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
        axios.put(`http://localhost:8000/api/products/update/${id}`, formInfo)
            .then( response => {
                console.log("Updated product succesfully!", response)
                history.push("/")
            })
            .catch(err => console.log("Something went wrong while updating product", err))
       
    }

    return (
        <div>
            <h4> Edit Product</h4>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input onChange = {ChangeHandler} type="text" name="title" value ={formInfo.title} id="title" className="form-control" />
                   
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input onChange = {ChangeHandler} type="number" name="price" value ={formInfo.price} id="price" className="form-control" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input onChange = {ChangeHandler} type="text" name="description" value ={formInfo.description} id="description" className="form-control" />
                   
                </div>
                <button className="btn btn-success mt-3" type="submit">Update Product</button>
            </form>
        </div>
    );
};



export default EditForm;