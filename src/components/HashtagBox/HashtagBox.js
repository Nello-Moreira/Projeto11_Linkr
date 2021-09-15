import Hashtag from './Hashtag';
import CircleLoader from '../loaders/CircleLoader';
import styled from 'styled-components';
import { getTrendingTopics } from '../../API/requests';
import UserContext from '../../contexts/UserContext';
import { useContext, useState, useEffect } from 'react';

export default function HashtagBox() {
    const { loggedUser } = useContext(UserContext);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingTopics(loggedUser)
            .then(response => {
                setLoading(false);
                setHashtags(response.data.hashtags.sort((a, b) => (a - b)));
            })
    }, []);

    return (
        <Container>
            <TitleContainer>
                <h2>trending</h2>
            </TitleContainer>

            <ContentContainer>
                {loading ?
                    <CircleLoader customStyle={{ color: 'rgba(255,255,255)', height: '250px' }} />
                    :
                    hashtags.map(
                        hashtagObject => <Hashtag hashtagObject={hashtagObject} />
                    )
                }
            </ContentContainer>
        </Container>
    )
};

const Container = styled.div`
    width: 300px;
    height: 400px;
    margin: 142px 0 0 20px;
    background-color: rgba(23, 23, 23, 1);
    border-radius: 15px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;

    @media (max-width: 1000px) { 
        display: none;
    }
`;

const TitleContainer = styled.div`
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    height: 60px;
    padding: 0 15px;
    border-bottom: 1px solid rgba(72, 72, 72, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const ContentContainer = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: rgba(200, 200, 200, 1);
    padding: 0 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;