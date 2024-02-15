import React, { useState } from "react";
import { auth } from "../../../Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Добавляем импорт signOut

import styles from "./Login.module.scss"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Добавляем состояние для отслеживания статуса входа

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password); // Используем signInWithEmailAndPassword
            setIsLoggedIn(true); // Устанавливаем состояние в "вошел в систему"
            // Если вход успешен, ничего не делаем дополнительно
        } catch (error) {
            setError(error.message);
            console.error("Ошибка входа:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Выход из системы
            setIsLoggedIn(false); // Устанавливаем состояние в "вышел из системы"
        } catch (error) {
            console.error("Ошибка выхода:", error);
        }
    };

    return (
        <div className={styles.loginForm}>
            {isLoggedIn ? ( // Проверяем статус входа и отображаем соответствующую форму
                <>
                    <p>Вы вошли в систему.</p>
                    <button className={styles.button} onClick={handleLogout}>Выйти</button>
                </>
            ) : (
                <>
                    <h2 className={styles.title}>Вход</h2>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className={styles.button} onClick={handleLogin}>Войти</button>
                    {error && <p className={styles.error}>{error}</p>}
                </>
            )}
        </div>
    );
};

export default LoginForm;

