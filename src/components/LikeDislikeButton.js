// TODO: answer here
import { Flex, IconButton, Box, Text } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import { useContext } from "react";
import { BsHandThumbsUpFill, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsDownFill } from "react-icons/bs";
import { PostContext } from "../MainMenu/MainMenu";
import axios from "axios";
export default function LikeDislikeButton({id, isLiked, isDisliked, likeCount, dislikeCount}) {
    // TODO: answer here
    const {postList, setPostList} = useContext(PostContext)
    const setFillLike = async (id) => {
        console.log('like clicked')
        try {
        const newPostList = await Promise.all(postList.map(async post => {
            if (post.id === id) {
                post.liked = !post.liked
                if (post.liked) {
                    if (post.disliked) {
                        post.dislikeCount -= 1
                        post.disliked = false
                    }
                    post.likeCount += 1 
                } else {
                    post.likeCount -= 1
                }
                const response = await axios.get(`/post/${post.id}/${post.liked ? 'like' : 'unlike'}`)
                console.log(post)
                console.log(response)
            }
            return post
        }))
        setPostList(newPostList)
        }
        catch(error) {
        console.log(error)
        }
    }

    const setFillDislike = async (id) => {
        console.log('dislike clicked')
        try {
            const newPostList = await Promise.all(postList.map(async post => {
                if (post.id === id) {
                    post.disliked = !post.disliked
                    if (post.disliked) {
                        console.log('liked: ', post.liked)
                        if (post.liked) {
                            post.likeCount -= 1
                            post.liked = false
                            // console.log('count liked: ', post.likeCount)
                        }
                        post.dislikeCount += 1 
                    } else {
                        // post.likedCount += 1
                        post.dislikeCount -= 1
                    }
                    const response = await axios.get(`/post/${post.id}/${post.disliked ? 'dislike' : 'undislike'}`)
                    console.log(post)
                    console.log(response)
                }
                return post
            }))
            
            setPostList(newPostList)
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <Box p={3}>
            <Flex>
                <IconButton onClick={() => setFillLike(id)} icon={(isLiked && !isDisliked) ? <Icon as={BsHandThumbsUpFill} boxSize={'24px'} color='blue.400'/> : <Icon as={BsHandThumbsUp} boxSize={'24px'} />} variant='ghost'/>
                {/* <IconButton onClick={() => console.log('clicked like')} icon={(isLiked && !isDisliked) ? <Icon as={BsHandThumbsUpFill} boxSize={'24px'} color='blue.400'/> : <Icon as={BsHandThumbsUp} boxSize={'24px'} />} variant='ghost'/> */}
                <IconButton onClick={() => setFillDislike(id)} icon={(!isLiked && isDisliked) ? <Icon as={BsHandThumbsDownFill} boxSize={'24px'} color='red.400'/> : <Icon as={BsHandThumbsDown} boxSize={'24px'} />} variant='ghost'/>
            </Flex>
        
            <Box display={"flex"}>
                <Text fontWeight={'bold'} fontSize={'14px'}>{likeCount} likes</Text>
            </Box>
        </Box>
    )
}