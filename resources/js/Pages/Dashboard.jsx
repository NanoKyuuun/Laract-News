import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React,{ useState, useEffect } from 'react';
import { router } from "@inertiajs/react";

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, serIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = { title, content, category };
        router.post('/news', data);
        serIsNotif(true);
        setTitle('');
        setContent('');
        setCategory('');
    }
       useEffect(() => {
           if (props.flash && props.flash.message) {
               serIsNotif(true);
           } else {
               serIsNotif(false);
           }
       }, [props.flash]);
    useEffect(() => {
        if (!props.myNews) {
           router.get("/news"); 
        }
        console.log('props', props);
        return;
    },[])
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
                        {isNotif && (
                            <div role="alert" className="alert alert-success">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Tilte"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Content"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(content) =>
                                setContent(content.target.value)
                            }
                            value={content}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered input-info w-full m-2 bg-slate-100"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-success m-2"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-4">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((data, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card lg:w-full w-96 bg-base-100 shadow-xl mb-4"
                                >
                                    <div className="card-body bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 text-slate-900">
                                        <h2 className="card-title">
                                            {data.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{data.content}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">
                                                {data.category}
                                            </div>
                                            <Link
                                                href={`/news/edit/${data.id}`}
                                                className="badge badge-outline"
                                            >
                                                edit
                                            </Link>
                                            <Link
                                                href={`/news/delete/${data.id}`}
                                                method="post" as='button'
                                                className="badge badge-outline"
                                            >
                                                delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Anda Belum memiliki data</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}