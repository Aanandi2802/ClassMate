// Author: Harshil Shah
// Author: Viral Siddhapura
// Author: Aanandi Pankhania

import React from 'react';
import { Grid, Flex, Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, useBreakpointValue } from '@chakra-ui/react';
import { useState, ChangeEvent, ChangeEventHandler } from 'react';

import ContactCard from './indContactCard';
import ModalComponent from './successMailSentModal';
import harsilImg from '../../assests/images/harshil.png';
import viralImg from '../../assests/images/viral.png';
import rajImg from '../../assests/images/raj.png';
import aanandiImg from '../../assests/images/aanandi.png';
import yatrikImg from '../../assests/images/yatrik.png';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const breakpointValue = useBreakpointValue({ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError('');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
    setMessageError('');
  };

  const validateForm = () => {
    let isValid = true;
  
    if (name.trim() === '') {
      setNameError('Please enter your name');
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(name)) {
      setNameError('Name can only contain letters');
      isValid = false;
    }
  
    if (email.trim() === '') {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
  
    if (message.trim() === '') {
      setMessageError('Please enter your message');
      isValid = false;
    }
  
    return isValid;
  };  

  const handleSendMessage = () => {
    if (validateForm()) {
      handleOpen(); // Show success modal or perform API request

      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <>
      <Box p={4}>
        <Flex justifyContent="center">
          <Grid
            templateColumns={breakpointValue}
            gap={30}
            justifyContent="center"
            mb={2}
          >
            <ContactCard
              imgLocation={harsilImg}
              name='Harshil Shah'
              profileUrl='https://harshilshah.tech/#/'
            />
            <ContactCard
              imgLocation={rajImg}
              name='Raj Soni'
              profileUrl='https://www.linkedin.com/in/soni-raj/'
            />
            <ContactCard
              imgLocation={viralImg}
              name='Viral Siddhapura'
              profileUrl='https://www.linkedin.com/in/viral-siddhapura-a5042714a'
            />
            <ContactCard
              imgLocation={aanandiImg}
              name='Aanandi Pankhania'
              profileUrl='https://www.linkedin.com/in/aanandi2802/'
            />
            <ContactCard
              imgLocation={yatrikImg}
              name='Yatrik Amrutiya'
              profileUrl='https://www.linkedin.com/in/yatrik-amrutiya-1a3816193/'
            />
          </Grid>
        </Flex>
      </Box>

      <Box maxW="500px" mx="auto" mt={8} p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Contact Us
        </Heading>
        <Text mb={4}>
          We would love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </Text>
        <FormControl id="name" mb={4}>
          <FormLabel>Your Name</FormLabel>
          <Input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
          {nameError && <Text color="red">{nameError}</Text>}
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange} />
          {emailError && <Text color="red">{emailError}</Text>}
        </FormControl>
        <FormControl id="message" mb={4}>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Enter your message" value={message} onChange={handleMessageChange} />
          {messageError && <Text color="red">{messageError}</Text>}
        </FormControl>
        <Button colorScheme="blue" size="lg" onClick={handleSendMessage} >
          Send Message
        </Button>
      </Box>
      <ModalComponent isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default Contact;
