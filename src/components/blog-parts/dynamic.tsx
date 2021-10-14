import dynamic from 'next/dynamic';
import ExtLink from './ext-link';
import Code from './code';

export default {
  ol: 'ol',
  ul: 'ul',
  li: 'li',
  p: 'p',
  blockquote: 'blockquote',
  a: ExtLink,
  // Code: dynamic(() => import('./code')),
  Code: Code,
  Equation: dynamic(() => import('./equation')),
};
