import styled from "styled-components";

export default function ProfileImage({padding}) {
    return (
        <Profile padding={padding}>
            <img src={"https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg"} alt="testProfile" />
        </Profile>
    );
}

const Profile = styled.div`
    width: 86px;
    padding: ${props=>props.padding}px;

    img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`