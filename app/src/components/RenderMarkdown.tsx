import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cb as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Table as MuiTable } from '@material-ui/core';
import gfm from 'remark-gfm';
import html from 'remark-html';

//@ts-ignore
import ReactMarkdown from 'react-markdown/with-html';

const CodeBlock = (props: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter language={props.language} style={style}>
      {props.value}
    </SyntaxHighlighter>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    document: {
      marginBottom: '15px',
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
      '& a:hover': {
        textDecoration: 'underline',
      },
      '& p code': {
        borderRadius: `${theme.shape.borderRadius}px`,
        border: `1px solid ${theme.palette.background.paper} !important`,
        padding: '2px',
        paddingLeft: '5px',
        paddingRight: '5px',
      },
      '& pre': {
        backgroundColor: '#0d1117 !important',
        borderRadius: `${theme.shape.borderRadius}px !important`,
        border: `1px solid ${theme.palette.background.paper} !important`,
        '& code': {
          backgroundColor: '#0d1117 !important',
        },
      },
    },
  })
);

interface Props {
  markdown: string;
}

export const RenderMarkdown = (props: Props) => {
  const classes = useStyles();

  return (
    <ReactMarkdown
      className={classes.document}
      linkTarget="_blank"
      transformImageUri={(uri) => {
        console.log('Image', uri);
        return uri;
      }}
      transformLinkUri={(uri) => {
        console.log('Link', uri);
        return uri;
      }}
      plugins={[gfm, html]}
      renderers={{
        code: CodeBlock,
      }}
      children={props.markdown}
    />
  );
};
