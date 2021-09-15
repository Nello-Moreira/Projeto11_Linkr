import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUserData, getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";
import UserAvatar from "../_shared/UserAvatar";

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("linkrUser"));
}

export default function UserPosts() {
  //const { loggedUser } = useContext(UserContext);
  const { id } = useParams();
  const storedUser = getUserFromLocalStorage();
  const { token } = storedUser;
  const [userProfile, setUserProfile] = useState({});
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getUserData({ id, token })
      .then((response) => setUserProfile(response.data.user))
      .catch(() => alert("Ops, algo deu errado."));
    getUserPosts({ id, token })
      .then((response) => setPostList(response.data.posts))
      .catch(() => alert("Ops, algo deu errado."));
  }, []);

  console.log(postList);

  return (
    <PageContainer>
      <Header />
      <ProfileTitle>
        <ProfilePicture src={userProfile.avatar} /> {userProfile.username}'s
        posts
      </ProfileTitle>
      {postList.map((postData, index) => (
        <Post postData={postData} key={index} />
      ))}
    </PageContainer>
  );
}

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 15px;
  margin-bottom: -15px;

  @media (max-width: 700px) {
    height: 40px;
    width: 40px;
  }
`;

const ProfileTitle = styled(PageTitle)`
  display: flex;
  align-items: center;
  margin: 60px 0 40px;
`;
