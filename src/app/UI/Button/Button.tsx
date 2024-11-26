import {
	type ButtonHTMLAttributes
} from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {};

const Button = ({...props}: ButtonProps) => {

	return(<button {...props} className={styles['button']}/>);
};

export default Button;