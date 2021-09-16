import styled from 'styled-components';
import routes from '../../routes/routes';
import { Link } from 'react-router-dom';

export default function Hashtags({ hashtagObject }) {
    return (
        <Container>
            <Link to={`${routes.trending.replace(':HASHTAG', hashtagObject.name)}`}>
                {`# ${hashtagObject.name}`}
            </Link>
        </Container>
    )
};

const Container = styled.div`
    margin-bottom: 10px;
    
    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    
        :hover{
            color: rgb(255,255,255);
        }
    }
`;