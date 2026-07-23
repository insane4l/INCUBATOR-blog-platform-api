import { WithId } from '../../../core/types/utility.types.js';
import { PostAttributes } from './post-attributes.js';

export type PostOutput = WithId<PostAttributes>;
export type PostListOutput = WithId<PostAttributes>[];
