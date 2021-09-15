<<<<<<< HEAD
import styled from "styled-components";
import { Container } from "../_shared/PageContainer";
=======
import { PageContainer } from "../_shared/PageContainer";
>>>>>>> staging
import Post from "../_shared/Post";

export default function MyPosts() {
  return (
<<<<<<< HEAD
    <ContainerPosts>
=======
    <PageContainer>
>>>>>>> staging
      <Post postData={postData} />
      <Post postData={postData} />
      <Post postData={postData} />
      <Post postData={postData} />
<<<<<<< HEAD
    </ContainerPosts>
=======
    </PageContainer>
>>>>>>> staging
  );
}

const postData = {
  id: 2,
  text: "Melhor plataforma do Brasil #respondeai",
  link: "https://respondeai.com.br",
  linkTitle: "Estude mais rápido e mande bem na prova",
  linkDescription:
    "Estude mais rápido. Guia com resumos, provas antigas e exercícios resolvidos passo a passo, focados na prova da sua faculdade.",
  linkImage: "https://www.respondeai.com.br/facebook-ad-square.png",
  user: {
    id: 1,
    username: "teste",
    avatar:
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar",
  },
};

const ContainerPosts = styled(Container)`
  width: 100%;
`;
