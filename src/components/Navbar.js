import { useEffect, useState } from "react"
import React from "react"

import { getSession } from "../api/auth"
import { useContext } from "react"
import { SessionContext } from "../context/SessionContext"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Divider,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';

export default function Navbar() {
  // TODO: answer here
  const { isOpen, onToggle } = useDisclosure()
  const [user, setUser] = useState({
    email: '',
    id: '',
    image: '',
    name: '',
  })

  // getSession().then(response => {
  //   const {data} = response
  //   const newUser = {
  //     ...data.user
  //   }
  //   setUser(newUser)
  // })

  console.log('hello')

  return (
    <Box 
      bg={useColorModeValue('white', 'gray.800')} 
      color={useColorModeValue('gray.600', 'white')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      aria-label="Navbar">
      <Container maxW='container.lg'>
        <Flex
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link href="/" style={{textDecoration: 'none'}}>
              <Flex gap={2}>
                <Image src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" aria-label="App Logo" />
                <Text
                  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}
                  fontWeight='bold'
                  aria-label="App Title">
                    Clone
                </Text>
              </Flex>
            </Link>

            {/* <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex> */}
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Menu>
              <MenuButton>
                <Avatar src={user.image} size='sm'/>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<InfoOutlineIcon />}>Profile</MenuItem>
                <Divider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Container>
    </Box>
    // <header className="navbar">
    //   <div className="container d-flex justify-content-between">
    //     <h1 aria-label="App Title" className="navbar-brand">Instagram Clone</h1>
    //     <nav>
    //       <div className="navbar__cta">
    //         <button className="btn btn-primary" onClick={auth}>Masuk</button>
    //       </div>
    //     </nav>
    //   </div>
    // </header>
  )
}
