import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface Props {
  markdown: string;
}

export const RenderMarkdown = (props: Props) => {
  return <ReactMarkdown plugins={[gfm]} children={props.markdown} />;
};
