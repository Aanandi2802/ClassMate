// Author: Harshil Shah
import React from 'react';
import { Heading, Button, Card, CardBody, Divider, Stack, Image, Center } from '@chakra-ui/react';

interface ContactCardProps {
  imgLocation: string;
  name: string;
  profileUrl: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ imgLocation, name, profileUrl }) => {
  const handleButtonClick = () => {
    window.open(profileUrl, '_blank');
  };

  return (
    <Card maxW='sm'>
      <CardBody>
        <Center>
          <Image src={imgLocation} alt='Profile Image' borderRadius='lg' />
        </Center>
        <Center>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
          </Stack>
        </Center>
      </CardBody>
      <Divider />
      <Button margin='1em'
        onClick={handleButtonClick} variant='solid' colorScheme='blue'>
        Visit Profile
      </Button>
    </Card>
  );
};

export default ContactCard;
