import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function PortfolioDetail() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    API.get(`/portfolios/${id}`).then(({ data }) => setPortfolio(data));
  }, [id]);

  if (!portfolio) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{portfolio.title}</h1>
      <p className="text-gray-500 mt-1">
        By {portfolio.designer?.name} | {portfolio.category} | {portfolio.style}
      </p>
      <p className="mt-4">{portfolio.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {portfolio.images.map((img, i) => (
          <img key={i} src={img} alt="" className="rounded-xl w-full object-cover" />
        ))}
      </div>
    </div>
  );
}
