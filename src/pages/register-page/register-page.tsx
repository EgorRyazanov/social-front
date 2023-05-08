import { TRegister, register } from "../../services/slices/user";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { Link } from "react-router-dom";
import { FC } from "react";

const getUser = (store: TRootState) => store.userReducer.user;

const RegisterPage: FC = () => {
    const dispatch = useTypedDispatch();
    const user = useTypedSelector(getUser);
    const navigate = useNavigate();
    if (user) {
        navigate("/", { replace: true });
    }
    const { values, handleChange } = useForm<TRegister & { repeatPassword: string | number }>({
        name: "",
        secondName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { repeatPassword, ...form } = values;
        dispatch(register(form));
    };

    return (
        <div className="flex min-h-[640px] flex-col bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Регистрация
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="mb-4">
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Имя
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={values.name}
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="secondName" className="block text-sm font-medium leading-6 text-gray-900">
                                Фамилия
                            </label>
                            <div className="mt-2">
                                <input
                                    id="secondName"
                                    name="secondName"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.secondName}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Почта
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    value={values.email}
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={values.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="repeatPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Повторите пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={values.repeatPassword}
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                    <Link to="/login">
                        <p>Уже есть аккаунт?</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
