import { useEffect, FC, useState } from "react";
import defaultImage from "../../assets/default-avatar.jpg";
import "./people.page.css";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { getPeople } from "../../services/slices/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { Link } from "react-router-dom";
import { deleteFriend, addFriend } from "../../services/slices/user";

enum Status {
    Friends,
    Outgoings,
    All,
    Requests,
}

const getPeopleFromStore = (store: TRootState) => store.userReducer.people;
const getUser = (store: TRootState) => store.userReducer.user;

const PeoplePage: FC = () => {
    const dispatch = useTypedDispatch();
    const people = useTypedSelector(getPeopleFromStore);
    const user = useTypedSelector(getUser);
    useEffect(() => {
        dispatch(getPeople());
    }, []);

    const [toggleState, setToggleState] = useState<Status>(Status.All);

    const toggleTab = (index: number) => {
        setToggleState(index);
    };
    return (
        <div className="p-4">
            <div className="bloc-tabs mb-4">
                <button
                    className={toggleState === Status.All ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(Status.All)}
                >
                    Все люди
                </button>
                <button
                    className={toggleState === Status.Friends ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(Status.Friends)}
                >
                    Друзья
                </button>
                <button
                    className={toggleState === Status.Requests ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(Status.Requests)}
                >
                    Входящие
                </button>
                <button
                    className={toggleState === Status.Outgoings ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(Status.Outgoings)}
                >
                    Исходящие
                </button>
            </div>
            {toggleState == Status.All &&
                people.map((element) => {
                    const _id = element._id;
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
                        user?._id !== _id && (
                            <div className="flex items-center">
                                <Link
                                    key={element._id}
                                    to={`${_id}`}
                                    className="rounded-lg mr-10 bg-slate-100 min-h-[150px] w-3/5 mb-4 flex items-center p-4"
                                >
                                    <img
                                        src={
                                            element.avatarUrl !== ""
                                                ? `https://social-back-vku9.vercel.app${element.avatarUrl}`
                                                : defaultImage
                                        }
                                        alt="Аватарка"
                                        className="h-[120px] w-[220px] rounded-lg object-cover mr-4"
                                    />
                                    <div className="mr-4">
                                        <p className="font-sans font-medium">{element.name}</p>
                                        <p className="font-sans font-medium">{element.secondName}</p>
                                    </div>
                                </Link>
                                {isFriend && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault;
                                            dispatch(deleteFriend({ _id: element._id }));
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
                                                dispatch(addFriend({ _id: element._id }));
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
                                            dispatch(addFriend({ _id: element._id }));
                                        }}
                                        className="flex w-1/5 h-2/5  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Оставить заявку
                                    </button>
                                )}
                            </div>
                        )
                    );
                })}
            {toggleState == Status.Friends &&
                user?.friends.map((element) => {
                    return (
                        user?._id !== element._id && (
                            <div className="flex items-center">
                                <Link
                                    key={element._id}
                                    to={`${element._id}`}
                                    className="rounded-lg mr-8 bg-slate-100 min-h-[150px] w-3/5 mb-4 flex items-center p-4"
                                >
                                    <img
                                        src={
                                            element.avatarUrl !== ""
                                                ? `https://social-back-vku9.vercel.app${element.avatarUrl}`
                                                : defaultImage
                                        }
                                        alt="Аватарка"
                                        className="h-[120px] w-[220px] rounded-lg object-cover mr-4"
                                    />
                                    <div className="mr-4">
                                        <p className="font-sans font-medium">{element.name}</p>
                                        <p className="font-sans font-medium">{element.secondName}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault;
                                        dispatch(deleteFriend({ _id: element._id }));
                                    }}
                                    className="flex w-1/5 h-2/5 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Удалить из друзей
                                </button>
                            </div>
                        )
                    );
                })}
            {toggleState == Status.Outgoings &&
                user?.outgoing.map((element) => {
                    return (
                        user?._id !== element._id && (
                            <div className="flex items-center">
                                <Link
                                    key={element._id}
                                    to={`${element._id}`}
                                    className="rounded-lg mr-8 bg-slate-100 min-h-[150px] w-3/5 mb-4 flex items-center p-4"
                                >
                                    <img
                                        src={
                                            element.avatarUrl !== ""
                                                ? `https://social-back-vku9.vercel.app${element.avatarUrl}`
                                                : defaultImage
                                        }
                                        alt="Аватарка"
                                        className="h-[120px] w-[220px]  rounded-lg object-cover mr-4"
                                    />
                                    <div className="mr-4">
                                        <p className="font-sans font-medium">{element.name}</p>
                                        <p className="font-sans font-medium">{element.secondName}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    );
                })}
            {toggleState == Status.Requests &&
                user?.requests.map((element) => {
                    return (
                        user?._id !== element._id && (
                            <div className="flex items-center">
                                <Link
                                    key={element._id}
                                    to={`${element._id}`}
                                    className="rounded-lg bg-slate-100 min-h-[150px] mr-8 w-3/5 mb-4 flex items-center p-4"
                                >
                                    <img
                                        src={
                                            element.avatarUrl !== ""
                                                ? `https://social-back-vku9.vercel.app${element.avatarUrl}`
                                                : defaultImage
                                        }
                                        alt="Аватарка"
                                        className="h-[120px] w-[220px] rounded-lg object-cover mr-4"
                                    />
                                    <div className="mr-4">
                                        <p className="font-sans font-medium">{element.name}</p>
                                        <p className="font-sans font-medium">{element.secondName}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault;
                                        dispatch(addFriend({ _id: element._id }));
                                    }}
                                    className="flex w-1/5 h-2/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Принять заявку
                                </button>
                            </div>
                        )
                    );
                })}
        </div>
    );
};

export default PeoplePage;
