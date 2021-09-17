import ReactModal from 'react-modal';
import styled from 'styled-components';

export default function AlertModal({ isOpen, onRequestClose, children }) {
    const transitionTimingsInMS = 300;

    return (
        <ReactModal
            isOpen={isOpen}
            appElement={document.querySelector('#root')}
            ariaHideApp={true}
            role={"dialog"}

            contentLabel={"Deleting post alert"}

            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}           
            
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}

            portalClassName={"ReactModalPortal"}
            overlayClassName={"ReactModal__Overlay"}
            className={"ReactModal__Content"}

            closeTimeoutMS={transitionTimingsInMS}

            overlayElement={
                (props, contentElement) =>
                    <OverlayTransition transitionTimingsInMS={transitionTimingsInMS}>
                        <Overlay {...props}>{contentElement}</Overlay>
                    </OverlayTransition>
            }
            contentElement={
                (props, children) => <ContentContainer {...props}>{children}</ContentContainer>
            }
        >
            {children}
        </ReactModal >
    )
}

const OverlayTransition = styled.div`
    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity ${({ transitionTimingsInMS }) => transitionTimingsInMS || 0}ms ease;
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }
`;

const Overlay = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentContainer = styled.div`
    font-size: 20px;
    width: 100%;
    max-width: 611px;
    padding: 45px 30px;
    background-color: rgba(51, 51, 51, 1);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 611px){
        border-radius: 0;
        padding: 30px 15px;
    }
`;

