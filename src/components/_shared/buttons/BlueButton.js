import styled from "styled-components";
import ThreeDotsLoader from '../../loaders/ThreeDotsLoader';

export default function BlueButton({ customStyle = {}, children, ...otherProps }) {

    return (
        <Button customStyle={customStyle} {...otherProps}>
            {customStyle.loading ?
                <ThreeDotsLoader />
                :
                children
            }
        </Button>
    )
};

const Button = styled.button`
    font-family:${({ customStyle }) => customStyle.fontFamily ? customStyle.fontFamily : '"Oswald", sans-serif'};
    font-size:${({ customStyle }) => customStyle.fontSize ? customStyle.fontSize : '20px'};
    color: rgb(255, 255, 255);
    width: ${({ customStyle }) => customStyle.width ? customStyle.width : '100%'};
    height: ${({ customStyle }) => customStyle.height ? customStyle.height : '40px'};
    background-color: rgba(24, 119, 242, 1);
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover{
        background-color: ${({ customStyle }) => customStyle.loading ? 'rgba(24, 119, 242, 1)' : 'rgb(82, 182, 255)'};;
    }

    >div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;