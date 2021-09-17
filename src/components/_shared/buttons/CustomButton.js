import styled from "styled-components";
import ThreeDotsLoader from '../../loaders/ThreeDotsLoader';

export default function CustomButton({ customStyle = {}, children, ...otherProps }) {

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
    font-size:${({ customStyle }) => customStyle.fontSize ? customStyle.fontSize : '100%'};
    color: ${({ customStyle }) => customStyle.color ? customStyle.color : 'rgb(255, 255, 255)'};
    width: ${({ customStyle }) => customStyle.width ? customStyle.width : '100%'};
    height: ${({ customStyle }) => customStyle.height ? customStyle.height : '40px'};
    background-color: ${({ customStyle }) => customStyle.backgroundColor ? customStyle.backgroundColor : 'rgba(24, 119, 242, 1)'};
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${({ customStyle }) => customStyle.position ? customStyle.position : "initial"};
    bottom: ${({ customStyle }) => customStyle.bottom ? customStyle.bottom : "" };
    margin: ${({ customStyle }) => customStyle.margin ? customStyle.margin : ""};
    right: ${({ customStyle }) => customStyle.right ? customStyle.right : ""};
    cursor: pointer;

    :hover{
        filter: ${({ customStyle }) => customStyle.loading ? 'brightness(1)' : 'brightness(1.3)'};
    }

    >div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;