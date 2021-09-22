import styled from "styled-components";

const PostContainer = styled.div`
  width: 100%;
  background-color: #171717;
  border-radius: 16px;
  padding: 20px 20px 20px 0;
  display: flex;
  margin-bottom: 15px;

  button {
    background: none;
    border: none;
  }

  @media (max-width: 611px) {
    border-radius: 0px;
  }
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

  @media (max-width: 611px) {
    padding: 3px;
    p {
      font-size: 9px;
    }
  }
`;

const UserContainer = styled.div`
  font-size: 19px;
  color: rgb(255, 255, 255);
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  height: 100%;
  width: 83%;

  a {
    color: rgb(234, 232, 232);
    text-decoration: none;
    margin-bottom: 10px;
    cursor: pointer;

    :hover {
      color: rgb(255, 255, 255);
    }
  }

  h2 {
    font-size: 19px;
    color: #fff;
    word-break: break-word;
  }

  @media (max-width: 611px) {
    width: calc(100% - 30px);

    h2 {
      font-size: 17px;
      margin-left: 5px;
    }
  }
`;

const InputEditText = styled.textarea`
  width: 100%;
  font-size: 17px;
  font-family: "Lato", sans-serif;
  background-color: ${({ loading }) =>
    loading ? "rgb(242, 242, 242)" : "rgb(255,255,255)"};
  word-wrap: break-word;
  border-radius: 7px;
  margin-bottom: 5px;
  padding: 8px;
  resize: vertical;

  :focus {
    outline: none !important;
  }

  @media (max-width: 611px) {
    font-size: 15px;
  }
`;

const UserNameContainer = styled.div`
  display: flex;

  svg {
    cursor: pointer;
  }
`;

export {
  PostContainer,
  LeftContainer,
  UserContainer,
  RightContainer,
  InputEditText,
  UserNameContainer,
};
