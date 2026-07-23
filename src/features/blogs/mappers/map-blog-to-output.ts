import { BlogAttributes } from '../dto/blog-attributes.js';
import { BlogOutput } from '../dto/blog.output.js';

export const mapToBlogOutput = (id: number, blogAttributes: BlogAttributes): BlogOutput => ({
    id,
    ...blogAttributes,
});
