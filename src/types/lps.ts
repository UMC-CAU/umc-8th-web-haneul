import { CommonResponse } from './common.ts';

export type ResponseGetLpsDto = CommonResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: {
      id: number;
      name: string;
    }[];
    likes: {
      id: number;
      userId: number;
      lpId: number;
    }[];
  }[];
  nextCursor: number;
  hasNext: boolean;
}>;

export type ResponsePostLpsDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;
