import { WithId } from '../../../core/types/utility.types.js';
import { BlogAttributes } from './blog-attributes.js';

export type BlogOutput = WithId<BlogAttributes>;
export type BlogListOutput = WithId<BlogAttributes>[];
