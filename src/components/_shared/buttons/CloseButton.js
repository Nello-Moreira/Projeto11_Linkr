import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

export default function CloseButton({ children, ...otherprops }) {
    return (
        <Button {...otherprops}>
            <AiOutlineClose color={"inherit"} />
        </Button>
    );
}

const Button = styled.button`
    font-size: 20px;
    color: rgb(255, 255, 255);
    padding: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
`;
