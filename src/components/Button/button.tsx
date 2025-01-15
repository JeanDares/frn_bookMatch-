import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, children, className }) => {
    return (
        <button className={`${styles.button} ${className}`} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
