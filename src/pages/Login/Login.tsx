import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../services/authService";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            localStorage.setItem("token", response.token);


            dispatch(setUser({
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                has_preferences: response.user.has_preferences,
                preferences: response.user.preferences, // Armazena as preferências
            }));




            if (response.user?.has_preferences === false) {
                navigate("/first-access");
            } else {
                navigate("/home")
            }
        } catch (error) {
            console.error("Erro ao tentar fazer loginnnnnn", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.branding}>
                <h1>BookMatch</h1>
                <p>Encontre o livro perfeito para você</p>
                <div className={styles.brandingImage}>
                    <span role="img" aria-label="Books">
                        📚
                    </span>
                </div>
            </div>
            <div className={styles.loginBox}>
                <h2>Bem vindo de volta!</h2>
                <p className={styles.subtitle}>Acesse com seus dados</p>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Entre com seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Entre com sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.showPassword}
                                onClick={togglePasswordVisibility}
                                aria-label="Mostrar/ocultar senha"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    <div className={styles.options}>
                        <label>
                            <input type="checkbox" />
                            Relembrar por 7 dias
                        </label>
                        <a href="/forgot-password">Esqueci minha senha</a>
                    </div>
                    <button type="submit" className={styles.primaryButton}>
                        Log In
                    </button>
                    <button type="button" className={styles.googleButton}>
                        <span className={styles.googleIcon}>G</span> Log in with Google
                    </button>
                </form>
                <p className={styles.footerText}>
                    Não possui uma conta? <a href="/register">Registre uma aqui</a>
                </p>
            </div>
        </div>
    );
};

export default Login;




