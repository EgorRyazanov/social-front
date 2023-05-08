import { FC } from "react";
import defaultImage from "../../assets/default-avatar.jpg";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { likePost } from "../../services/slices/posts";
import $api from "../../services/axios";
import { TRootState } from "../../services/store";
import { Link } from "react-router-dom";
import { TUser } from "../../services/slices/user";

type TPost = {
    _id: string;
    title: string;
    desc: string;
    image: string;
    likes: Array<string>;
    user: TUser;
};

const getMe = (store: TRootState) => store.userReducer.user;

const Post: FC<TPost> = ({ title, desc, image, user, likes, ...props }) => {
    const dispatch = useTypedDispatch();
    const me = useTypedSelector(getMe);
    const _id = user._id;

    const handleLikePost = () => {
        let newLikes = [...likes];
        if (newLikes.filter((element) => element === me?._id).length > 0) {
            newLikes = newLikes.filter((element) => element !== me?._id);
        } else {
            newLikes.push(me?._id as string);
        }
        dispatch(likePost({ _id: props._id, likes: newLikes }));
        $api.post("/like-post", { _id: props._id });
    };

    return (
        <div className="mx-4 bg-slate-100 min-h-[200px] rounded-xl p-4 flex justify-between font-sans">
            {image !== "" ? (
                <img
                    src={`http://localhost:3001${image}`}
                    alt="Картинка"
                    className="w-2/5 h-[200px] object-cover rounded-xl"
                />
            ) : null}
            <div
                className={
                    image !== ""
                        ? `w-3/5 flex flex-col px-4 justify-between`
                        : `w-full flex flex-col px-4 justify-between`
                }
            >
                <div>
                    <h2 className="text-center font-semibold text-xl mb-4">{title}</h2>
                    <p className="font-thin text-md mb-4">{desc}</p>
                </div>
                {user?._id !== me?._id && (
                    <Link
                        to={`/post/${props._id}`}
                        className=" self-end flex  w-[150px] justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Подробнее
                    </Link>
                )}
                <Link
                    to={`/people/${_id}`}
                    className="h-14 mx-4 w-[300px] hover:outline rounded ml-auto flex items-center px-4 cursor-pointer"
                >
                    <img
                        className="mr-4 h-[40px] w-[40px] ml-auto object-cover rounded-full"
                        src={user.avatarUrl !== "" ? `http://localhost:3001${user.avatarUrl}` : defaultImage}
                        alt="Аватар"
                    />
                    <p className="font-sans font-medium  text-slate-700">{`${user.name} ${user.secondName}`}</p>
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                        likes.filter((element) => element === me?._id).length > 0
                            ? "fill-red-700 w-6 h-6 cursor-pointer"
                            : " w-6 h-6 cursor-pointer"
                    }
                    onClick={handleLikePost}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
                <button>{likes.length}</button>
            </div>
        </div>
    );
};

export default Post;
