import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = { title, content, category };
        router.post(`/news/update/${props.myNews.id}`, data);
        setTitle("");
        setContent("");
        setCategory("");
    };
    console.log(props);
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 text-slate-900">
                        <input
                            type="text"
                            placeholder="Tilte"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(title) => setTitle(title.target.value)}
                            defaultValue={props.myNews.title}
                        />
                        <input
                            type="text"
                            placeholder="Content"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(content) =>
                                setContent(content.target.value)
                            }
                            defaultValue={props.myNews.content}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            defaultValue={props.myNews.category}
                        />
                        <button
                            className="btn btn-success m-2"
                            onClick={() => handleSubmit()}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
