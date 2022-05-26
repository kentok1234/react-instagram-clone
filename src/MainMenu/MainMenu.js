import PostCard from '../components/PostCard'
import LikeDislikeButton from '../components/LikeDislikeButton'
import { useEffect, useContext } from 'react'
import { Box, Flex} from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import { PostContext } from '../context/PostContext'


// export const PostContext = createContext([])

function MainMenu() {
    const {postList, setPostList} = useContext(PostContext)
    console.log(postList)
    useEffect(() => {
        getPostList()
    }, [])
    const getPostList = async () => {
        try {
            const response = await axios.get('/post/list')
            const {data} = response
            setPostList(data.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    // console.log(postList)
    return (
        <>
            <Flex gap={5} flexDirection='column'>
                {postList.map(post => (
                <Box key={post.id} bgColor={'white'} maxW='614px' border={'1px'} borderColor='gray.200' borderRadius={'5px'} overflow='hidden'>
                    <PostCard 
                    image={post.image} 
                    caption={post.content} 
                    username={post.author.name}
                    avatar={post.author.image} 
                    userId={post.author.id}
                    date={moment(post.createdAt).fromNow()} />
                    <LikeDislikeButton 
                        id={post.id} 
                        likeCount={post.likeCount} 
                        dislikeCount={post.dislikeCount} 
                        isLiked={post.liked}
                        isDisliked={post.disliked} />
                </Box>
                ))}
            </Flex>
        </>
    )
}

export default MainMenu