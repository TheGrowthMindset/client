import React, {useState, useEffect} from 'react'
import axios from 'axios';

import {Link} from "react-router-dom"
    
const AllProducts = (props) => {
  

    const [allProducts, setAllProducts] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
        .then(response => {
            console.log("response when getting all products--->", response)
            setAllProducts(response.data.results)
        })
        .catch(err => console.log("error while retrieving all products--->", err))
    },[props.formSubmitted, deleteToggle])
   
        const deleteProduct = (id) => {
            axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            .then(response => {
                console.log("Just deleted the product!", response)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err => console.log(err))
        }

    return (
        <div>
            <h1> Here are all the Products! </h1>
            {
                allProducts.map((product, i) => {
                    return(
                        
                        <div key = {i} className="card">
                        <div className="card-body">
                            <h5 className="card-title"> <Link to = {`/product/${product._id}`}>{product.title}</Link></h5>
                            <p className="card-text"> {product.price} </p>
                            <p className="card-text"> {product.description} </p>
                            <Link to= {`/product/${product._id}`} className="btn btn-primary">View {product.title} Details</Link>
                            <button onClick={ (e) => deleteProduct(product._id)} className="btn btn-danger"> Delete {product.title} </button>|<Link to = {`/edit/${product._id}`} className="btn btn-secondary"> Edit</Link>
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
    
export default AllProducts;

