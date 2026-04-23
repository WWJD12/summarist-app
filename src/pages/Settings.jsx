import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const subscription = "basic";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <p className="mb-4 text-gray-600">
          Log in to your account to see your details.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-10 px-6 flex items-start md:items-center justify-center">
      <div className="max-w-md md:max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-6">

        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>

        {/* Subscription */}
        <div>
          <h2 className="text-sm text-gray-500 mb-1">
            Your Subscription plan
          </h2>

          <p className="text-lg font-semibold flex items-center gap-2 capitalize">
            {subscription}
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
              Free
            </span>
          </p>

          {subscription === "basic" && (
            <button
              onClick={() => navigate("/choose-plan")}
              className="mt-3 bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg w-full md:w-auto md:px-6"
            >
              Upgrade to Premium
            </button>
          )}
        </div>

        {/* Email */}
        <div className="border-t pt-4">
        <div>
          <h2 className="text-sm text-gray-500 mb-1">Account</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;