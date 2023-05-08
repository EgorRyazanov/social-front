import { FC, useRef } from "react";
import defaultImage from "../../assets/default-avatar.jpg";
import { useForm } from "../../hooks/useForm";
import $api from "../../services/axios";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TRootState } from "../../services/store";
import { TUpdateUser, update } from "../../services/slices/user";

const getUser = (store: TRootState) => store.userReducer.user;

const EditProfilePage: FC = () => {
    const dispatch = useTypedDispatch();
    const user = useTypedSelector(getUser);

    const { values, handleChange, setValues } = useForm<TUpdateUser>({
        avatarUrl: user?.avatarUrl || "",
        name: user?.name || "",
        secondName: user?.secondName || "",
        university: user?.university || "",
        age: user?.age || 0,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                formData.append("image", file);
                const { data } = await $api.post<{ url: string }>("/upload", formData);
                setValues({ ...values, avatarUrl: data.url });
            }
        } catch {
            console.warn("Произошла ошибка");
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        dispatch(update(values));
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col p-4 items-center">
            <div className="flex mb-4">
                <div className="w-1/5">
                    <img
                        src={values.avatarUrl !== "" ? `http://127.0.0.1:3001${values.avatarUrl}` : defaultImage}
                        className="mb-4 rounded-lg"
                        alt="загруженная картинка"
                    />
                    <div className="flex flex-col items-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                inputRef.current?.click();
                            }}
                            className="flex w-full mb-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Загрузить картинку
                        </button>
                        <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
                        {values.avatarUrl && (
                            <button
                                onClick={() => setValues({ ...values, avatarUrl: user?.avatarUrl || "" })}
                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Удалить
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-3/5 p-4 flex flex-col">
                    <div className="flex flex-col w-3/5 border-b-2">
                        <label htmlFor="name">Имя:</label>
                        <input
                            name="name"
                            className="font-sans font-medium  text-slate-700"
                            placeholder="Введите Имя    "
                            value={values.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-3/5 border-b-2">
                        <label htmlFor="name">Фамилия:</label>
                        <input
                            className="font-sans font-medium  text-slate-700"
                            placeholder="Введите Фамилию"
                            value={values.secondName}
                            onChange={handleChange}
                            name="secondName"
                        />
                    </div>
                    <div className="flex flex-col w-3/5 border-b-2">
                        <label htmlFor="name">Возраст:</label>
                        <input
                            className="font-sans font-medium  text-slate-700"
                            placeholder="Введите Возраст"
                            value={values.age}
                            onChange={handleChange}
                            name="age"
                        />
                    </div>
                    <div className="flex flex-col w-3/5 border-b-2">
                        <label htmlFor="name">Университет:</label>
                        <input
                            className="font-sans font-medium  text-slate-700"
                            placeholder="Введите Университет"
                            value={values.university}
                            onChange={handleChange}
                            name="university"
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="flex w-1/5 mb-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Сохранить
            </button>
        </form>
    );
};

export default EditProfilePage;
