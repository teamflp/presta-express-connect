import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect } from "react"
import { fetchProducts } from "../features/products/productsSlice"

const TestProductsComponent : React.FC = () => {
    const dispatch : AppDispatch = useDispatch() // hook pour pouvoir utiliser la méthode dispatch de Redux
    const {products, loading, error} = useSelector((state: RootState) => state.products) // hook pour accéder à l'état du store Redux

    // Dipatch pour envoyer des actions au store
    useEffect(() => {
        dispatch((fetchProducts()))
    }, [dispatch])

    return(
        <div>
            <h1>Products Information</h1>
            {loading && <p>Chargement des produits....</p>}
            {error && <p>Error : {error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Prix : {product.price}</p>
                        <p>Quantité : {product.quantity}</p>
                        <p>Crée le : {product.createdAt}</p>
                        <p>Modifié le : {product.modifiedAt}</p>
                        <p>Latitude : {product.latitude}</p>
                        <p>Longitude : {product.longitude}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TestProductsComponent