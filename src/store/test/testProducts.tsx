
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';

// Define Product type
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

function TestProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Correctly type the dispatch
    dispatch(fetchProducts() as any);
    
    // In a real app, you would use a selector instead
    // This is just for testing
    fetch('/testStore/products.json')
      .then(response => response.json())
      .then(data => setProducts(data as Product[]))
      .catch(error => console.error('Error fetching products:', error));
  }, [dispatch]);

  return (
    <div>
      <h2>Test Products</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestProducts;
