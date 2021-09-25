import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../HashtagBox/HashtagBox";
import WarningParagraph from "../_shared/WarningParagraph";
import { FeedPostsContainer, getNewPosts } from "../_shared/FeedPostsContainer";
import Search from "../Header/Search";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPosts, getFollows } from "../../API/requests";
import routes from "../../routes/routes";

export default function Timeline() {
    const { loggedUser } = useContext(UserContext);
    const { pagePosts, setPagePosts } = useContext(PagePostsContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [followingList, setFollowingList] = useState([]);

    function getFollowingList() {
        getFollows({ token: loggedUser.token })
            .then((response) => {
                setFollowingList(response.data.users);
                setLoading(false);
            })
            .catch((error) => {
                alert("Algo deu errado. Por favor, recarregue a página.");
                setLoading(false);
            });
    }

    function updateTimeline() {
        const APIfunction = getPosts;
        const settings = { token: loggedUser.token };

        getNewPosts({ APIfunction, settings, pagePosts })
            .then((response) => {
                setPagePosts([...response, ...pagePosts]);
            })
            .catch((error) =>
                alert(
                    "Não foi possível carregar os novos posts. Por favor, recarregue a página."
                )
            );
    }

    useEffect(() => {
        if (!loggedUser.token) return history.push(routes.login);

        getFollowingList();
    }, [loggedUser]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />

                    <ContentContainer>
                        <Search className="timeline" />
                        <PageTitleContainer>
                            <h1>timeline</h1>
                        </PageTitleContainer>

                        <PublishBox updateTimeline={updateTimeline} />

                        {followingList.length === 0 ? (
                            <WarningParagraph>
                                Você não segue ninguém ainda, procure por perfis
                                na busca
                            </WarningParagraph>
                        ) : null}

                        <FeedPostsContainer APIfunction={getPosts} />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}
