import { useEffect, useContext, useState } from "react";
import { getPosts } from "../../API/requests";

import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {

    const { loggedUser } = useContext(UserContext);

    const [timelinePosts, setTimelinePosts] = useState(null);

    function updateTimeline() {
        getPosts(loggedUser)
            .then((resp) => {
                if (resp.data.posts.length === 0)
                    alert("Nenhum post encontrado");
                setTimelinePosts(resp.data.posts);
            })
            .catch(() => alert("Houve uma falha ao obter os posts, por favor atualize a página"));
    }

    useEffect(() => updateTimeline(), []);

    return (
        <PageContainer>
            <Header />
            <PageTitle>
                timeline
            </PageTitle>
            <PublishBox updateTimeline={updateTimeline} />
            {timelinePosts ? timelinePosts.map((post) =>
                <Post postData={post} />
            ) : "Loading..."}
        </PageContainer>
    );
}