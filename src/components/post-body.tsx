import React, { useEffect } from 'react';

interface Props {
  html: string;
}

const PostBody = ({ html }: Props) => {
  useEffect(() => {
    import('@okra-ui/string-to-dom');
  }, []);
  return (
    <>
      <string-to-html stringifiedHTML={html} />
    </>
  );
};

export default PostBody;
