import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import Post from "../Post/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../HashtagBox/HashtagBox";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../API/requests";
import routes from "../../routes/routes";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "../Header/Search";

export default function Timeline() {
  const { loggedUser } = useContext(UserContext);
  const { pagePosts, setPagePosts } = useContext(PagePostsContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  function updateTimeline() {
    if (!loggedUser.token) return history.push(routes.login);

    setPagePosts([]);

    getPosts(loggedUser)
      .then((resp) => {
        if (resp.data.posts.length === 0) alert("Nenhum post encontrado");
        setPagePosts(resp.data.posts);

        setLoading(false);
      })
      .catch(() => {
        alert("Houve uma falha ao obter os posts, por favor atualize a página");
        setLoading(false);
      });
  }

  useEffect(() => updateTimeline(), []);

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

            {pagePosts.map((post) => (
              <Post postData={post} key={post.id} />
            ))}
          </ContentContainer>

          <HashtagBox />
        </>
      )}
    </PageContainer>
  );
}
