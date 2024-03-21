import React, { useEffect, useState } from 'react';
import  productService  from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [uptMode, setUptMode] = useState({});
  const [updatedName, setUpdatedName] = useState({});
  const [updatedPrice, setUpdatedPrice] = useState({});

  useEffect(() => {
    productService.getAllProducts()
      .then(response => {
        console.log(response)
        setProducts(response.data);
      })
      .catch(error => {
        setError('Erreur lors de la récupération des produits.', error);
      });
  }, []);

  const handleDelete = (id) => {
    productService.deleteProduct(id)
    .then(() => {
      setProducts(products.filter(p => p.id !== id));
    })
    .catch(error => {
      console.error("Error : ", error)
    })
  }

  const toggleUpdateMode = (id) => {
    setUptMode(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const handleNameChange = (event, id) => {
    setUpdatedName({ ...updatedName, [id]: event.target.value });
  }

  const handlePriceChange = (event, id) => {
    setUpdatedPrice({ ...updatedPrice, [id]: event.target.value });
  }

  const handleUpdate = (id, currentName, currentPrice) => {
    const newName = updatedName[id] || currentName;
    const newPrice = updatedPrice[id] || currentPrice;

    productService.updateProduct(id, newName, newPrice)
      .then(() => {
        setProducts(products.map(p => p.id === id ? { ...p, name: newName, price: newPrice } : p));
        setUptMode({ ...uptMode, [id]: false });
      })
      .catch(error => {
        console.error("Error updating product: ", error);
      });
  }

  return (
    <div className="container mt-5">
      <h2>Product List</h2>
      {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">{index + 1}</th>
              <td>
                {uptMode[product.id] ?
                  <input type="text" className='form-control' value={updatedName[product.id] || product.name} onChange={(e) => handleNameChange(e, product.id)} />
                  :
                  product.name
                }
              </td>
              <td>
                {uptMode[product.id] ?
                  <input type="text" className='form-control' value={updatedPrice[product.id] || product.price} onChange={(e) => handlePriceChange(e, product.id)} />
                  :
                  <input type='text' className='form-control b-none' value={product.price}>
                    
                  </input>
                }
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(product.id)}>
                  delete
                </button>

                {
                  !uptMode[product.id] ?
                  
                  <button className='btn btn-warning ml-3' onClick={() => toggleUpdateMode(product.id)}>
                  update
                  </button> : 

                  <button className='btn btn-success ml-3' onClick={() => handleUpdate(product.id, product.name, product.price)}>
                  save
                  </button> 
                }
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
