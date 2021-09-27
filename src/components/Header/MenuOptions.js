import styled from "styled-components";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";

export default function MenuOptions({ menuOpened }) {
    const history = useHistory();

    function logout() {
        localStorage.removeItem("linkrUser");
        history.push(routes.login);
    }

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <Container menuOpened={menuOpened}>
            <span onClick={() => history.push(routes.myPosts)}>Meus Post</span>
            <span onClick={() => history.push(routes.likes)}>
                Minhas Curtidas
            </span>
            <span onClick={() => setShowLogoutModal(true)}>Logout</span>
            <ConfirmModal
                isOpen={showLogoutModal}
                setIsOpen={setShowLogoutModal}
                title={"Tem certeza que deseja sair?"}
                onConfirm={logout}
                confirmText={"Sim, fazer logout"}
            />
        </Container>
    );
}

const Container = styled.div`
    width: 175px;
    padding: 0 10px 10px;
    background-color: rgba(23, 23, 23, 1);
    border-bottom-left-radius: 10px;
    position: fixed;
    top: ${({ menuOpened }) => (menuOpened ? "70px" : "-30vh")};
    right: -1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: top 0.5s ease;

    span {
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        margin-top: 10px;
        cursor: pointer;
    }
`;
