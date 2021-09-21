import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { CustomInput } from "../_shared/Inputs";

export default function Search({ className }) {
  return (
    <Container className={className}>
      <SearchInput
        customStyle={{
          loading: false,
        }}
        placeholder="Search for people and friends"
      />
      <AiOutlineSearch color="#C6C6C6" title={"Search"} fontSize="28px" />
    </Container>
  );
}

const SearchInput = styled(CustomInput)`
  font-family: "Lato", sans-serif;
  background-color: transparent;
  border: none;
  font-size: 15px;
  width: 90%;
`;

const Container = styled.div`
  width: 43%;
  height: "45px";
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  border-radius: 8px;
  padding: 0 5px;

  &.timeline {
    display: none;
    width: 100%;
  }

  @media (max-width: 700px) {
    &.header {
      display: none;
    }

    &.timeline {
      display: flex;
      margin-top: 10px;
    }
  }
`;
