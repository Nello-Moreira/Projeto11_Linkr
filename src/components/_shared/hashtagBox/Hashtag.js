import styled from 'styled-components';
import routes from '../../../routes/routes';

export default function Hashtags({ hashtagObject }) {
    return (
        <Container href={`${routes.trending.replace(':HASHTAG', hashtagObject.name)}`}>
            {`# ${hashtagObject.name}`}
        </Container>
    )
};

const Container = styled.a`
    color: inherit;
    text-decoration: none;
    margin-bottom: 10px;
    cursor: pointer;

    :hover{
        color: rgb(255,255,255);
    }
`;