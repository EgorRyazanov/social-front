import { TLogin, login } from "../../services/slices/user";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";

const getUser = (store: TRootState) => store.userReducer.user;

const LoginPage = () => {
    const dispatch = useTypedDispatch();
    const user = useTypedSelector(getUser);
    const navigate = useNavigate();
    if (user) {
        navigate("/", { replace: true });
    }
    const { values, handleChange } = useForm<TLogin>({
        email: "",
        password: "",
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(values));
    };

    return (
        <div className="flex min-h-[640px] flex-col bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Авторизация
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit}>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Почта
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    required
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    required
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                    <Link to="/register">
                        <p>Еще нет аккаунта?</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
