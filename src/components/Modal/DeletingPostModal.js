import Modal from '../Modal/Modal';
import ModalTitle from '../Modal/ModalTitle';
import ButtonsContainer from '../_shared/buttons/ButtonsContainer';
import BlueButton from '../_shared/buttons/BlueButton';
import styled from 'styled-components';

export default function DeletingPostModal({ postData, isDeleting, setIsDeleting }) {
    return (
        <Modal isOpen={isDeleting} onRequestClose={() => setIsDeleting(false)}>
            <ModalTitle>
                Tem certeza que deseja
                excluir essa publicação?
            </ModalTitle>

            <ButtonsContainer customStyle={{ width: '100%', separationMargin: '45px 10px 15px' }}>
                <BlueButton 
                customStyle={{ backgroundColor: 'rgb(225,225,225)', color: 'rgb(24, 119, 242)'}}
                onClick={() => setIsDeleting(false)}>
                    Não, voltar
                </BlueButton>

                <BlueButton onClick={() => setIsDeleting(false)}>
                    Sim, excluir
                </BlueButton>
            </ButtonsContainer>
        </Modal >
    )
}
