import { useEffect, useState } from "react"
import React from "react"
import {  getSession, auth } from "../api/auth"
import { useContext } from "react"
import { SessionContext } from "../context/SessionContext"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Icon,
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
  Modal,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import { Link } from "react-router-dom"
import {BsPlusSquare} from "react-icons/bs";
import UploadForm from "./UploadForm"
import axios from "axios"
import Swal from "sweetalert2"

export default function Navbar() {
  // TODO: answer here
  const {session, setSession} = useContext(SessionContext)
  const [user, setUser] = useState({})
  const { isOpen, onToggle } = useDisclosure()
  const {isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd} = useDisclosure()
  useEffect(() => {
    fetchUser()
  }, [])
  
  const fetchUser = async () => {
    try {
      const response = await getSession()
      const {data} = response
      if (data.user) {
        setSession(data.user)
        setUser(data.user)
      }
      // else window.location.assign('http://localhost:3000/login')
    }
    catch(error) {
      console.log(error)
    }
  }

  const submitPost = async (caption, image) => {
    try {
      const formData = new FormData()
      formData.append('content', caption)
      formData.append('image', image)
      const response = await axios.post('/post/create',formData)
      
      if (response.data.message === "success") {
        Swal.fire({
          title: 'Berhasil posting',
          icon: 'success'
        })
      }
    }
    catch(error) {
      Swal.fire({
        title: 'Gagal posting',
        text: 'Gagal membuat postingan',
        icon: 'error'
      })
    }
  }
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
            <Link to="/" style={{textDecoration: 'none'}} aria-label="App Title">
              <Flex gap={2}>
                <Image src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" aria-label="App Logo" />
                <Link to={'/'}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}
                  fontWeight='bold'
                  aria-label="App Title">
                    Clone
                </Link>
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
            <Box>
              <IconButton icon={<Icon as={BsPlusSquare} boxSize='24px'/>} variant='ghost' onClick={onOpenAdd}/>
            </Box>
            <Menu>
              <MenuButton>
                <Avatar src={user.image} size='sm'/>
                <Text fontWeight={"bold"} aria-label="Profile" hidden>{user.name}</Text>
              </MenuButton>
              {(Object.keys(user).length === 0) ? 
              (
                <MenuList>
                  <MenuItem aria-label="Login" onClick={auth}>Login</MenuItem>
                </MenuList>

              ) :
              (
                <MenuList>
                  <Link to={`/profile/${session.id}`}>
                    <MenuItem icon={<InfoOutlineIcon />}>Profile</MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={auth}>Logout</MenuItem>
                </MenuList>
              )
              }
            </Menu>
          </Stack>
        </Flex>
      </Container>
      <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <UploadForm onClose={onCloseAdd} onSubmit={submitPost}/>
      </Modal>
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
