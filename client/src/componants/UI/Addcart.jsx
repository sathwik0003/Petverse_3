import React from 'react'
import { Box, Image, Text, Flex, Button, Spacer, Input, Select } from '@chakra-ui/react';
import { FaShoppingBasket, FaRegHeart, FaStar } from 'react-icons/fa';


const Addcart = () => {
    return (
        <div>
            <Button leftIcon={<FaRegHeart />} colorScheme="red" variant="outline" size="sm" height="3vw" width="10vw" fontSize="1.5vw">
                Wishlist
            </Button>
        </div>
    )
}

export default Addcart