import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../../pages/register-page/register-page";
import LoginPage from "../../pages/login-page/login-page";
import Base from "../base/base";
import MainPage from "../../pages/main-page/main-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import CreatePostPage from "../../pages/create-post-page/create-post-page";
import EditProfilePage from "../../pages/edit-profile-page/edit-profile-page";
import PeoplePage from "../../pages/people-page/people-page";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { getMe } from "../../services/slices/user";
import ProtectedRoute from "../protected-route/protected-route";
import FullPostPage from "../../pages/full-post-page/full-post-page";

const App: FC = () => {
    const dispatch = useTypedDispatch();

    React.useEffect(() => {
        dispatch(getMe());
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute anonymous={false} element={<Base />} />}>
                <Route index element={<MainPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/edit" element={<EditProfilePage />} />
                <Route path="create-post" element={<CreatePostPage />} />
                <Route path="people" element={<PeoplePage />} />
                <Route path="people/:_id" element={<ProfilePage />} />
                <Route path="create-post" element={<CreatePostPage />} />
                <Route path="post/:_id" element={<FullPostPage />} />
                <Route path="post/edit/:_id" element={<CreatePostPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};

export default App;
