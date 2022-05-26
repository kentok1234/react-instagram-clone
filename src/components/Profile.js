// TODO: answer here
import React, { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PostCard from "./PostCard"
import LikeDislikeButton from "./LikeDislikeButton"
import { Box, Divider, Flex, Grid, GridItem, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/react"
import moment from "moment"

export const PostListProfileContext = createContext([])

export default function Profile() {
  // TODO: answer here
  const { UserId } = useParams()
  const [postList, setPostList] = useState([])
  const [name, setName] = useState({id:'', name:'', image:''})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [getPost, setPost] = useState({
    author: {
      image: '',
      name: '',
      id: '',
    }
  })

  
  useEffect(() => {
    loadPost()
    
  },[UserId])

  const loadPost = async () => {
    try {
      const userPost = await axios.get(`/profile/${UserId}`)
      console.log(userPost)
      setPostList(userPost.data.data.posts)
      setName(userPost.data.data.profile)
    } catch (error){
      console.log(error)
    }
  }

  const DetailPost = async (post) => {
    try {
      const response = await axios.get(`/post/${post.id}/detail`)
      const {data} = response
      let updatePost = {}
      if (data.message === 'success') {
          updatePost = {
            ...data.data,
            id: post.id
          }
      }
      console.log('updatePost: ', updatePost)
      setPost(updatePost)
      onOpen()
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <Box> 
      <Flex gap={3}>
        <Flex flexBasis={'300px'} justifyContent='center'>
          <Image 
            src={name.image} 
            alt='Photo profile'  
            borderRadius='full'
            boxSize='150px'/>
        </Flex>
        <Box flexGrow={1}>
          <Text as={'h1'} fontSize='2xl'>{name.name}</Text>
        </Box>
      </Flex>
      <Divider mt={5} mb={5}/>
      <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={3}>
        {postList.map(post => (
          <GridItem key={post.id}>
          <Box position={"relative"} onClick={() => DetailPost(post)} transition={'.2s'} _hover={{transform: 'scale(1.1)', zIndex: 5, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', cursor: 'pointer'}}>
              <Image src={post.image} alt='Content image' />
              <Flex 
                _hover={{opacity: 1}}
                // _groupHover={{transform: 'scale(0.5)'}}
                opacity={0}
                transition={'.2s'}
                backgroundColor='rgba(0, 0, 0, 0.5)'
                position={"absolute"} 
                height={'100%'} 
                width={'100%'} 
                top={0} 
                left={0} 
                right={0} 
                align='center'>
                <Flex gap={2} flexGrow={1} justifyContent='center'>
                  <Icon as={BsHandThumbsUpFill} boxSize={'24px'} color='blue.400' />
                  <Text color={'white'} fontWeight={"bold"}>{post.likeCount}</Text>
                </Flex>
                <Flex gap={2} flexGrow={1} justifyContent='center'>
                  <Icon as={BsHandThumbsDownFill} boxSize={'24px'} color='red.400' />
                  <Text color={'white'} fontWeight={"bold"}>{post.dislikeCount}</Text>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
      <PostListProfileContext.Provider value={{postList, setPostList}}>
        <Modal size={"xl"} blockScrollOnMount={false} isOpen={isOpen && getPost !== {}} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{getPost.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Flex flexDirection={"column"}>
                <Flex direction={"column"} paddingStart={2}>
                  <Box as={Flex} alignItems="center" gap={3}>
                    <Avatar name={getPost.author.name} src={getPost.author.image}/>
                    <Text fontWeight={"bold"}>{getPost.author.name}</Text>
                  </Box>
                </Flex>
                <Image marginY={2} src={getPost.image} alt="Post iamge" />

              </Flex> */}
              <PostCard 
                avatar={getPost.author.image} 
                caption={getPost.content}
                date={moment(getPost.createdAt).fromNow()}
                image={getPost.image}
                userId={getPost.author.id}
                username={getPost.author.name}
              />
              <LikeDislikeButton 
                id={getPost.id}
                dislikeCount={getPost.dislikeCount}
                isDisliked={getPost.isDisliked}
                likeCount={getPost.likeCount}
                isLiked={getPost.isLiked}
                />
            </ModalBody>
          </ModalContent>
        </Modal>
      </PostListProfileContext.Provider>
    </Box>
  )
}
