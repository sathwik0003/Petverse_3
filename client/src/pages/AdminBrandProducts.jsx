// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { Grid, Box, Image, Text, Button } from '@chakra-ui/react';
import { FaBoxOpen, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const AdminBrandProducts = () => {
  const [products, setProducts] = useState([]);
  const { brandname } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [brandname]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/fetchproducts/${brandname}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = (productId) => {
    // Implement your logic to delete the product with the given productId
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <Box p="4">
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {products.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)' }}
            display="flex"
            flexDirection="column"
            width="100%" // Adjust the width as needed
          >
            <Image src={product.image} alt={product.name} height="200px" objectFit="cover" />

            <Box p="4" flex="1">
              <Text fontSize="xl" fontWeight="semibold" mb="2">
                {product.name}
              </Text>
              <Text fontSize="sm" color="gray.500" mb="2">
                {product.description}
              </Text>
              <Text fontSize="md" mb="2">
                <strong>Availability:</strong> {product.total}
              </Text>
              <Text fontSize="md" mb="2">
                <strong>Quantity:</strong> {product.available}
              </Text>
              <Text fontSize="md" mb="2">
                <strong>Sold:</strong> {product.total-product.available}
              </Text>
              <Text fontSize="lg" mb="2">
                <strong>Price:</strong> ${product.price}
              </Text>
              <Text fontSize="md">
                <strong>Category:</strong> {product.product_category}
              </Text>

              {/* Delete Button */}
              <Button
                mt="4"
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminBrandProducts;
