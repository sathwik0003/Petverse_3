import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { FaExclamationCircle, FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTruck, FaBoxOpen, FaShoppingBag } from 'react-icons/fa';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';

const TableofBrands = () => {
    const [brands, setBrands] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [isEmailMatch, setIsEmailMatch] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await fetch(`https://petverse-3.onrender.com/fetchbrands`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleDelete = (brand) => {
        setSelectedBrand(brand);
        onOpen();
    };

    const deleteBrand = async (brandname) => {
        try {
            const response = await fetch(`https://petverse-3.onrender.com/delete/brands/${brandname}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Brand deleted successfully');
                fetchBrands();
                setDeleteSuccess(true);
                setTimeout(() => {
                    setDeleteSuccess(false);
                    onClose();
                }, 2000);
            } else {
                console.error('Failed to delete brand');
            }
        } catch (error) {
            console.error('Error during brand deletion:', error);
        }
    };

    const handleConfirmation = () => {
        if (confirmationEmail === selectedBrand.email) {
            deleteBrand(selectedBrand.brandname);
        } else {
            console.error('Email does not match brand email');
        }
    };

    const handleEmailChange = (e) => {
        setConfirmationEmail(e.target.value);
        setIsEmailMatch(e.target.value === selectedBrand.email);
    };

    return (
        <div>
            <SidebarAdmin />
            <ChakraProvider>
                <TableContainer overflowX="auto" marginLeft="20vw">
                    <Table variant="striped" colorScheme="blue" size="sm">
                        <TableCaption>Brand Information</TableCaption>
                        <Thead>
                            <Tr>
                                <Th fontSize="1vw">S. No</Th>
                                <Th fontSize="1vw">Brandname</Th>
                                <Th fontSize="1vw">Email</Th>
                                <Th fontSize="1vw">Phone</Th>
                                <Th fontSize="1vw">Address</Th>
                                <Th fontSize="1vw">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {brands.map((brand, index) => (
                                <Tr key={brand._id}>
                                    <Td fontSize="1vw">{index + 1}</Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaBoxOpen} mr="2" />
                                        {brand.brandname}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaEnvelope} mr="2" />
                                        {brand.email}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Icon as={FaPhone} mr="2" />
                                        {brand.phoneNumber}
                                    </Td>
                                    <Td fontSize="1vw">
                                        <Button colorScheme="blue" size="sm" leftIcon={<FaShoppingBag />}>
                                            <Link to={`/brands/${brand.brandcode}/products`}>
                                                Products
                                            </Link>
                                        </Button>
                                    </Td>

                                    <Td fontSize="1vw">
                                        <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            leftIcon={<FaTrash />}
                                            onClick={() => handleDelete(brand)}
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
                                    Brand deleted successfully.
                                </Alert>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </TableContainer>
            </ChakraProvider>
        </div>
    );
};

export default TableofBrands;
