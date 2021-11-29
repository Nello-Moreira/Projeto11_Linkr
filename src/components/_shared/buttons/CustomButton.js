import styled from "styled-components";
import ThreeDotsLoader from "../../loaders/ThreeDotsLoader";

export default function CustomButton({ loading, children, ...otherProps }) {
    loading = loading || false;

    return (
        <Button loading={loading} {...otherProps}>
            {loading ? <ThreeDotsLoader /> : children}
        </Button>
    );
}

const Button = styled.button`
    font-family: Oswald, sans-serif;
    font-size: 100%;
    color: rgb(255, 255, 255);
    width: 100%;
    height: 40px;
    background-color: ${(props) => props.theme.mode.button};
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ loading }) => (loading ? "default" : "pointer")};

    :hover {
        filter: ${({ loading }) =>
            loading ? "brightness(1)" : "brightness(1.3)"};
    }

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
