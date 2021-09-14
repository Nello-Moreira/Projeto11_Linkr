import HomeContainer from '../_shared/HomeContainer';
import CoverContainer from '../_shared/CoverContainer';
import FormContainer from '../_shared/FormContainer';
import { signUp } from '../../API/requests';

export default function SignUp(params) {

    signUp({
        email: "aaa@teste.com",
        password: "123456",
        username: "Joao dos Testes",
        pictureUrl: "https://http.cat/411.jpg"
    }).then(response => console.log(response));

    return (
        <HomeContainer>
            <CoverContainer></CoverContainer>
            <FormContainer></FormContainer>
        </HomeContainer>
    )
};