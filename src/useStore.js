import {useState} from 'react';
import {initialState} from "./Utils/const";


export const useStore = () => {
    const [state, setState] = useState(initialState);

    return {
        getState: state,
        updateState: (fieldName, event) => {
            let errorObj = state.error;
            let fieldValue = event.target.value.trim();
            if (!fieldValue) {
                errorObj[fieldName] = 'Поле обязательно для заполнения';
            } else {
                delete errorObj[fieldName];
            }

            switch (fieldName) {
                case 'email':
                    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
                    if (!reg.test(fieldValue)) {
                        errorObj[fieldName] = 'Некорректная почта';
                    } else {
                        delete errorObj[fieldName];
                    }

                    break;
                case 'password':
                case 'confirmPassword':

                    if (event.type === 'blur') {
                        if (fieldName === 'password' && fieldValue !== state.confirmPassword) {
                            errorObj[fieldName] = 'Пароли не совпадают';
                        } else {
                            delete errorObj[fieldName];
                        }
                        if (fieldName === 'confirmPassword' && fieldValue !== state.password) {
                            errorObj[fieldName] = 'Пароли не совпадают';
                        } else {
                            delete errorObj[fieldName];
                        }
                    }
                    if (event.type === 'blur' || event.type === 'change') {
                        if (fieldValue.length < 6 || fieldValue.length > 10) {
                            errorObj[fieldName] = 'От 6 до 10 символов';
                        } else {
                            delete errorObj[fieldName];
                        }
                    }
                    break;


            }

            setState({...state, [fieldName]: fieldValue, error: errorObj});
        },

    };
};