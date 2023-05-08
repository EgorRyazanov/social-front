import { FC, useEffect, useState } from "react";
import defaultImage from "../../assets/default-avatar.jpg";
import ProfilePosts from "../../components/profile-posts/profile-posts";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { useParams } from "react-router-dom";
import $api, { API_URL } from "../../services/axios";
import { TUser, addFriend, deleteFriend } from "../../services/slices/user";
import { Link } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { getUserPosts } from "../../services/slices/posts";

const getUser = (store: TRootState) => store.userReducer.user;
const getProfilePosts = (store: TRootState) => store.postsReducer.userPosts;

const getPerson = async (_id: string) => {
    return $api.post<TUser>("/user", { _id: _id });
};

const ProfilePage: FC = () => {
    const user = useTypedSelector(getUser);
    const { _id } = useParams();
    const [person, setPerson] = useState<TUser | null>(null);
    const dispatch = useTypedDispatch();
    const posts = useTypedSelector(getProfilePosts);

    useEffect(() => {
        if (_id) {
            getPerson(_id).then((res) => setPerson(res.data));
            dispatch(getUserPosts({ _id }));
        } else {
            dispatch(getUserPosts({ _id: user?._id as string }));
            setPerson(user);
        }
    }, [_id]);

    const isFriend =
        user?.friends.filter((friend) => friend._id === _id) &&
        user?.friends.filter((friend) => friend._id === _id).length === 1;
    const isOutgoing =
        user?.outgoing.filter((friend) => friend._id === _id) &&
        user?.outgoing.filter((friend) => friend._id === _id).length === 1;
    const isRequest =
        user?.requests.filter((friend) => friend._id === _id) &&
        user?.requests.filter((friend) => friend._id === _id).length === 1;

    return (
        person && (
            <div>
                <div className="flex p-4 border-b-2">
                    <img
                        src={
                            person?.avatarUrl !== ""
                                ? `${API_URL}${person?.avatarUrl}`
                                : defaultImage
                        }
                        alt="Аватар"
                        className="w-2/5 h-[250px] object-cover rounded-xl"
                    />
                    <div className="w-3/5 p-4">
                        <p className="font-sans font-medium  text-slate-700">{`Имя: ${person?.name}`}</p>
                        <p className="font-sans font-medium  text-slate-700">{`Фамилия: ${person?.secondName}`}</p>
                        <p className="font-sans font-medium  text-slate-700">
                            {" "}
                            {person?.age !== 0 ? `Возраст: ${person?.age}` : null}
                        </p>
                        <p className="font-sans font-medium  text-slate-700">
                            {person?.university !== "" ? `Университет: ${person?.university}` : null}
                        </p>
                    </div>

                    {isFriend && (
                        <button
                            onClick={(e) => {
                                e.preventDefault;
                                dispatch(deleteFriend({ _id: _id as string }));
                            }}
                            className="flex w-1/5 h-2/5 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Удалить из друзей
                        </button>
                    )}
                    {isRequest && (
                        <div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault;
                                    dispatch(addFriend({ _id: _id as string }));
                                }}
                                className="flex w-[240px] h-2/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Принять заявку
                            </button>
                        </div>
                    )}
                    {!isRequest && !isFriend && !isOutgoing && (
                        <button
                            onClick={(e) => {
                                e.preventDefault;
                                dispatch(addFriend({ _id: _id as string }));
                            }}
                            className="flex w-1/5 h-2/5  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Оставить заявку
                        </button>
                    )}
                </div>
                <div className="p-4 flex items-center flex-col">
                    {!_id && (
                        <Link
                            to="/create-post"
                            className="flex  w-2/5 justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Написать статью
                        </Link>
                    )}
                    <ul className="overflow-auto w-full max-h-[400px] ">
                        {posts.map((post) => {
                            return (
                                <li className="mb-4 w-full" key={post._id}>
                                    <ProfilePosts
                                        likes={post.likes}
                                        _id={post._id}
                                        title={post.title}
                                        desc={post.desc}
                                        user={post.user}
                                        image={post.imageUrl}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default ProfilePage;
