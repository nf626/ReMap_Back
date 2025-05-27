// routes
import { deletePost, getPostId, getPosts, newPost, updatePost } from '../controllers/postController.js'
import { Router } from 'express';
const router = Router();

/* ------ GET ------- */
router.get('/', getPosts)

// Dynamic routing
router.get('/:id', getPostId)


/* ------ Post ------- */
// create new post
router.post('/', newPost)

/* ------ Update ------- */
// Update post
router.put('/:id', updatePost)

/* ------ Delete ------- */
// Delete Post
router.delete('/:id', deletePost)

export default router;
