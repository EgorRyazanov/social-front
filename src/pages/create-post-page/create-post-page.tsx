import React, { useRef, FC } from "react";
import SimpleMDE from "react-simplemde-editor";
import { Link, useParams } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import $api from "../../services/axios";
import { useForm } from "../../hooks/useForm";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { TPost, create, updatePost } from "../../services/slices/posts";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";

type TForm = {
    imageUrl: string;
    title: string;
    desc: string;
    text: string;
};

const getPosts = (store: TRootState) => store.postsReducer.userPosts;

const CreatePostPage: FC = () => {
    const { _id } = useParams();
    const posts = useTypedSelector(getPosts);
    let post: undefined | TPost;
    if (_id) {
        post = posts.find((element) => element._id === _id);
    }
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { values, handleChange, setValues } = useForm<TForm>({
        imageUrl: post?.imageUrl || "",
        title: post?.title || "",
        desc: post?.desc || "",
        text: post?.text || "",
    });

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                formData.append("image", file);
                const { data } = await $api.post<{ url: string }>("/upload", formData);
                setValues({ ...values, imageUrl: data.url });
            }
        } catch {
            console.warn("Произошла ошибка");
        }
    };

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "400px",
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (_id) {
            dispatch(updatePost({ ...values, _id: _id }));
        } else {
            dispatch(create(values));
        }
        navigate("/profile", { replace: true });
    };

    return (
        <div className="p-4">
            {values.imageUrl !== "" && (
                <img
                    src={`http://127.0.0.1:3001${values.imageUrl}`}
                    className="mb-4 rounded-lg h-[400px]"
                    alt="загруженная картинка"
                />
            )}
            <div className="flex flex-col items-center">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        inputRef.current?.click();
                    }}
                    className="flex w-2/5 mb-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Загрузить картинку
                </button>
                <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
                {values.imageUrl && (
                    <button
                        onClick={() => setValues({ ...values, imageUrl: "" })}
                        className="flex w-2/5 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Удалить
                    </button>
                )}
            </div>
            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    className="mb-4 focus:outline-none text-3xl font-medium"
                    placeholder="Введите название"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                />
                <input
                    type="text"
                    className="mb-4 focus:outline-none text-xl font-thin"
                    placeholder="Введите описание"
                    name="desc"
                    onChange={handleChange}
                    value={values.desc}
                />
            </div>
            <SimpleMDE
                value={values.text}
                onChange={(e) => setValues({ ...values, text: e })}
                options={options as EasyMDE.Options}
            />
            <div className="flex mt-4">
                <button
                    onClick={onSubmit}
                    className="flex w-1/5 mr-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {_id ? "Редактировать" : "Опубликовать"}
                </button>
                <Link
                    to="/profile"
                    className="flex w-1/5 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <button>Отмена</button>
                </Link>
            </div>
        </div>
    );
};

export default CreatePostPage;
