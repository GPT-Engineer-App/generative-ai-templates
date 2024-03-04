import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, VStack, SimpleGrid, Image, useColorModeValue } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLoggingIn ? "/login" : "/signup";
    const url = `https://backengine-81pr.fly.dev${endpoint}`;
    const payload = { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: `Successfully ${isLoggingIn ? "logged in" : "signed up"}.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred during authentication.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const switchAuthMode = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  const AuthForm = () => (
    <VStack spacing={4} as="form" onSubmit={handleAuth}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button leftIcon={isLoggingIn ? <FaSignInAlt /> : <FaUserPlus />} type="submit" colorScheme="blue" w="full">
        {isLoggingIn ? "Login" : "Signup"}
      </Button>
      <Button variant="link" onClick={switchAuthMode}>
        {isLoggingIn ? "Need an account? Signup" : "Already have an account? Login"}
      </Button>
    </VStack>
  );

  const TemplateGrid = () => (
    <SimpleGrid columns={[1, null, 3]} spacing="40px">
      {/* Mock data for templates, this would be dynamically loaded */}
      {[1, 2, 3, 4].map((template) => (
        <Box key={template} bg={useColorModeValue("gray.100", "gray.700")} rounded="lg" p={5}>
          <Image src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0ZW1wbGF0ZSUyMCUyNCU3QnRlbXBsYXRlJTdEfGVufDB8fHx8MTcwOTUzNDQ1M3ww&ixlib=rb-4.0.3&q=80&w=1080`} alt={`Template ${template}`} />
          <Text mt={2}>Template {template}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );

  return (
    <Container py={{ base: "4", md: "8" }} maxW="lg">
      <Stack spacing={8}>
        <Heading textAlign="center">{isLoggingIn ? "Login" : "Signup"}</Heading>
        {!isLoggedIn ? <AuthForm /> : <TemplateGrid />}
      </Stack>
    </Container>
  );
};

export default Index;
