import Loader from "react-loader-spinner";
import s from "../Spinner/Spinner.module.css"

export default function Spinner() {
    return (<Loader
            className={s.loader}
            type="TailSpin"
            color="#b2c4c4"
            height={100}
            width={100}/>)
}