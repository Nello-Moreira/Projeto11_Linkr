import { BiRepost } from "react-icons/bi";

import styled from "styled-components";

export default function RepostButton({ customStyle, ...otherprops }) {
  console.log(customStyle);
  return (
    <Button customStyle={customStyle} {...otherprops}>
      <BiRepost
        color={"inherit"}
        title={"Repost this in your feed"}
        cursor={"pointer"}
      />
    </Button>
  );
}

const Button = styled.button`
  font-size: ${({ customStyle }) =>
    customStyle && customStyle.fontSize ? customStyle.fontSize : "inherit"};
  color: ${({ customStyle }) =>
    customStyle && customStyle.color ? customStyle.color : "inherit"};
  padding: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border: none;
  cursor: pointer;
`;
