import styled from "styled-components";
import CircleLoader from "../loaders/CircleLoader";
import InfiniteScroll from "react-infinite-scroller";
import Post from "../Post/Post";
import WarningParagraph from "./WarningParagraph";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "use-interval";
import routes from "../../routes/routes";

function getNewPosts({ APIfunction, settings, pagePosts }) {
    return APIfunction(settings)
        .then((response) => {
            const posts = response.data.posts;

            if (posts.length === 0 || pagePosts.length === 0) return posts;

            const index = indexOfLastPost(posts, pagePosts[0]);

            if (index > -1) {
                return posts.slice(0, index);
            }
            return [
                ...posts,
                APIfunction({
                    ...settings,
                    lastPostId: posts[index].id,
                }),
            ];
        })
        .catch((error) => error);
}

function forcedPageUpdate({ APIfunction, settings, pagePosts, setPagePosts }) {
    getNewPosts({ APIfunction, settings, pagePosts })
        .then((response) => {
            setPagePosts([...response, ...pagePosts]);
        })
        .catch((error) => null);
}

function FeedPostsContainer({ APIfunction, settings }) {
    const { loggedUser } = useContext(UserContext);
    const { token } = loggedUser;
    const { pagePosts, setPagePosts } = useContext(PagePostsContext);
    const [loading, setLoading] = useState(true);
    const [lastPostId, setLastPostId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const history = useHistory();
    const intervalInSeconds = 10;

    function updateFeed(settings) {
        settings = { token, lastPostId, ...settings } || { token, lastPostId };

        APIfunction(settings)
            .then((response) => {
                const posts = response.data.posts;

                if (posts.length < 10) {
                    setHasMore(false);
                }

                if (!lastPostId) {
                    setPagePosts(posts);
                } else {
                    setPagePosts([...pagePosts, ...posts]);
                }

                if (posts.length > 0) {
                    setLastPostId(posts[posts.length - 1].id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    useEffect(() => {
        updateFeed(settings);
    }, [APIfunction]);

    useInterval(() => {
        settings = { token, ...settings };

        forcedPageUpdate({ APIfunction, settings, pagePosts, setPagePosts });
    }, intervalInSeconds * 1000);

    return loading ? (
        <FeedLoader />
    ) : pagePosts.length === 0 ? (
        <WarningParagraph>Nenhuma publicação encontrada</WarningParagraph>
    ) : (
        <InfiniteTimeline
            pageStart={0}
            loadMore={() => updateFeed(settings)}
            hasMore={
                history.location.pathname === routes.likes ? false : hasMore
            }
            loader={<FeedLoader />}
        >
            {pagePosts.map((post) => (
                <Post
                    postData={post}
                    forcedPageUpdate={() => {
                        forcedPageUpdate({
                            APIfunction,
                            pagePosts,
                            setPagePosts,
                            settings: { ...settings, token: token },
                        });
                    }}
                    key={JSON.stringify(post)}
                />
            ))}
        </InfiniteTimeline>
    );
}

function indexOfLastPost(postsList, postToCompare) {
    let index = -1;

    postsList.forEach((post, i) => {
        if (index > -1) return;

        if (
            post.id === postToCompare.id &&
            post.repostId === postToCompare.repostId
        ) {
            index = i;
        }
    });

    return index;
}

function FeedLoader() {
    return (
        <LoaderContainer>
            <CircleLoader customStyle={{ color: "rgba(109, 109, 109, 1)" }} />
            <p>Carregando mais posts...</p>
        </LoaderContainer>
    );
}

const InfiniteTimeline = styled(InfiniteScroll)`
    width: 100%;
`;

const LoaderContainer = styled.div`
    font-family: "Lato", sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: rgba(109, 109, 109, 1);
    height: 30vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export { FeedPostsContainer, forcedPageUpdate };
