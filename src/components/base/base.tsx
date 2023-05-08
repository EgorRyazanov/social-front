import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const Base: FC = () => {
    return (
        <>
            <main className="mx-auto xl:container flex min-h-screen">
                <aside className="w-1/5">
                    <Navbar />
                </aside>
                <section className="w-4/5">
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default Base;
