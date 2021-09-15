import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";

export default function MyPosts() {
  //const { user } = useContext(UserContext);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getUserPosts({ id: LoggedUser.user.id, token: LoggedUser.token })
      .then((response) => setPostList(response.data.posts))
      .catch((error) => "Ops, algo deu errado.");
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

const LoggedUser = {
  token: "e100f937-26c8-4a1d-9fa1-2ffa0d7ee6e7",
  user: {
    id: 473,
    email: "testonaldo@teste.com",
    username: "testonaldo1",
    avatar:
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/473/avatar",
  },
};
