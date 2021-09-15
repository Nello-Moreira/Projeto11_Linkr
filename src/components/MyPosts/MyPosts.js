import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";

export default function MyPosts() {
  //const { loggedUser } = useContext(UserContext);
  const storedUser = getUserFromLocalStorage();
  const { user, token } = storedUser;

  const [postList, setPostList] = useState([]);

  function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("linkrUser"));
  }

  useEffect(() => {
    getUserPosts({ id: user.id, token: token })
      .then((response) => setPostList(response.data.posts))
      .catch(() => "Ops, algo deu errado.");
  }, []);

  return (
    <PageContainer>
      <Header />
      <PageTitle>my posts</PageTitle>
      {postList.map((postData, index) => (
        <Post postData={postData} key={index} />
      ))}
    </PageContainer>
  );
}
