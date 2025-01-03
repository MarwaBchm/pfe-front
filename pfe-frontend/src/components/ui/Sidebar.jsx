import React, { useState, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for current route tracking
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    label: "Options Management",
    image: "/icons/not-selected/options.png",
    selectedImage: "/icons/selected/options.png",
    path: "/dashboard/optionsManagement",
  },
  {
    id: 9,
    label: "Settings",
    image: "/icons/not-selected/settings.png",
    selectedImage: "/icons/selected/settings.png",
    path: "/dashboard/settings",
  },

  {
    id: 10,
    label: "Sign Out",
    image: "/icons/not-selected/logout.png",
    selectedImage: "/icons/selected/logout.png",
  },
];

const Sidebar = () => {
  const navigate = useNavigate(); // For redirecting after logout
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(1);
  const indicatorRef = useRef(null);
  const location = useLocation(); // Use location to get current route

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Automatically open the sidebar on large screens
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

  // Update active item based on the current route
  useLayoutEffect(() => {
    const currentPath = location.pathname;
    const activeItem = sidebarItems.find((item) => item.path === currentPath);
    if (activeItem) {
      setActiveItem(activeItem.id);
    }
  }, [location.pathname]); // Re-run when the pathname changes

  // Update the position of the indicator
  useLayoutEffect(() => {
    const updateIndicatorPosition = () => {
      const activeLink = document.querySelector(`.sidebar-item-${activeItem}`);
      const sidebarContainer = document.querySelector(".sidebar-container");

      if (activeLink && indicatorRef.current && sidebarContainer) {
        const sidebarTop = sidebarContainer.offsetTop;
        const { offsetTop, offsetHeight } = activeLink;

        // Calculate the top position and height for the indicator
        const topPosition = offsetTop - sidebarTop + (isOpen ? 0 : 5);
        const indicatorHeight = offsetHeight;

        indicatorRef.current.style.top = `${topPosition}px`;
        indicatorRef.current.style.height = `${indicatorHeight}px`;
      }
    };

    updateIndicatorPosition();

    // Re-calculate the position on resize
    window.addEventListener("resize", updateIndicatorPosition);
    return () => window.removeEventListener("resize", updateIndicatorPosition);
  }, [activeItem, isOpen]);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
          withCredentials: true,
        }
      );

      localStorage.removeItem("token"); // Clear the token from localStorage
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`sidebar-container bg-white pt-2 shadow-lg h-full transition-all duration-500 overflow-y-auto ${
          isOpen ? "w-48 sm:w-48 lg:w-60" : "w-16"
        }`}
      >
        {/* Sidebar Content */}
        <div className="py-2 relative">
          {/* Animated Indicator */}
          <div
            ref={indicatorRef}
            className="absolute right-0 w-1 bg-blue-4 rounded-md transition-all duration-500"
          ></div>

          {/* Logo */}
          <div
            className={`text-2xl font-NovaFlat flex flex-row items-center gap-2 lg:pl-4 pb-4 border-b border-gray-300 border-opacity-30`}
          >
            {/* Hamburger Button */}
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

          {/* Navigation */}
          <nav className="space-y-2 mt-4">
            {sidebarItems.map((item) =>
              item.label === "Sign Out" ? (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleLogout}
                  className={`sidebar-item-${
                    item.id
                  } relative flex flex-row items-center py-2 px-3 mx-2 cursor-pointer rounded ${
                    item.isAction
                      ? "text-white hover:bg-red-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {/* Icon */}
                  <img
                    src={
                      activeItem === item.id ? item.selectedImage : item.image
                    }
                    alt={item.label}
                    className="w-6 h-6 mr-3"
                  />
                  {/* Label */}
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
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveItem(item.id)}
                  className={`sidebar-item-${
                    item.id
                  } relative flex flex-row items-center py-2 px-3 mx-2 cursor-pointer rounded ${
                    item.isAction
                      ? "text-white hover:bg-red-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {/* Icon */}
                  <img
                    src={
                      activeItem === item.id ? item.selectedImage : item.image
                    }
                    alt={item.label}
                    className="w-6 h-6 mr-3"
                  />
                  {/* Label */}
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
