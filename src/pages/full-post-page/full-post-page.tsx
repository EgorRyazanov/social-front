import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TPost } from "../../services/slices/posts";

const getUserPosts = (store: TRootState) => store.postsReducer.userPosts;
const getAllPosts = (store: TRootState) => store.postsReducer.peoplePosts;

const FullPostPage: FC = () => {
    const { _id } = useParams();
    const userPosts = useTypedSelector(getUserPosts);
    const allPosts = useTypedSelector(getAllPosts);
    let currentPost: TPost | undefined;
    if (userPosts.find((post) => post._id === _id)) {
        currentPost = userPosts.find((post) => post._id === _id);
    } else {
        currentPost = allPosts.find((post) => post._id === _id);
    }

    if (!currentPost) {
        return <p className="ml-4 absolute top-50 left-100 font-medium text-2xl">Загрузка...</p>;
    }

    return (
        currentPost && (
            <div className="p-4">
                {currentPost.imageUrl !== "" && (
                    <img
                        src={`https://social-back-vku9.vercel.app${currentPost.imageUrl}`}
                        className="max-h-[800px] max-w-[1200px] rounded-lg mb-4"
                        alt="Картинка"
                    />
                )}
                <h1 className="font-sans font-medium text-3xl text-center mb-4">{currentPost.title}</h1>
                <h2 className="font-sans font-thin text-2xl mb-2 border-b-2">{`Описание: ${currentPost.desc}`}</h2>
                <ReactMarkdown>{currentPost.text}</ReactMarkdown>
            </div>
        )
    );
};

export default FullPostPage;
