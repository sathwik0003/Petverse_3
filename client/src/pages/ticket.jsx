import { Box, Link as ChakraLink, Image, Heading, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { userid } = useParams();

  return (
    <Box backgroundImage="url('assets/back2.jpg')" minHeight="100vh" padding="4">
      <VStack spacing="4" align="center">
        <Heading fontSize="7vw">Saloon Pass</Heading>
        <Box
          width="100%"
          textAlign="center"
          border="2px solid"
          borderColor="black"
          borderRadius="20px"
          paddingX="6"
          paddingY="4"
          backgroundColor="white"
        >
          <Image src="static/images/cs1.jpeg" alt="" borderRadius="10px" />
          <VStack spacing="4" align="start" paddingX="2">
            <Heading as="h2" fontSize="xl">
              Name: Nishitha
            </Heading>
            <Heading as="h2" fontSize="xl">
              TimeSlot: 10am-11am
            </Heading>
            <Heading as="h2" fontSize="xl">
              Services: Spa Bath
            </Heading>
            <Heading as="h2" fontSize="xl">
              Center: Lucky Shamrock Salon
            </Heading>
          </VStack>
        </Box>
        <ChakraLink as={ChakraLink} href={`/user/main/${userid}`} fontSize="lg">
          Return to homepage
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default Ticket;
