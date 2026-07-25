import { PostAttributes } from '../dto/post-attributes.js';
import { PostOutput } from '../dto/post.output.js';
import { db } from '../../../db/in-memory.db.js';

export const mapToPostOutput = (id: string, postAttributes: PostAttributes): PostOutput => ({
    id,
    blogName: db.blogs[postAttributes.blogId].name,
    ...postAttributes,
});
