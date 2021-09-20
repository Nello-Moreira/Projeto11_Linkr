import Modal from '../Modal/Modal';
import ModalTitle from '../Modal/ModalTitle';
import ButtonsContainer from '../_shared/buttons/ButtonsContainer';
import CustomButton from '../_shared/buttons/CustomButton';
import { deletePost } from '../../API/requests';
import PagePostsContext from '../../contexts/PagePostsContext';
import UserContext from '../../contexts/UserContext';
import { useState, useContext } from 'react';

export default function DeletingPostModal() {
    const { loggedUser } = useContext(UserContext);
    const { pagePosts, setPagePosts, deletingPostId, setDeletingPostId } = useContext(PagePostsContext);
    const [loading, setLoading] = useState(false);


    function deletePostOnServer() {
        setLoading(true);

        deletePost({ postId: deletingPostId, token: loggedUser.token })
            .then(response => {
                setPagePosts(pagePosts.filter(post => post.id !== deletingPostId));
                setDeletingPostId(false);
                setLoading(false);

            })
            .catch(error => {
                setDeletingPostId(false);
                setLoading(false);
                alert('Não foi possível deletar o post. Por favor, tente de novo.');
            });
    }

    return (
        <Modal isOpen={!!deletingPostId} onRequestClose={() => setDeletingPostId(false)}>
            <ModalTitle>
                Tem certeza que deseja
                excluir essa publicação?
            </ModalTitle>

            <ButtonsContainer customStyle={{ width: '100%', separationMargin: '45px 10px 15px' }}>
                <CustomButton
                    customStyle={{ loading, backgroundColor: 'rgb(225,225,225)', color: 'rgb(24, 119, 242)' }}
                    onClick={loading ? null : () => setDeletingPostId(false)}>
                    Não, voltar
                </CustomButton>

                <CustomButton
                    customStyle={{ loading }}
                    onClick={loading ? null : deletePostOnServer}>
                    Sim, excluir
                </CustomButton>
            </ButtonsContainer>
        </Modal >
    )
}
