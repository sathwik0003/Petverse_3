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
    Tfoot,
    Button,
    Icon,
} from '@chakra-ui/react';
import { FaExclamationCircle, FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';


const TableofUsers = () => {
    const users = [
        { id: 1, username: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
        { id: 2, username: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak St' },
        { id: 3, username: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak St' },
    ];

    return (
        <div>
            <SidebarAdmin />
            <ChakraProvider >
                <TableContainer overflowX="auto" marginLeft ="20vw">
                    <Table variant="striped" colorScheme="blue" size="sm">
                        <TableCaption>User Information</TableCaption>
                        <Thead>
                            <Tr >
                                <Th fontSize="1vw">S. No</Th>
                                <Th fontSize="1vw">Username</Th>
                                <Th fontSize="1vw">Email</Th>
                                <Th fontSize="1vw">Phone</Th>
                                <Th fontSize="1vw">Address</Th>
                                <Th fontSize="1vw">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, index) => (
                                <Tr key={user.id} >
                                    <Td fontSize="1vw">{index + 1}</Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaUser} mr="2" />
                                        {user.username}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaEnvelope} mr="2" />
                                        {user.email}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaPhone} mr="2" />
                                        {user.phone}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaMapMarkerAlt} mr="2" />
                                        {user.address}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                                        <Button colorScheme="red" size="sm" leftIcon={<FaTrash />}>
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </ChakraProvider>
        </div>
    );
};

export default TableofUsers;
