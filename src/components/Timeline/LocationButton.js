import styled from "styled-components";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function LocationButton({ newPost, setNewPost, loading }) {
    const [isLocationActive, setIsLocationActive] = useState(false);

    function activeLocation() {
        setIsLocationActive(true);
        navigator.geolocation.watchPosition(
            function (position) {
                setNewPost({
                    ...newPost,
                    geolocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                });
            },
            function errorCallback() {
                alert("Não foi possível obter sua localização.");
                setIsLocationActive(false);
            }
        );
    }

    return (
        <LocationButtonContainer
            type="input"
            isLocationActive={isLocationActive}
            loading={loading}
            onClick={() =>
                loading
                    ? null
                    : isLocationActive
                    ? setIsLocationActive(false)
                    : activeLocation()
            }
        >
            <IoLocationOutline />
            Localização{isLocationActive ? " ativada" : " desativada"}
        </LocationButtonContainer>
    );
}

const LocationButtonContainer = styled.div`
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    color: ${(props) => (props.isLocationActive ? "#238700" : "#949494}")};
    cursor: ${({ loading }) => (loading ? "default" : "pointer")};

    svg {
        font-size: 15px;
    }
`;
