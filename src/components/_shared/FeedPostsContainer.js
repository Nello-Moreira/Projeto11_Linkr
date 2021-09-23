import styled from "styled-components";
import CircleLoader from "../loaders/CircleLoader";
import InfiniteScroll from "react-infinite-scroller";
import Post from "../Post/Post";
import WarningParagraph from "./WarningParagraph";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useEffect, useContext, useState } from "react";

export default function FeedPostsContainer({ APIfunction, settings }) {
    const { loggedUser } = useContext(UserContext);
    const { token } = loggedUser;
    const { pagePosts, setPagePosts } = useContext(PagePostsContext);
    const [loading, setLoading] = useState(true);
    const [lastPostId, setLastPostId] = useState(null);
    const [hasMore, setHasMore] = useState(true);

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
                alert(
                    "Houve uma falha ao obter os posts, por favor atualize a página"
                );
                setLoading(false);
                console.log(error);
            });
    }

    useEffect(() => {
        setLoading(true);
        updateFeed(settings);
    }, [APIfunction]);

    return loading ? (
        <FeedLoader />
    ) : pagePosts.length === 0 ? (
        <WarningParagraph>Nenhuma publicação encontrada</WarningParagraph>
    ) : (
        <InfiniteTimeline
            pageStart={0}
            loadMore={() => updateFeed(settings)}
            hasMore={hasMore}
            loader={<FeedLoader />}
        >
            {pagePosts.map((post) => (
                <Post postData={post} key={post.id} />
            ))}
        </InfiniteTimeline>
    );
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
