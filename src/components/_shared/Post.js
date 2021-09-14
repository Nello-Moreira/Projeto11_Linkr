import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

export default function Post({ postData }) {
  const { text, link, linkTitle, linkDescription, linkImage, user } = postData;

  return (
    <PostContainer>
      <LeftContainer>
        <ProfilePicture src={user.avatar} alt="profile" />
        <Heart />
        <p>14 likes</p>
      </LeftContainer>
      <RightContainer>
        <h2>{user.username}</h2>
        <p>{text}</p>
        <PreviewContainer>
          <DetailsContainer>
            <div>
              <h1>{linkTitle} </h1>
              <p>{linkDescription}</p>
            </div>
            <a href={link}>{link}</a>
          </DetailsContainer>
          <PostImage src={linkImage} />
        </PreviewContainer>
      </RightContainer>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  max-width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  padding: 20px 20px 20px 0;
  display: flex;
  margin-bottom: 15px;
`;

const LeftContainer = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 11px;
    color: #fff;
  }
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Heart = styled(AiOutlineHeart)`
  width: 23px;
  height: 23px;
  color: #fff;
  margin-bottom: 3px;
`;
const RightContainer = styled.div`
  height: 100%;
  width: 100%;

  h2 {
    font-size: 19px;
    color: #fff;
    margin-bottom: 12px;
  }

  > p {
    font-size: 17px;
    color: #aaaaaa;
    line-height: 18px;
    margin-bottom: 15px;
  }
`;

const PreviewContainer = styled.div`
  max-width: 503px;
  height: 155px;
  display: flex;
`;

const PostImage = styled.img`
  height: 155px;
  width: 153px;
  border-radius: 0 11px 11px 0;
`;

const DetailsContainer = styled.div`
  width: 100%;
  border: 1px solid #c4c4c4;
  border-right: none;
  border-radius: 11px 0 0 11px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 16px;
    color: #cecece;
    line-height: 20px;
    margin-bottom: 8px;
  }

  p {
    font-size: 11px;
    color: #aaaaaa;
  }

  a {
    text-decoration: none;
    font-size: 11px;
    color: #cecece;
  }
`;
