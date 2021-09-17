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
		if (!loggedUser.token) return history.push(routes.login);

        getTrendingPosts({ topic: HASHTAG, token: loggedUser.token })
            .then((response) => {
                setTrendingPosts(response.data.posts)
                setLoading(false);
            })
            .catch(() => {
                alert("Houve um erro ao carregar essa página. Por favor, atualize a página.");
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
