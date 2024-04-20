const isNews = (news) => {
    return news.data.map((data, i) => {
            return <div key={i} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={
                            data.image ||
                            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        }
                        alt={data.title}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.content}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">
                            {data.category}
                        </div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
    })
}
const noNews = () => {
    return <><div> Data Belum Tersedia </div></>
};
const NewsList = ({ news }) => {
    return !news ? noNews : isNews(news)
};
export default NewsList;


