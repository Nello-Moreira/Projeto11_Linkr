import HomeContainer from '../_shared/HomeContainer';
import Cover from '../_shared/Cover';
import FormContainer from '../_shared/FormContainer';
import { signUp } from '../../API/requests';

export default function SignUp(params) {

    /* 
    signUp({
        email: "aaa@teste.com",
        password: "123456",
        username: "Joao dos Testes",
        pictureUrl: "https://http.cat/411.jpg"
    }).then(response => console.log(response));
 */

    return (
        <HomeContainer>
            <Cover />
            <FormContainer>teste</FormContainer>
        </HomeContainer>
    )
};
