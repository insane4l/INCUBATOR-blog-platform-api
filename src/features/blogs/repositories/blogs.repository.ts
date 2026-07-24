import { BlogType } from '../blog.types.js';
import { db } from '../../../db/in-memory.db.js';
import { mapToBlogListOutput } from '../mappers/map-list-blog-to-output.js';
import { mapToBlogOutput } from '../mappers/map-blog-to-output.js';
import { BlogAttributes } from '../dto/blog-attributes.js';

export const blogsRepository = {
    findAll(): BlogType[] {
        return mapToBlogListOutput(db.blogs);
    },

    findById(blogId: number): BlogType | null {
        if (db.blogs[blogId]) {
            return mapToBlogOutput(blogId, db.blogs[blogId]);
        } else {
            return null;
        }
    },

    create(newBlog: BlogAttributes): BlogType {
        const blogId = Date.now() + Math.floor(Math.random() * 1000);
        const blog = { id: blogId, ...newBlog };
        db.blogs[blogId] = blog;

        return blog;
    },

    update(blogId: number, blogData: BlogAttributes): boolean {
        const selectedBlog = db.blogs[blogId];

        if (!selectedBlog) {
            return false;
        }

        db.blogs[blogId] = blogData;
        return true;
    },

    delete(blogId: number): boolean {
        const selectedBlog = db.blogs[blogId];

        if (!selectedBlog) {
            return false;
        }

        delete db.blogs[blogId];
        return true;
    },
};
