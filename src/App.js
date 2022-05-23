// TODO: answer here
import Navbar from './components/Navbar'
import { Container } from '@chakra-ui/react'
import { SessionProvider } from './context/SessionContext'
import { Outlet } from 'react-router-dom'
import "./App.css"

function App() {
  // TODO: answer here

  return (
    <div aria-label="App" className='App'>
      <SessionProvider>
        <Navbar />
        <Container maxW={'container.lg'} p={'2'} flexGrow='1' overflow={'hidden'} display='flex' flexDirection={'column'} justifyContent='center'>
          <Outlet />
        </Container>
        
      </SessionProvider>
    </div>
  )
}

export default App
