import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import gfm from 'remark-gfm';
import html from 'remark-html';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    document: {
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
      '& a:hover': {
        textDecoration: 'underline',
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
      children={props.markdown}
    />
  );
};
