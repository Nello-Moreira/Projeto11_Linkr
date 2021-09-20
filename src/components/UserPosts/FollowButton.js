import CustomButton from '../_shared/buttons/CustomButton';
import UserContext from '../../contexts/UserContext';
import { useState, useContext, useEffect } from 'react';
import { getFollows, followUser, unfollowUser } from '../../API/requests';

export default function FollowButton({ userId }) {
    const { loggedUser } = useContext(UserContext);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        amFollowing(userId);
    }, [])

    function amFollowing(userId) {
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
            <CustomButton
                onClick={loading ? null : unfollowRequest}
                customStyle={{
                    loading,
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '15px',
                    color: 'rgb(24, 119, 242)',
                    width: '80px',
                    backgroundColor: 'rgb(225,225,225)',
                }}
            >
                Unfollow
            </CustomButton >
            :
            <CustomButton
                onClick={loading ? null : followRequest}
                customStyle={{
                    loading,
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '15px',
                    width: '80px'
                }}
            >
                Follow
            </CustomButton >

    );
}
