import React from 'react';
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
  Tfoot
} from '@chakra-ui/react';

const TableofUsers = () => {
  const users = [
    { id: 1, username: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, username: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak St' },
    // Add more user data as needed
  ];

  return (
    <ChakraProvider>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>User Information</TableCaption>
          <Thead>
            <Tr>
              <Th>S. No</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.address}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>S. No</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Address</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
};

export default TableofUsers;
