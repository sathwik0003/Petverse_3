import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Heading, Image, Card } from '@chakra-ui/react';
import Navbar from './NavBar';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa'; // Importing icons for available and sold sections
import './SellerSingle.css'

const SellerSingle = () => {
    const { title } = useParams();
    const [product, setProduct] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://petverse-3.onrender.com/products/${title}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3002/orders?title=${title}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchProductDetails();
        fetchOrders();
    }, [title]);

    return (
        <Box>
            <Navbar />
            {product && (
                <Card m="2rem" display="flex" flexDirection="row" flexWrap="wrap" border="0" maxWidth="100rem" height="40rem" boxShadow="md" borderRadius="md">
                    <div style={{ border: '0.1px solid black' }}>
                        <Image  classname='singleimage' src={`http://localhost:3002/uploads/${product.image}`} alt={title} boxSize='35vw' borderRadius="md" />
                    </div>
                    <Box border="0.1px solid black"></Box>
                    <Box m="2rem" width="40vw" border="0">
                        <Heading fontSize="2vw" mt="3vw" ml='15rem' textAlign="center">{title}</Heading>
                        <Heading fontSize="3vw" mt="1vw" ml='17rem' textAlign="center">Rs.{product.price}</Heading>
                        <Box mt="0.5vw" border="0">
                            <Text fontSize="1vw" m="1vw" ml='13rem' w='35rem'>{product.description}</Text>
                            <Flex justifyContent="space-between" mt="1vw">
                                <Box className="availability-box" style={{background: '#ECC94B',borderRadius: '1rem',padding: '1rem 8rem',display:"flex", alignItems:"center"} }  >
                                    <FaCheckCircle size={20} color="green" style={{ marginRight: '0.5rem' }} />
                                    <Text fontSize="1vw" m="1vw" style={{width: '6rem'}}>Available: {product.available}</Text>
                                </Box>
                                <Box className="sold-box" style={{background: '#ECC94B',borderRadius: '1rem',padding: '1rem 8rem',display:"flex", alignItems:"center", marginLeft:'1rem'} } >
                                    <FaShoppingCart size={20} color="red" style={{ marginRight: '0.5rem' }} />
                                    <Text fontSize="1vw" m="1vw" style={{width: '6rem'}}>Sold: {product.sold}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Card>
            )}
            <Box m="2rem">
                <Heading fontSize="1.5vw">Orders:</Heading>
                {orders.length === 0 ? (
                    <Text>No orders placed</Text>
                ) : (
                    <Flex flexWrap="wrap">
                        {orders.map((order, index) => (
                            <Card key={order._id} m="1rem" width={['100%', '45%', '30%', '22%']} p="1rem" boxShadow="md" borderRadius="md"  bg="#A0AEC0">
                                <Text fontSize="1vw">Order ID: {order._id}</Text>
                                <Text fontSize="1vw">Date: {order.dateCreated}</Text>
                                <Text fontSize="1vw">Username: {order.userId}</Text>
                                <Text fontSize="1vw">Quantity: {order.products.find(prod => prod.title === title)?.quantity}</Text>
                                <Text fontSize="1vw">Price: {order.products.find(prod => prod.title === title)?.price}</Text>
                            </Card>
                        ))}
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export default SellerSingle;
