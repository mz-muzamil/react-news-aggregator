const NewsCard = ({ singleNews, index }) => {
  return (
    <>
      <div className="flex flex-col" key={index}>
        <figure className="mb-3">
          <img
            className="w-full object-cover"
            style={{ height: "250px" }}
            src={
              singleNews.urlToImage
                ? singleNews.urlToImage
                : "https://via.placeholder.com/150"
            }
            alt={singleNews.title || "Placeholer Poster"}
          />
        </figure>
        <div className="text">
          <h6 className="text-[#ee002d] mb-4 font-bold">{singleNews.author}</h6>
          <h4 className="text-xl font-bold text-slate-900">
            {singleNews.title}
          </h4>
          <p>{singleNews.description || "No description available."}</p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
