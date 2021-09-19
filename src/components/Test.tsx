import React, { useEffect, useRef } from 'react';
import { Elm as e } from '@elm/Main.elm';

interface Props {}

const Test: React.FC<Props> = () => {
  const ref = useRef(null);
  useEffect(() => {
    e.Main.init({
      node: ref.current as HTMLElement,
      flags: null,
    });
  }, [ref]);
  return <div ref={ref} />;
};

export default Test;
