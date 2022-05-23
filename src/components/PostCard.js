// TODO: answer here
import { Box, Flex, Avatar, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function PostCard({ image, caption, username, avatar, userId, date }) {
  // TODO: answer here
  return (
    <Box >
      <Box p={3}>
          <Link to={`profile/${userId}`} style={{display: 'inline-block'}}>
            <Flex gap={2} alignItems='center'>
              <Avatar src={avatar} boxSize='32px' border={'1px'} borderColor='gray.100' objectFit={'contain'}/>
              <Text fontSize={'14px'} fontWeight={'bold'} color='gray.800'>{username}</Text>
            </Flex>
          </Link>
      </Box>
      <Box maxH='767px' borderBottom='1px' borderTop='1px' borderColor={'gray.100'}>
        <Image src={image} margin='auto'/>
      </Box>
      <Box p={3}>
        <Text as={'p'} fontWeight={'bold'}>{username} <Text as='span' fontWeight={'normal'}>{caption}</Text></Text>
        <Text>{date}</Text>
      </Box>
    </Box>
  )
}
