import express from 'express'
import { getPosts, newPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', newPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/like/:id', likePost)

export default router