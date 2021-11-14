import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import axios from "axios";
// import { useHistory } from "react-router-dom"

const ProductDetails = () => {
    const { id } = useParams();
    const history = useHistory();

    const [productInfo, setProductInfo] = useState({})

 useEffect( () => {

     axios.get(`http://localhost:8000/api/products/${id}`)
         .then( response => {
             console.log("response when getting one product", response)
             setProductInfo(response.data.results)

         })
         .catch(err => console.log(err))
 }, [])

    const deleteProduct = () => {
        console.log("deleting Product")

        axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            .then(response => {
                console.log("Just deleted the product!", response)
                history.push("/") // use history to redirect. in this case back to to home or the localhost 
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Ninja about Prduct Below</h1>
            <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Title: {productInfo.title}</h5>
                            <p className="card-text">  Price: {productInfo.price} </p>
                            <p className="card-text">  Description: {productInfo.description} </p>
                            
                            <button onClick = {deleteProduct} className="btn btn-danger"> Delete { productInfo.title }</button>
                            {/* <Link to="#" className="btn btn-danger">Delete {productInfo.title}</Link> */}
                        </div>
                        </div>
        </div>
    );
};


export default ProductDetails;