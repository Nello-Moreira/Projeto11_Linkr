import styled from "styled-components";

const ButtonsContainer = styled.div`
    width: ${({ customStyle }) => (customStyle && customStyle.width) ? customStyle.width : 'auto'};
    display: flex;
    flex-direction: ${({ customStyle }) => (customStyle && customStyle.flexDirection) ? customStyle.flexDirection : 'row'};
    justify-content: ${({ customStyle }) => (customStyle && customStyle.justify) ? customStyle.justify : 'center'};
    align-items: ${({ customStyle }) => (customStyle && customStyle.align) ? customStyle.align : 'center'};

    > button {
        margin: ${({ customStyle }) => (customStyle && customStyle.separationMargin) ? customStyle.separationMargin : 'auto'};
    }
`;

export default ButtonsContainer;