/// <reference types="react-scripts" />

declare namespace JSX {
  interface IntrinsicElements {
    'mwc-button': {
      raised?: boolean;
      children?: React.ReactChild;
      onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
    'gradient-text': {
      text?: string;
    };
    'string-to-html': {
      stringifiedHTML?: string;
    };
  }
}
