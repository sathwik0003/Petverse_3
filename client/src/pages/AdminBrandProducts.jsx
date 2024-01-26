// ProductsPage.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
const AdminBrandProducts = () => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    // Fetch products for the selected brand
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

  return (
    <ChakraProvider>
      <TableContainer overflowX="auto" marginLeft="20vw">
        <Table variant="striped" colorScheme="blue" size="sm">
          <TableCaption>Products Information</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="1vw">S. No</Th>
              <Th fontSize="1vw">Product Name</Th>
              {/* Add more table headers based on your product data */}
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={product._id}>
                <Td fontSize="1vw">{index + 1}</Td>
                <Td fontSize="1vw">
                  <Icon as={FaBoxOpen} mr="2" />
                  {product.productName}
                </Td>
                {/* Add more table cells based on your product data */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
};

export default AdminBrandProducts;
