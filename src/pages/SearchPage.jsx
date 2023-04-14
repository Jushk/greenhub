import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import theme from "../theme";
import Post from "../components/Post";
import PostDetailsModal from "../components/PostDetailModal";

function SearchPage() {
  const { searchValue } = useParams();
  const [results, setResults] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const instance = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getResults = async () => {
      try {
        const response = await instance.get(`/search?query=${searchValue}`, {
          signal: controller.signal,
        });
        console.log(response);
        isMounted && setResults(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getResults();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, searchValue]);
  console.log(results);

  const users = [];
  const posts = [];

  results.forEach((result) => {
    if (result.type === "user") {
      users.push(result);
    } else if (result.type === "post") {
      posts.push(result);
    }
  });

  const handlePostClick = (_id) => {
    setSelectedPostId(_id);
  };
  console.log(posts);
  return (
    <>
      {results?.length ? (
        <List>
          <Container maxWidth="lg" sx={{ marginTop: theme.spacing(1) }}>
            {users.length > 0 && (
              <>
                <Typography variant="subtitle2">Users</Typography>
                {users.map((result) => (
                  <Fragment key={result._id}>
                    <Paper>
                      <ListItem
                        ListItemButton
                        key={result._id}
                        component={Link}
                        to={`/profile/${result.username}`}
                        sx={{ marginTop: theme.spacing(1) }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={result.name} src={result.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={result.name} />
                      </ListItem>
                    </Paper>
                  </Fragment>
                ))}
              </>
            )}
            {posts.length > 0 && (
              <>
                <Typography variant="subtitle2">Posts</Typography>
                {posts.map((result) => (
                  <Fragment key={result._id}>
                    <Post
                      id={result._id}
                      username={result.author.name}
                      title={result.title}
                      content={result.content}
                      createdAt={result.createdAt}
                      onClick={handlePostClick}
                    />
                    <PostDetailsModal
                      postId={selectedPostId}
                      onClose={() => setSelectedPostId(null)}
                    />
                  </Fragment>
                ))}
              </>
            )}
          </Container>
        </List>
      ) : (
        <Typography variant="subtitle1">No results</Typography>
      )}
    </>
  );
}

export default SearchPage;
