import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function ThreeDotsLoader({ color = 'rgb(255, 255, 255)', height = '20', width = '50' }) {
    return (
        <Loader
            type="ThreeDots"
            color={color}
            height={height}
            width={width}
        />
    )
};