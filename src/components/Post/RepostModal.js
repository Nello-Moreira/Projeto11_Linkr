import { useState } from "react";
import Modal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import CustomButton from "../_shared/buttons/CustomButton";

export default function RepostModal({
    openRepostModal,
    setOpenRepostModal,
    submitRepost,
    loading,
}) {
    return (
        <Modal
            isOpen={openRepostModal}
            onRequestClose={() => setOpenRepostModal(false)}
        >
            <ModalTitle>
                Tem certeza que quer compartilhar esse post?
            </ModalTitle>

            <ButtonsContainer
                customStyle={{
                    width: "100%",
                    separationMargin: "45px 10px 15px",
                }}
            >
                <CustomButton
                    customStyle={{
                        loading,
                        backgroundColor: "rgb(225,225,225)",
                        color: "rgb(24, 119, 242)",
                    }}
                    onClick={loading ? null : () => setOpenRepostModal(false)}
                >
                    Não, voltar
                </CustomButton>

                <CustomButton
                    customStyle={{ loading }}
                    onClick={loading ? null : submitRepost}
                >
                    Sim, repostar
                </CustomButton>
            </ButtonsContainer>
        </Modal>
    );
}
