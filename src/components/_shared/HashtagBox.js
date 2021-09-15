import styled from "styled-components";

export default function HashtagBox() {
    return (
        <Container>

        </Container>
    )
};



const Container = styled.div`
    width: 300px;
    height: 400px;
    margin-left: 20px;
    background-color: rgba(23, 23, 23, 1);
    border-radius: 15px;
    position: -webkit-sticky;
    position: sticky;
    top: 100px;

    @media (max-width: 1000px) { 
        display: none;
    }


`;