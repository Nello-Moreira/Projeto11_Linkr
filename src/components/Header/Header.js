import styled from "styled-components";

export default function Header() {
    return(
        <FixedContainer>
            <Logo>Linkr</Logo>
        </FixedContainer>
    );
}

const FixedContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 72px;
    background-color: black;
    padding: 10px 28px;
`
const Logo = styled.div`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: 700;
    color: white;
`