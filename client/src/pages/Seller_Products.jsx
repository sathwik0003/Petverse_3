import  { useState, useEffect } from 'react';
import { Image, Button } from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import './Seller_Products.css';
import Navbar from './NavBar';

const Seller_Products = () => {
    const { bc } = useParams();
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [bc]);

    const fetchProducts = () => {
        fetch(`http://localhost:3001/api/products/${bc}`)
            .then(response => response.json())
            .then(data => setFilteredItems(data))
            .catch(error => console.error(`Error fetching products for ${bc}:`, error));
    };

    const editProduct = (item) => {
        window.location.href = `/edit/${item.title}/${bc}`;
    };

    const deleteProduct = async (title) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${title}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Product deleted successfully');
                // Update the state after successful deletion
                setFilteredItems(prevItems => prevItems.filter(item => item.title !== title));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error during product deletion:', error);
        }
    };

    return (
        <>
            <Navbar brand={bc}></Navbar>
            <div>
                <div className="mainproduct1">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="ppcard">
                            <Image src={item.image} alt={item.title} objectFit="cover" boxSize="20vw" />
                            <div style={{ backgroundColor: "white" }}>
                                <div style={{ color: "#212529b5", fontSize: "1vw", marginLeft: "2vw" }}>
                                    {item.brandName}
                                </div>
                                <div style={{ marginLeft: "2vw" }}>{item.title}</div>
                                <div style={{ marginLeft: "2vw" }}>
                                    <b>₹{item.price}</b>
                                </div>
                                <div className="buttonproducts">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        height="3vw"
                                        width="9vw"
                                        fontSize="1.5vw"
                                        marginLeft="1vw"
                                        marginBottom="0.6vw"
                                        onClick={() => editProduct(item)}
                                    >
                                        <div style={{ padding: "0.2vw" }}>Edit</div>
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        variant="outline"
                                        size="sm"
                                        height="3vw"
                                        width="8.7vw"
                                        fontSize="1.5vw"
                                        marginRight="1vw"
                                        marginBottom="0.6vw"
                                        background='red'
                                        onClick={() => deleteProduct(item.title)}
                                    >
                                        <div style={{ padding: "0.2vw" }}>Delete</div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Seller_Products;
