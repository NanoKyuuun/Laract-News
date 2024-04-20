import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "../Components/Homepage/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";
import Footer from "@/Components/Homepage/Footer";
export default function Home(props) {
    return (
        <>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="container mx-auto my-4 pt-4 px-4 bg-slate-700 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Berita</h1>
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch item-center gap-4 p-4">
                    <NewsList news={props.news} />
                </div>
                <div className="flex justify-center items-center pb-4">
                    <Paginator meta={props.news.meta} />
                </div>
            </div>
            <Footer />
        </>
    );
}