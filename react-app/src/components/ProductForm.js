import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from '../services/productService';

const ProductForm = () => {

    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        price: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState, 
            [name]: value
        }));
        console.log(productData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, price } = productData;
            await productService.createProduct(name, price);
            navigate('/products');
        
        } catch(error) {
            console.error('Error: ', error)
        }
    }

    return (

        <div className="container">
            <h1>Product Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Reference</label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-primary">Add Product</button>
                </div>
            </form>
        </div>

    )

}

export default ProductForm;