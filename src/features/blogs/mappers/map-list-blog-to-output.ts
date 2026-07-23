import { BlogListOutput } from '../dto/blog.output.js';
import { BlogStore } from '../../../db/in-memory.db.js';

export const mapToBlogListOutput = (blogs: BlogStore): BlogListOutput => {
    return Object.entries(blogs).map(([id, blog]) => ({
        id: Number(id),
        ...blog,
    }));
}
