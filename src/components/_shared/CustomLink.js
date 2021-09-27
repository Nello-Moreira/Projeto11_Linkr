import styled from "styled-components";

const CustomLink = styled.a`
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 17px;
    color: #ffffff;
    text-decoration: underline;
    cursor: ${({ loading }) => (loading ? "default" : "pointer")};

    :visited {
        color: #ffffff;
    }
`;

export default CustomLink;
