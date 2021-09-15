import styled from "styled-components";

export default function ProfileImage({ customStyle = {} }) {
    return (
        <Profile customStyle={ customStyle }>
            <img src={"https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg"} alt="testProfile" />
        </Profile>
    );
}

const Profile = styled.div`
    padding: ${({customStyle}) => customStyle.padding ? customStyle.padding : "inherit"};

    @media (max-width: 700px){
        display: ${({customStyle}) => customStyle.mobileDisplay ? customStyle.mobileDisplay : "initial"};
    }
    
    img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`