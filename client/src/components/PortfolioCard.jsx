import { Link } from "react-router-dom";

export default function PortfolioCard({ portfolio }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={portfolio.images?.[0] || "https://via.placeholder.com/400x250"}
        alt={portfolio.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {portfolio.category}
        </span>
        <h3 className="text-lg font-bold mt-2">{portfolio.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{portfolio.description}</p>
        <p className="text-xs text-gray-500 mt-2">By {portfolio.designer?.name}</p>
        <Link to={`/portfolio/${portfolio._id}`} className="text-blue-600 text-sm mt-2 inline-block">
          View details
        </Link>
      </div>
    </div>
  );
}
