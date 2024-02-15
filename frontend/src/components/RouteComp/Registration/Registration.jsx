import React, { useState } from "react";
import { auth } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Registration.module.scss"

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegistration = async () => {
        try {
            if (!email.includes('@')) {
                throw new Error("Недопустимый адрес электронной почты");
            }

            await createUserWithEmailAndPassword(auth, email, password);
            // Если регистрация успешна, ничего не делаем дополнительно
        } catch (error) {
            setError(error.message);
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <div className={styles.registrationForm}>
            <h2 className={styles.title}>Регистрация</h2>
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
            <button className={styles.button} onClick={handleRegistration}>Зарегистрироваться</button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default RegistrationForm;


