import HomeContainer from '../_shared/HomeContainer';
import Cover from '../_shared/Cover';
import ContentContainer from '../_shared/ContentContainer';
import { CustomForm, CustomInput } from '../_shared/Inputs';
import BlueButton from '../_shared/buttons/BlueButton';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../API/requests';
import statusCode from '../../API/statusCode';
import routes from '../../routes/routes';

export default function SignUp(params) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState([
        { field: 'email', value: '', type: 'email', placeholder: 'e-mail' },
        { field: 'password', value: '', type: 'password', placeholder: 'Password' },
        { field: 'username', value: '', type: 'text', placeholder: 'Username' },
        { field: 'pictureUrl', value: '', type: 'url', placeholder: 'Picture URL' }
    ]);

    function getInputValue(field) {
        const input = inputsValues.filter(input => input.field === field)[0];
        return input.value;
    }

    function signUpSubmit(event) {
        event.preventDefault();
        setLoading(true);

        signUp({
            email: getInputValue('email'),
            password: getInputValue('password'),
            username: getInputValue('username'),
            pictureUrl: getInputValue('pictureUrl')
        })
            .then(response => {
                setLoading(false);
                history.push(routes.login);
            })
            .catch(err => {
                if (err.response.status === statusCode.invalidField) {
                    setLoading(false);
                    alert(err.response.data.message);
                }
                if (err.response.status === statusCode.alreadyExists) {
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
                <CustomForm onSubmit={signUpSubmit}>
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
                        Sign Up
                    </BlueButton>
                </CustomForm>

            </ContentContainer>
        </HomeContainer >
    )
};
