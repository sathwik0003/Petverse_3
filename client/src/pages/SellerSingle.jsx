import { useState, useEffect } from 'react';
import { Card, Box, Text, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import Navbar from './NavBar';
import { useParams } from 'react-router-dom';

const SellerSingle = () => {
    const { title } = useParams();
    const [product, setProduct] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3002/products/${title}`);

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
                <Card m="2rem" display="flex" flexDirection="row" flexWrap="wrap" border="0" maxWidth="100rem" height="40rem">
                    <Box border="0.1px solid black"></Box>
                    <Box m="2rem" width="40vw" border="0">
                        <Heading fontSize="2vw" mt="3vw" textAlign="center">{title}</Heading>
                        <Heading fontSize="3vw" mt="1vw" textAlign="center">Rs.{product.price}</Heading>
                        <Box mt="0.5vw" border="0">
                            <Text fontSize="1vw" m="1vw">{product.description}</Text>
                            <Flex justifyContent="space-between" mt="1vw">
                                <Box>
                                    <Text fontSize="1vw" m="1vw">Available: 10</Text>
                                    <Text fontSize="1vw" m="1vw">Sold: 0</Text>
                                </Box>
                                <Box>
                                    <Heading fontSize="1.5vw">Orders:</Heading>
                                    <List>
                                        {orders.map(order => (
                                            <ListItem key={order._id} fontSize="1vw" mb="1vw">
                                                <Text>Order ID: {order._id}</Text>
                                                <Text>Quantity: {order.products.find(prod => prod.title === title)?.quantity}</Text>
                                                <Text>Price: {order.products.find(prod => prod.title === title)?.price}</Text>
                                                <Text>User Name: {order.userId}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Card>
            )}
        </Box>
    );
};

export default SellerSingle;
