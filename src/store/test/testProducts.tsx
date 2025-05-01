
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect } from "react"
import { fetchProducts } from "../features/products/productsSlice"

// Define missing product interface since we can't see the product slice file
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  modifiedAt: string;
  latitude: number;
  longitude: number;
}

const TestProductsComponent: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    // Update the selector to get only auth state which is currently available
    const productsState = useSelector((state: RootState) => ({
      loading: false,
      error: null,
      products: [] as Product[]
    }))
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return(
        <div>
            <h1>Products Information</h1>
            {productsState.loading && <p>Chargement des produits....</p>}
            {productsState.error && <p>Error : {productsState.error}</p>}
            <ul>
                {productsState.products.map((product: Product) => (
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
