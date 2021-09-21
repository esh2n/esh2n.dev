import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Author, isAuthor, Post } from 'types';

const postsDirectory = join(process.cwd(), 'src/_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields = []): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      if (isAuthor(data[field])) {
        items[field] = data[field] as Author;
      } else {
        items[field] = data[field] as string;
      }
    }
  });

  return items as Post;
}

export function getAllPosts(fields = []): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1: Post, post2: Post) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
