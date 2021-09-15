import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("linkrUser"));
}

export default function UserPosts() {
  //const { user } = useContext(UserContext);
  const { id } = useParams();
  const storedUser = getUserFromLocalStorage();
  const { token } = storedUser;
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getUserPosts({ id, token: token })
      .then((response) => setPostList(response.data.posts))
      .catch(() => "Ops, algo deu errado.");
  }, []);

  console.log(postList);

  return (
    <ContainerPosts>
      <Header />
      <PageTitle></PageTitle>
      {postList.map((postData, index) => (
        <Post postData={postData} key={index} />
      ))}
    </ContainerPosts>
  );
}

const ContainerPosts = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
