import { PostStore } from '../../../db/in-memory.db.js';
import { PostListOutput } from '../dto/post.output.js';

export const mapToPostListOutput = (posts: PostStore): PostListOutput => {
    return Object.entries(posts).map(([id, post]) => ({
        id: Number(id),
        ...post,
    }));
};
