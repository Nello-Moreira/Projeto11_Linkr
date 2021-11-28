import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import HashtagBox from "../HashtagBox/HashtagBox";
import { getTrendingPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FeedPostsContainer } from "../_shared/FeedPostsContainer";

export default function TrendingPage({ setPreviousPage }) {
    const { HASHTAG } = useParams();
    const { loggedUser } = useContext(UserContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPreviousPage(true);
        if (!loggedUser.token) return history.push(routes.login);

        setLoading(false);
    }, [loggedUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [HASHTAG]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />

                    <ContentContainer>
                        <PageTitleContainer>
                            <h1>{`# ${HASHTAG}`}</h1>
                        </PageTitleContainer>

                        <FeedPostsContainer
                            APIfunction={getTrendingPosts}
                            settings={{ topic: HASHTAG }}
                            key={HASHTAG}
                        />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}
