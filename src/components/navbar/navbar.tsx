import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/default-avatar.jpg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { FC } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { clearUser } from "../../services/slices/user";
import { API_URL } from "../../services/axios";

const getUser = (state: TRootState) => state.userReducer.user;
const Navbar: FC = () => {
    const user = useTypedSelector(getUser);
    const dispatch = useTypedDispatch();

    return (
        <div className="w-full border-r-2 h-full flex flex-col py-4 justify-between">
            <div>
                <Link
                    to="/profile"
                    className="mx-4 hover:bg-gray-100 transition-all ease-in-out  group rounded mb-1 h-8 flex items-center px-4 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 min-w-max h-6 mr-4 stroke-slate-700 group-hover:stroke-indigo-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <a href="#" className="font-sans font-medium group-hover:text-indigo-600 text-slate-700">
                        Профиль
                    </a>
                </Link>
                <Link
                    to="/"
                    className="mx-4 hover:bg-gray-100 transition-all ease-in-out  group rounded mb-1 h-8 flex items-center px-4 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-4 stroke-slate-700 group-hover:stroke-indigo-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                    </svg>

                    <a href="#" className="font-sans font-medium group-hover:text-indigo-700 text-slate-600">
                        Статьи
                    </a>
                </Link>
                <Link
                    to="people"
                    className="mx-4 hover:bg-gray-100 transition-all ease-in-out  group rounded mb-1 h-8 flex items-center px-4 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-4 stroke-slate-700 group-hover:stroke-indigo-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                    </svg>

                    <a href="#" className="font-sans font-medium group-hover:text-indigo-600 text-slate-700">
                        Люди
                    </a>
                </Link>
            </div>
            <Link
                to="/profile/edit"
                className="h-14 mx-4 hover:bg-gray-100 transition-all ease-in-out rounded  flex items-center px-4 cursor-pointer"
            >
                <img
                    className="mr-4 w-10 h-10 object-cover rounded-full"
                    src={
                        user?.avatarUrl !== "" || user?.avatarUrl
                            ? `${API_URL}${user?.avatarUrl}`
                            : defaultAvatar
                    }
                    alt="Аватар"
                />
                <p className="font-sans font-medium  text-slate-700">{user?.name}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-auto"
                    onClick={() => {
                        localStorage.clear();
                        dispatch(clearUser());
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                </svg>
            </Link>
        </div>
    );
};

export default Navbar;
