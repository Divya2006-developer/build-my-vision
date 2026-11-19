import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PortfolioCard from "../components/PortfolioCard";

export default function DesignerDashboard() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolios = async () => {
    const { data } = await API.get(`/portfolios?designer=${user._id}`);
    setPortfolios(data);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio?")) return;
    await API.delete(`/portfolios/${id}`);
    fetchPortfolios();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Portfolios</h1>
        <Link to="/designer/create-portfolio" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Portfolio
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolios.map((p) => (
          <div key={p._id}>
            <PortfolioCard portfolio={p} />
            <button onClick={() => handleDelete(p._id)} className="mt-2 text-red-500 text-sm">
              Delete
            </button>
          </div>
        ))}
      </div>
      {portfolios.length === 0 && <p className="text-gray-500">No portfolios yet.</p>}
    </div>
  );
}
