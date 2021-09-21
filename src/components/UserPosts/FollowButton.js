import styled from 'styled-components';
import CustomButton from '../_shared/buttons/CustomButton';
import UserContext from '../../contexts/UserContext';
import { useState, useContext, useEffect } from 'react';
import { getFollows, followUser, unfollowUser } from '../../API/requests';

export default function FollowButton({ userId }) {
    const { loggedUser } = useContext(UserContext);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isFollowing(userId);
    }, [])

    function isFollowing(userId) {
        getFollows({ token: loggedUser.token })
            .then(response => {
                if (response.data.users.filter(user => user.id == userId).length > 0) {
                    setFollowing(true)
                }
                setLoading(false)
            })
            .catch(error => alert('Algo deu errado. Por favor, recarregue a página.'));
    }

    function followRequest() {
        setLoading(true);

        followUser({ token: loggedUser.token, userId })
            .then(response => {
                setFollowing(true)
                setLoading(false)
            })
            .catch(error => {
                alert('Ocorreu um erro. Por favor, tente novamente.');
                setLoading(false)
            })
    }

    function unfollowRequest() {
        setLoading(true);

        unfollowUser({ token: loggedUser.token, userId })
            .then(response => {
                setFollowing(false)
                setLoading(false)
            })
            .catch(error => {
                alert('Ocorreu um erro. Por favor, tente novamente.');
                setLoading(false)
            })
    }

    return (
        following ?
            <ButtonBase
                onClick={loading ? null : unfollowRequest}
                customStyle={{
                    loading,
                    color: 'rgb(24, 119, 242)',
                    backgroundColor: 'rgb(225,225,225)',
                }}
            >
                Unfollow
            </ButtonBase >
            :
            <ButtonBase
                onClick={loading ? null : followRequest}
                customStyle={{
                    loading,

                }}
            >
                Follow
            </ButtonBase >

    );
}

const ButtonBase = styled(CustomButton)`
    font-family: "'Lato', sans-serif";
    font-size: 15px;
    width: 80px;
    position: relative;
    left: 320px;

    @media (max-width: 1000px){
        position: initial;
    }
`;
