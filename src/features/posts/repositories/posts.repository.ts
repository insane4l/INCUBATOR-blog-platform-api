import { PostType } from '../post.types.js';
import { mapToPostListOutput } from '../mappers/map-list-post-to-output.js';
import { db } from '../../../db/in-memory.db.js';
import { mapToPostOutput } from '../mappers/map-post-to-output.js';
import { PostAttributes } from '../dto/post-attributes.js';

export const postsRepository = {
    findAll(): PostType[] {
        return mapToPostListOutput(db.posts);
    },

    findById(postId: number): PostType | null {
        if (db.posts[postId]) {
            return mapToPostOutput(postId, db.posts[postId]);
        } else {
            return null;
        }
    },

    create(newPost: PostAttributes): PostType {
        const postId = Date.now() + Math.floor(Math.random() * 1000);
        const post = { id: postId, ...newPost };
        db.posts[postId] = post;

        return post;
    },

    update(postId: number, postData: PostAttributes): boolean {
        const selectedPost = db.posts[postId];

        if (!selectedPost) {
            return false;
        }

        db.posts[postId] = postData;
        return true;
    },

    delete(postId: number): boolean {
        const selectedPost = db.posts[postId];

        if (!selectedPost) {
            return false;
        }

        delete db.posts[postId];
        return true;
    },
};
