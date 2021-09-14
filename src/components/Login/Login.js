import HomeContainer from '../_shared/HomeContainer';
import Cover from '../_shared/Cover';
import ContentContainer from '../_shared/ContentContainer';
import { CustomForm, CustomInput } from '../_shared/Inputs';
import BlueButton from '../_shared/buttons/BlueButton';
import CustomLink from '../_shared/CustomLink';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { login } from '../../API/requests';
import statusCode from '../../API/statusCode';
import routes from '../../routes/routes';

export default function Login(params) {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState([
        { field: 'email', value: '', type: 'email', placeholder: 'e-mail' },
        { field: 'password', value: '', type: 'password', placeholder: 'Password' }
    ]);

    function getInputValue(field) {
        const input = inputsValues.filter(input => input.field === field)[0];
        return input.value;
    }

    function loginSubmit(event) {
        event.preventDefault();
        setLoading(true);

        login({
            email: getInputValue('email'),
            password: getInputValue('password'),
        })
            .then(response => {
                setLoading(false);
                setUser(response.data);
                history.push(routes.timeline);
            })
            .catch(err => {
                if (err.response.status === statusCode.wrongUserOrPassword) {
                    setLoading(false);
                    alert(err.response.data.message);
                }
            });
    }

    function inputValueRecorder(index, input, newValue) {
        inputsValues[index] = { ...input, value: newValue };
        setInputsValues([...inputsValues]);
    }

    return (
        <HomeContainer>
            <Cover />

            <ContentContainer>
                <CustomForm onSubmit={loginSubmit}>
                    {inputsValues.map((input, index) =>
                        <CustomInput
                            value={input.value}
                            onChange={loading ? null : (event) => inputValueRecorder(index, input, event.target.value)}
                            placeholder={input.placeholder}
                            type={input.type}
                            customStyle={{ loading }}
                            required
                            key={index}
                        />
                    )}

                    <BlueButton customStyle={{ loading }} type='submit'>
                        Log In
                    </BlueButton>
                </CustomForm>

                <CustomLink onClick={loading ? null : () => history.push(routes.signUp)}>
                    First time? Create an account!
                </CustomLink>
            </ContentContainer>
        </HomeContainer >
    )
};
