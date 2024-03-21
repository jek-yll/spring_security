import api from './api';
import { authHeader } from '../helpers/auth-header';

const getAllProducts = () => {
  return api.get('/products', { headers: authHeader() });
};

const createProduct = (name, price) => {
  return api.post('products/admin/post', { name, price }, { headers: authHeader() })
}

const deleteProduct = ( id ) => {
  return api.delete('products/'+id, {headers: authHeader()} )
}

const updateProduct = ( id, name, price ) => {
  return api.put('/products',{id, name, price}, {headers: authHeader()})
}

// export const productService = { getAllProducts, createProduct};

export default { getAllProducts, createProduct, deleteProduct, updateProduct }