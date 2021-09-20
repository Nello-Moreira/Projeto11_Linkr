import styled from 'styled-components';
import CustomButton from '../_shared/buttons/CustomButton';
import UserContext from '../../contexts/UserContext';
import { useState, useContext } from 'react';

export default function FollowButton({ userId }) {
    const { loggedUser } = useContext(UserContext);
    const [following, setFollowing] = useState(amFollowing(userId));
    const [loading, setLoading] = useState(false);

    function amFollowing(userId) {
        return true;           //TEMP
    }

    function follow() {
        setLoading(true);

        console.log('follow')
        setFollowing(true);

        setLoading(false);

    }

    function unfollow() {
        setLoading(true);

        console.log('unfollow')
        setFollowing(false);

        setLoading(false);
    }

    console.log('entrei')

    return (
        following ?
            <CustomButton
                onClick={loading ? null : unfollow}
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
                onClick={loading ? null : follow}
                customStyle={{ 
                    loading,
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '15px',
                    width: '80px' }}
            >
                Follow
            </CustomButton >

    );
}
