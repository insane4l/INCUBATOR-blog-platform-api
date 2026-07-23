import { BlogAttributes } from '../features/blogs/dto/blog-attributes.js';
import { PostAttributes } from '../features/posts/dto/post-attributes.js';

export type BlogStore = Record<number, BlogAttributes>;
export type PostStore = Record<number, PostAttributes>;

export const db = {
    blogs: {
        123: {
            name: 'Blog 1 name',
            description: 'Blog 1 descr',
            websiteUrl: 'https://www.google.com',
        },
        6: {
            name: 'Blog 2 name',
            description: 'Blog 2 descr',
            websiteUrl: 'https://www.youtube.com',
        },
    } as BlogStore,
    posts: {
        1: {
            title: 'Post 1 title',
            shortDescription: 'Post 1 description',
            content: 'p_o_s_t 1 content',
            blogId: 123,
            blogName: 'Blog 1 name',
        },
        2: {
            title: 'Post 2 Title',
            shortDescription: 'Post 2 Description',
            content: 'p_o_s_t 2 Content',
            blogId: 6,
            blogName: 'Blog 2 name',
        },
    } as PostStore,
};
