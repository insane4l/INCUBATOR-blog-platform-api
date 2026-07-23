import { PostAttributes } from '../dto/post-attributes.js';
import { PostOutput } from '../dto/post.output.js';

export const mapToPostOutput = (id: number, postAttributes: PostAttributes): PostOutput => ({
    id,
    ...postAttributes,
});
