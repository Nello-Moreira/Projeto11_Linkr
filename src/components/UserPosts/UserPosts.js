import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUserData, getUserPosts } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import Header from "../Header/Header";
import BlueButton from "../_shared/buttons/BlueButton";
import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("linkrUser"));
}

export default function UserPosts() {
  //const { loggedUser } = useContext(UserContext);
  const { id } = useParams();
  const storedUser = getUserFromLocalStorage();
  const { token } = storedUser;
  const [userProfile, setUserProfile] = useState({});
  const [selected, setSelected] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getUserData({ id, token })
      .then((response) => setUserProfile(response.data.user))
      .catch(() => alert("Ops, algo deu errado."));
    getUserPosts({ id, token })
      .then((response) => setPostList(response.data.posts))
      .catch(() => alert("Ops, algo deu errado."));
  }, []);

  function FollowUser() {
    setSelected(!selected);
  }

  return (
    <PageContainer>
      <Header />
      <ProfileTitle>
        <div>
          <ProfilePicture src={userProfile.avatar} />{" "}
          <h1>{userProfile.username}'s posts</h1>
        </div>
        <FollowButton
          customStyle={{
            width: "112px",
            height: "31px",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          selected={selected}
          onClick={FollowUser}
        >
          {selected ? "Unfollow" : "Follow"}
        </FollowButton>
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
  margin-right: 15px;

  @media (max-width: 700px) {
    height: 40px;
    width: 40px;
  }
`;

const ProfileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  font-size: 43px;
  color: white;
  margin: 60px 0 40px;

  div {
    display: flex;
    align-items: center;
  }

  h1 {
    margin-top: -15px;
  }

  @media (max-width: 700px) {
    margin: 19px 17px;

    h1 {
      font-size: 33px;
    }
  }
`;

const FollowButton = styled(BlueButton)`
  color: ${({ selected }) => (selected ? "#1877F2" : "#fff")};
  background-color: ${({ selected }) => (selected ? "#fff" : "#1877F2")};
`;
