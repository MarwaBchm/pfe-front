import React, { useState, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    image: "/icons/not-selected/home.png",
    selectedImage: "/icons/selected/home.png",
    path: "/dashboard/home",
  },
  {
    id: 2,
    label: "Users Management",
    image: "/icons/not-selected/users-management.png",
    selectedImage: "/icons/selected/users-management.png",
    path: "/dashboard/usersManagement",
  },
  {
    id: 3,
    label: "Subjects Management",
    image: "/icons/not-selected/propose.png",
    selectedImage: "/icons/selected/propose.png",
    path: "/dashboard/subjectsManagement",
  },
  {
    id: 4,
    label: "Wish List",
    image: "/icons/not-selected/list.png",
    selectedImage: "/icons/selected/list.png",
    path: "/dashboard/wishList",
  },
  {
    id: 5,
    label: "Deadlines",
    image: "/icons/not-selected/defense.png",
    selectedImage: "/icons/selected/defense.png",
    path: "/dashboard/deadlines",
  },
  {
    id: 6,
    label: "Defense Schedule",
    image: "/icons/not-selected/project.png",
    selectedImage: "/icons/selected/project.png",
    path: "/dashboard/defenseSchedule",
  },
  {
    id: 7,
    label: "Emails",
    image: "/icons/not-selected/email.png",
    selectedImage: "/icons/selected/email.png",
    path: "/dashboard/emails",
  },
  {
    id: 8,
    label: "Settings",
    image: "/icons/not-selected/settings.png",
    selectedImage: "/icons/selected/settings.png",
    path: "/dashboard/settings",
  },
  {
    id: 9,
    label: "Sign Out",
    image: "/icons/not-selected/logout.png",
    selectedImage: "/icons/selected/logout.png",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(1);
  const [signingOut, setSigningOut] = useState(false); // Track signing out state
  const indicatorRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const currentPath = location.pathname;
    const activeItem = sidebarItems.find((item) => item.path === currentPath);
    if (activeItem) {
      setActiveItem(activeItem.id);
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    const updateIndicatorPosition = () => {
      const activeLink = document.querySelector(`.sidebar-item-${activeItem}`);
      const sidebarContainer = document.querySelector(".sidebar-container");

      if (activeLink && indicatorRef.current && sidebarContainer) {
        const sidebarTop = sidebarContainer.offsetTop;
        const { offsetTop, offsetHeight } = activeLink;

        const topPosition = offsetTop - sidebarTop + (isOpen ? 0 : 5);
        const indicatorHeight = offsetHeight;

        indicatorRef.current.style.top = `${topPosition}px`;
        indicatorRef.current.style.height = `${indicatorHeight}px`;
      }
    };

    updateIndicatorPosition();
    window.addEventListener("resize", updateIndicatorPosition);
    return () => window.removeEventListener("resize", updateIndicatorPosition);
  }, [activeItem, isOpen]);

  const handleLogout = async () => {
    try {
      // Set signingOut to true immediately to update the UI
      setSigningOut(true);

      // Get the authToken from cookies
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        throw new Error("No auth token found");
      }

      // Send logout request with the authToken in the Authorization header
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send the token in the Authorization header
          },
        }
      );

      // Remove the authToken and user cookies after the logout request is successful
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("user", { path: "/" });

      // Redirect to login page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert(error.response?.data.message || "Logout failed. Please try again.");
    } finally {
      // Reset signingOut state after the process is complete
      setSigningOut(false);
    }
  };

  return (
    <div className="flex h-full">
      <div
        className={`sidebar-container bg-white pt-2 shadow-lg h-full transition-all duration-500 overflow-y-auto ${
          isOpen ? "w-48 sm:w-48 lg:w-60" : "w-16"
        }`}
      >
        <div className="py-2 relative">
          <div
            ref={indicatorRef}
            className="absolute right-0 w-1 bg-blue-4 rounded-md transition-all duration-500"
          ></div>

          <div
            className={`text-2xl font-NovaFlat flex flex-row items-center gap-2 lg:pl-4 pb-4 border-b border-gray-300 border-opacity-30`}
          >
            <button
              className="lg:hidden mb-4 p-2 text-black rounded-md focus:outline-none"
              onClick={toggleSidebar}
            >
              {!isOpen && (
                <img
                  src="/icons/not-selected/menu-closed.png"
                  className="h-5"
                />
              )}
              {isOpen && (
                <img src="/icons/selected/menu-opened.png" className="h-5" />
              )}
            </button>
            <img src="/logo.png" className="h-12" alt="Logo" />
            <h1 className={`sm:text-xl lg:text-2xl ${isOpen ? "" : "hidden"}`}>
              GradMastery
            </h1>
          </div>

          <nav className="space-y-2 mt-4">
            {sidebarItems.map((item) =>
              item.label === "Sign Out" ? (
                <div
                  key={item.id}
                  onClick={handleLogout}
                  className={`sidebar-item-${item.id} relative flex flex-row items-center py-2 px-3 mx-2 cursor-pointer rounded hover:bg-blue-300`}
                >
                  <img
                    src={
                      activeItem === item.id ? item.selectedImage : item.image
                    }
                    alt={item.label}
                    className="w-6 h-6 mr-3"
                  />
                  <span
                    className={`${isOpen ? "block" : "hidden"} text-sm ${
                      activeItem === item.id
                        ? "text-blue-2 font-medium"
                        : "text-gray-1 font-normal"
                    }`}
                  >
                    {signingOut ? "Signing out..." : item.label}{" "}
                    {/* Update label */}
                  </span>
                </div>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveItem(item.id)}
                  className={`sidebar-item-${item.id} relative flex flex-row items-center py-2 px-3 mx-2 cursor-pointer rounded hover:bg-blue-50`}
                >
                  <img
                    src={
                      activeItem === item.id ? item.selectedImage : item.image
                    }
                    alt={item.label}
                    className="w-6 h-6 mr-3"
                  />
                  <span
                    className={`${isOpen ? "block" : "hidden"} text-sm ${
                      activeItem === item.id
                        ? "text-blue-2 font-medium"
                        : "text-gray-1 font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
