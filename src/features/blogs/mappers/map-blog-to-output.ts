import { BlogAttributes } from '../dto/blog-attributes.js';
import { BlogOutput } from '../dto/blog.output.js';

export const mapToBlogOutput = (id: string, blogAttributes: BlogAttributes): BlogOutput => ({
    id,
    ...blogAttributes,
});
