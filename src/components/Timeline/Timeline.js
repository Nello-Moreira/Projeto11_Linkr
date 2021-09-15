import { useEffect, useContext, useState } from "react";
import { getPosts } from "../../API/requests";

import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {

	const { user } = useContext(UserContext);

    const [ timelinePosts, setTimelinePosts ] = useState([]);

    function updateTimeline() {
		getPosts(user)
			.then((resp) => {
                console.log(resp.data)
                setTimelinePosts(resp.data.posts)
            }) //Simulando preenchimento da array de posts da timeline
			.catch(() => updateTimeline());
	}

	useEffect(() => updateTimeline(), []);

    return (
        <PageContainer>
            <Header />
            <PageTitle>
                timeline
            </PageTitle>
            <PublishBox updateTimeline = {updateTimeline}/>
            { timelinePosts.length > 0 ?  timelinePosts.map((post) =>
                <Post postData = {post}/>
            ) : ""}
        </PageContainer>
    );
}