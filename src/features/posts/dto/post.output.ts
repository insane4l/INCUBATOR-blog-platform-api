import { WithId } from '../../../core/types/utility.types.js';
import { PostAttributes } from './post-attributes.js';

export type PostOutput = WithId<PostAttributes> & { blogName: string };
export type PostListOutput = WithId<PostAttributes>[];
