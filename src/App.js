import React, {useState} from 'react';
import styles from './App.module.css';
import {useStore} from './useStore.js';
import FieldInputForm from "./FieldInputForm";

const sendFormData = (formData) => {
    console.log(formData);
};


function App() {
    const {getState, updateState} = useStore();


    const onSubmit = (event) => {
        event.preventDefault();

        sendFormData(getState);
    };

    const {email, password, confirmPassword,login, error} = getState;


    return (
        <div className={styles.app}>
            <form onSubmit={onSubmit} className={styles.form}>
                <FieldInputForm name="login" type='text' placeholder="Логин" value={login} onChangeState={updateState} error={error} onBlurState={updateState}/>
                <FieldInputForm name="email" type='email' placeholder="Почта" value={email} onChangeState={updateState} error={error} onBlurState={updateState}/>
                <FieldInputForm name="password" type='password' placeholder="Пароль" value={password} onChangeState={updateState} error={error} onBlurState={updateState}/>
                <FieldInputForm name="confirmPassword" type='password' placeholder="Подтвердите пароль" value={confirmPassword} onChangeState={updateState} error={error} onBlurState={updateState}/>


                <button type="submit" disabled={Object.keys(error).length}>Зарегистрироваться</button>


            </form>

        </div>
    );
}

export default App;
