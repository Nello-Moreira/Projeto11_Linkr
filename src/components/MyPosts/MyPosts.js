import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";

export default function MyPosts() {
  const { user } = useContext(UserContext);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getUserPosts({ id: user.user.id, token: user.token })
      .then((response) => setPostList(response.data.posts))
      .catch(() => "Ops, algo deu errado.");
  }, []);

  return (
    <ContainerPosts>
      <Header />
      <PageTitle>my posts</PageTitle>
      {postList.map((postData, index) => (
        <Post postData={postData} key={index} />
      ))}
    </ContainerPosts>
  );
}

const ContainerPosts = styled(PageContainer)`
  width: 100%;
`;
