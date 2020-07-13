import React from 'react';
import PostsService from '../service/PostsService';
import { Link } from 'react-router-dom';
import { Typography, Container, CardMedia , Chip } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import Disqus from "disqus-react";

const useStyles = makeStyles(() => ({
  link: {
      textDecoration: 'none'
  }
}))
export default function Read({ match }) {
  const classes = useStyles()

  const slug = match.params.slug.replace('-', ' ')
  const post = PostsService.find(post => post.title == slug)

  const disqusShortname = "bahyusanciko-1" //found in your Disqus.com dashboard
  const disqusConfig = {
    url: window.location.origin + 'blog/' + slug, //this.props.pageUrl
    identifier: match.params.slug, //this.props.uniqueId
    title: slug //this.props.title
  }

  return (
  <Container component="main" maxWidth="sm">
  <Link to="/blog" className={classes.link}> 
  <Button 
        variant="contained"
        color="default"
        startIcon={<KeyboardBackspaceIcon />}
  >
        Kembali
  </Button>
  </Link>
  <Typography variant="h3" component="h1" gutterBottom>{post.title}</Typography>
  <Chip label={post.date}variant="outlined"  m={2} / >
  <CardMedia
         
          component="img"
          alt={post.imageTitle}
          image={post.image}
          title={post.imageTitle}
        />
  <Typography variant="body1">{post.description}</Typography>
  
  <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
  </Container>
  );

}