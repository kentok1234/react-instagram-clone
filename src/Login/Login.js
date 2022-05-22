// TODO: answer here
import { Input, Container, Grid, GridItem, Button, Stack, Divider, Text, Link, Center } from "@chakra-ui/react"
import { useState, useEffect, React } from "react"
import { auth } from '../api/auth'
import "./Login.css"

function App() {
  // TODO: answer here
  const [getUsername, setUsername] = useState('')
  const [getPassword, setPassword] = useState('')

  const updateUsername = e => {
    setUsername(e.target.value)
  }

  const updatePassword = e => {
    setPassword(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log('Form submited')
  }

  const [isValid, setValid] = useState(false)

  useEffect(() => {
    setValid(Boolean(getUsername && getPassword))
  }, [getUsername, getPassword])
  return (
    <div className="Login">
        <Container className="Login__Form">
            <h1 className="Login__Title">Instagram Clone</h1>
            <form onSubmit={submitForm}>
                <Grid gap={3}>
                    <GridItem>
                        <Input placeholder="Username or email" onChange={updateUsername} value={getUsername}/>
                    </GridItem> 
                    <GridItem>
                        <Input placeholder="Password" type={"password"} onChange={updatePassword} value={getPassword}/>
                    </GridItem>
                    <GridItem>
                        <Button 
                            type="submit" 
                            size='md' 
                            colorScheme='messenger' 
                            isDisabled={!isValid}
                            display='block'
                            width='100%'>Log In</Button>
                    </GridItem>
                </Grid>
            </form>
            <Stack direction='column' h='100px' p={4}>
                <Divider orientation='horizontal' />
                <Text align='center' fontWeight='bold' color='gray'>OR</Text>
            </Stack>
            <Center>
                <Link href='https://rg-km.riegan.my.id/auth?redirect=http://localhost:3000/'>Log In With Github</Link>
            </Center>
        </Container>
    </div>
  )
}

export default App
