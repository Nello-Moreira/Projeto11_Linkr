import CircleLoader from "../loaders/CircleLoader";
import Header from "../Header/Header";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import HashtagBox from "../HashtagBox/HashtagBox";
import { getLikedPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FeedPostsContainer } from "../_shared/FeedPostsContainer";

export default function MyLikes() {
    const { loggedUser } = useContext(UserContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loggedUser.token) return history.push(routes.login);

        setLoading(false);
    }, [loggedUser]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />

                    <ContentContainer>
                        <PageTitleContainer>
                            <h1>minhas curtidas</h1>
                        </PageTitleContainer>

                        <FeedPostsContainer APIfunction={getLikedPosts} />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}
