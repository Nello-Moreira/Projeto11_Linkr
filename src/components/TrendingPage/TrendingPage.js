import { PageContainer, ContentContainer } from '../_shared/PageContainer';
import Header from '../Header/Header';
import { PageTitle } from '../_shared/PageTitle';
import HashtagBox from "../HashtagBox/HashtagBox";
import Post from '../_shared/Post';

import CircleLoader from '../loaders/CircleLoader';


import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

import { getTrendingPosts } from '../../API/requests';



export default function TrendingPage() {
    const { HASHTAG } = useParams();
    const { loggedUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        getTrendingPosts({ topic: HASHTAG, token: loggedUser.token })
            .then((response) => {
                setLoading(false);
                setTrendingPosts(response.data.posts)
            })
            .catch((error) => console.log(error.response));
    }, [HASHTAG]);

    return (
        <PageContainer>
            <Header />

            <ContentContainer>
                <PageTitle>{`# ${HASHTAG}`}</PageTitle>

                {loading ?
                    <CircleLoader customStyle={{ height: '50vh' }} />
                    :
                    trendingPosts.map(post => <Post postData={post} key={post.id} />)
                }
            </ContentContainer>

            <HashtagBox />
        </PageContainer>
    );
};
