import CircleLoader from '../loaders/CircleLoader';
import { PageContainer, ContentContainer } from '../_shared/PageContainer';
import Header from '../Header/Header';
import { PageTitle } from '../_shared/PageTitle';
import HashtagBox from '../HashtagBox/HashtagBox';
import Post from '../_shared/Post';
import { getTrendingPosts } from '../../API/requests';
import statusCode from '../../API/statusCode';
import routes from '../../routes/routes';
import UserContext from '../../contexts/UserContext';
import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function TrendingPage() {
    const { HASHTAG } = useParams();
    const { loggedUser } = useContext(UserContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        getTrendingPosts({ topic: HASHTAG, token: loggedUser.token })
            .then((response) => {
                setTrendingPosts(response.data.posts)
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === statusCode.noToken) return history.push(routes.login);
                alert(error.response.data.message);
                setLoading(false);
            });
    }, [HASHTAG]);

    return (
        <PageContainer>
            {loading ?
                <CircleLoader customStyle={{ height: '50vh' }} />
                :
                <>
                    <Header />

                    <ContentContainer>
                        <PageTitle>{`# ${HASHTAG}`}</PageTitle>

                        {trendingPosts.map(
                            post => <Post postData={post} key={post.id} />
                        )}
                    </ContentContainer>

                    <HashtagBox />
                </>
            }
        </PageContainer>
    );
};
