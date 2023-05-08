import Post from "../../components/post/post";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useEffect } from "react";
import { getFriendPosts } from "../../services/slices/posts";
import { TRootState } from "../../services/store";
import { FC } from "react";

const getPosts = (store: TRootState) => store.postsReducer.peoplePosts;

const MainPage: FC = () => {
    const peoplePosts = useTypedSelector(getPosts);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getFriendPosts());
    }, []);

    if (peoplePosts.length === 0) {
        return (
            <div className="py-4 px-4">
                <h1 className="text-center font-sans text-slate-700 font-semibold text-3xl mb-4">Статьи</h1>
                <p className="font-sans font-medium  text-slate-700 text-center">
                    Ваши друзья пока не выкладывали статьи
                </p>
            </div>
        );
    }

    return (
        <div className="py-4 px-4">
            <h1 className="text-center font-sans text-slate-700 font-semibold text-3xl mb-4">Статьи</h1>
            <ul className="overflow-auto max-h-[700px] ">
                {peoplePosts.map((post) => {
                    return (
                        <li className="mb-4" key={post._id}>
                            <Post
                                _id={post._id}
                                title={post.title}
                                desc={post.desc}
                                user={post.user}
                                image={post.imageUrl}
                                likes={post.likes}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MainPage;
