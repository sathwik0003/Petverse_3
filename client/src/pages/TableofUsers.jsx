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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { FaExclamationCircle, FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import { Link } from 'react-router-dom';

const TableofUsers = () => {
    const [users, setUsers] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [isEmailMatch, setIsEmailMatch] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://petverse-3.onrender.com/fetchusers`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        onOpen();
    };

    const deleteUser = async (username) => {
        try {
            const response = await fetch(`https://petverse-3.onrender.com/delete/users/${username}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('User deleted successfully');
                fetchUsers();
                setDeleteSuccess(true);
                setTimeout(() => {
                    setDeleteSuccess(false);
                    onClose();
                }, 2000);
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error during user deletion:', error);
        }
    };

    const handleConfirmation = () => {
        if (confirmationEmail === selectedUser.email) {
            deleteUser(selectedUser.username);
        } else {
            console.error('Email does not match user email');
        }
    };

    const handleEmailChange = (e) => {
        setConfirmationEmail(e.target.value);
        setIsEmailMatch(e.target.value === selectedUser.email);
    };

    return (
        <div>
            <SidebarAdmin />
            <ChakraProvider>
                <TableContainer overflowX="auto" marginLeft="20vw">
                    <Table variant="striped" colorScheme="blue" size="sm">
                        <TableCaption>User Information</TableCaption>
                        <Thead>
                            <Tr>
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
                                <Tr key={user._id}>
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
                                        {user.phoneNumber}
                                    </Td>
                                    <Td fontSize="1vw">
                                    <Link to={`/admin/users/orders/${user.username}`}>
                                        <Button colorScheme="blue" size="sm" leftIcon={<FaTruck />}>
                                            Orders
                                        </Button>
                                        </Link>
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            leftIcon={<FaTrash />}
                                            onClick={() => handleDelete(user)}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {/* Delete Confirmation Modal */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Confirm Deletion</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Enter your email to confirm deletion:</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="Your email"
                                        value={confirmationEmail}
                                        onChange={handleEmailChange}
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="red"
                                    mr={3}
                                    onClick={handleConfirmation}
                                    isDisabled={!isEmailMatch}
                                >
                                    Confirm
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    {/* Delete Success Modal */}
                    <Modal isOpen={deleteSuccess} onClose={() => setDeleteSuccess(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Deletion Successful</ModalHeader>
                            <ModalBody>
                                <Alert status="success">
                                    <AlertIcon as={RiCheckboxCircleFill} color="green.500" />
                                    User deleted successfully.
                                </Alert>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </TableContainer>
            </ChakraProvider>
        </div>
    );
};

export default TableofUsers;
