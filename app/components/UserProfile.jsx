import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signOutAction } from "../actions/authAction";

function UserProfile() {
  const route = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({
    user: {
      name: "",
      email: "",
      image: "",
    },
    expires: "2025-11-03T09:45:36.919Z",
  });

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();    

    if (data.error) {
      route.push("/login");
    } else {
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });
    if (res.status === 204) {
      route.push("/login");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {user.user.image ? (
          <Image src={user.user.image} alt={user.user.name} width={500} height={500}/>
        ) : (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {showProfileDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-lg font-medium text-gray-900">
              {user.user.name || "User Name"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.user.email || "user@example.com"}
            </p>
          </div>

          {/* Dropdown Items */}
          <div className="py-1">
            <button
              onClick={() => {
                // Handle profile view/edit
                setShowProfileDropdown(false);
                console.log("View profile clicked");
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              View Profile
            </button>

            <button
              onClick={() => {
                // Handle settings
                setShowProfileDropdown(false);
                console.log("Settings clicked");
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>

          {/* Logout Section */}
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={async () => {
                // Handle logout
                setShowProfileDropdown(false);
                handleLogout();
                await signOutAction()
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
