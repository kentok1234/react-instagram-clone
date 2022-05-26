// TODO: answer here
import Navbar from './components/Navbar'
import { Box, Container, Icon, IconButton, Modal, useDisclosure } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import "./App.css"
import UploadForm from './components/UploadForm'
import {BsPlusSquare} from "react-icons/bs";
import axios from 'axios'
import Swal from 'sweetalert2'


function App() {
  // TODO: answer here
  const {isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd} = useDisclosure()

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
    <div aria-label="App" className='App'>
        <Container maxW={'container.lg'} p={'2'} flexGrow='1' overflow={'hidden'} display='flex' flexDirection={'column'} justifyContent='center'>
          <h1 aria-label="App Title" hidden>Welcome to instagram clone</h1>
          <UploadForm onClose={onCloseAdd} onSubmit={submitPost}/>
          {/* <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
          </Modal> */}
          <Box>
              <IconButton icon={<Icon as={BsPlusSquare} boxSize='24px'/>} variant='ghost' onClick={onOpenAdd}/>
          </Box>
          <Outlet />
        </Container>
    </div>
  )
}

export default App
