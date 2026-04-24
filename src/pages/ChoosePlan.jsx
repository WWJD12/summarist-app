import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ChoosePlan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // short fake load

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (plan) => {
    alert(`You selected the ${plan} plan!`);
    navigate("/for-you");
  };

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 animate-pulse">
        <div className="h-8 bg-gray-300 w-64 mb-8 rounded"></div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border p-6 rounded-lg shadow w-72">
              <div className="h-5 bg-gray-300 mb-3 rounded"></div>
              <div className="h-8 bg-gray-300 mb-4 rounded"></div>

              <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>

              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border p-6 rounded-lg shadow w-72 text-center">
          <h2 className="text-xl font-semibold mb-2">Monthly</h2>

          <p className="text-3xl font-bold mb-4">
            $9<span className="text-sm">/mo</span>
          </p>

          <ul className="text-sm text-gray-600 mb-6 space-y-1">
            <li>✔ Unlimited reading</li>
            <li>✔ Unlimited listening</li>
            <li>✔ Cancel anytime</li>
          </ul>

          <button
            onClick={() => handleSelect("monthly")}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Choose Monthly
          </button>
        </div>

        <div className="border p-6 rounded-lg shadow w-72 text-center relative">
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
            Best Value
          </span>

          <h2 className="text-xl font-semibold mb-2">Yearly</h2>

          <p className="text-3xl font-bold mb-4">
            $79<span className="text-sm">/yr</span>
          </p>

          <ul className="text-sm text-gray-600 mb-6 space-y-1">
            <li>✔ Everything in Monthly</li>
            <li>✔ Save 25%</li>
            <li>✔ 7-day free trial</li>
          </ul>

          <button
            onClick={() => handleSelect("yearly")}
            className="bg-purple-500 text-white px-4 py-2 rounded w-full"
          >
            Choose Yearly
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChoosePlan;