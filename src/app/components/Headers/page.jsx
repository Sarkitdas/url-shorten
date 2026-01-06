"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [readNotify, setReadNotify] = useState(false);

  const profileRef = useRef(null);
  const prevCountRef = useRef(0); // ✅ track previous URL count

  /* =======================
     🔔 URL COUNT POLLING
     ======================= */
  useEffect(() => {
    if (!isLoggedIn) return;

    let intervalId;

    async function checkUrls() {
      try {
        const res = await fetch("/api/urls");
        const data = await res.json();
        const urlsArray = Array.isArray(data) ? data : [];

        const currentCount = urlsArray.length;
        const prevCount = prevCountRef.current;

        // 🔔 Notify ONLY when crossing 3 URLs
        if (prevCount < 3 && currentCount >= 3) {
          setNotify(true);
          setReadNotify(false);
        }

        prevCountRef.current = currentCount;
      } catch (err) {
        console.error("Failed to fetch URLs:", err);
      }
    }

    checkUrls();
    intervalId = setInterval(checkUrls, 5000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  /* =======================
     🔐 AUTH CHECK
     ======================= */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /* =======================
     👤 CLOSE PROFILE MENU
     ======================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  /* =======================
     🚪 LOGOUT
     ======================= */
  const handleLogout = async () => {
    await fetch("/api/logout");
    setIsLoggedIn(false);
    setMenuOpen(false);
    setNotify(false);
    setReadNotify(false);
    prevCountRef.current = 0;
    router.push("/components/Login");
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
        >
          URL-Shorten
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn && (
            <button
              onClick={() => {
                router.push("/components/Notification");
                setReadNotify(true);
              }}
              className="relative flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              <span className="mr-2">🔔</span>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {notify && !readNotify ? "1" : "0"}
              </span>
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={() => router.push("/components/Dashboard")}
              className="relative group text-gray-700 font-medium cursor-pointer transition-all hover:text-red-600 hover:scale-125"
            >
              Dashboard
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => router.push("/components/Dashboard")}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push("/components/Signup")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow cursor-pointer"
              >
                Signup
              </button>
            </>
          )}

          {isLoggedIn && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                Profile <span className="text-sm">▼</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-xl border overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-4">
          {isLoggedIn && (
            <button
              onClick={() => {
                router.push("/components/Notification");
                setReadNotify(true);
              }}
              className="relative text-2xl"
            >
              🔔
              {notify && !readNotify && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-red-600 text-white rounded-full">
                  1
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          {isLoggedIn && (
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/components/Dashboard");
              }}
              className="block w-full text-left text-gray-700 hover:text-indigo-600"
            >
              Dashboard
            </button>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/components/Login");
                }}
                className="block w-full text-left text-gray-700 hover:text-indigo-600"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/components/Signup");
                }}
                className="block w-full text-left text-indigo-600 font-semibold"
              >
                Signup
              </button>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
