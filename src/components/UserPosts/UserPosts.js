import styled from "styled-components";
import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import Header from "../Header/Header";
import { PageTitleContainer } from "../_shared/PageTitleContainer";
import UserAvatar from "../_shared/UserAvatar";
import FollowButton from "./FollowButton";
import HashtagBox from "../HashtagBox/HashtagBox";
import { getUserData, getUserPosts } from "../../API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FeedPostsContainer } from "../_shared/FeedPostsContainer";

export default function UserPosts() {
    const { loggedUser } = useContext(UserContext);
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        if (!loggedUser.token) return history.push(routes.login);

        getUserData({ id, token: loggedUser.token })
            .then((response) => {
                setUserProfile(response.data.user);
                setLoading(false);
            })
            .catch(() => {
                alert("Ops, algo deu errado.");
                setLoading(false);
            });
    }, [loggedUser, id]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />
                    <ContentContainer>
                        <PageTitleContainer>
                            <ProfileInformations>
                                <UserAvatar
                                    user={userProfile}
                                    noLink={true}
                                    customStyle={{
                                        margin: "0 15px 0 0",
                                    }}
                                />
                                <h1>
                                    <span className="username">
                                        {userProfile.username}
                                    </span>
                                    's posts
                                </h1>
                            </ProfileInformations>

                            {loggedUser.user.id !== Number(id) ? (
                                <FollowButton userId={id} key={id} />
                            ) : null}
                        </PageTitleContainer>

                        <FeedPostsContainer
                            APIfunction={getUserPosts}
                            settings={{ id }}
                            key={id}
                        />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}

const ProfileInformations = styled.div`
    display: flex;
    align-items: center;

    .username {
        display: inline-block;
        max-width: 350px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 600px) {
        .username {
            max-width: 150px;
        }
    }
`;
