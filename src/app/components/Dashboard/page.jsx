"use client";

import React, { useEffect, useState } from "react";


export default function DashboardPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); 
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null); // track expanded URL row

  // Toast helper
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Fetch URLs
  async function fetchUrls() {
    setLoading(true);
    try {
      const res = await fetch("/api/urls", { cache: "no-store" });
      const data = await res.json();
      setUrls(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
      showToast("Failed to fetch URLs", "error");
      setUrls([]);
    } finally {
      setLoading(false);
    }
  }

  // Delete URL
  async function handleDelete(shortCode) {
    try {
      const res = await fetch("/api/urls", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUrls();
        showToast("URL deleted successfully", "success");
      } else {
        showToast(data.error || "Failed to delete URL", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete URL", "error");
    }
  }

  function confirmDeleteClick(shortCode) {
    setConfirmDelete({ shortCode });
  }

  function handleConfirm(answer) {
    if (answer === "yes" && confirmDelete) {
      handleDelete(confirmDelete.shortCode);
    }
    setConfirmDelete(null);
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex justify-center items-start relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-t-blue-400 border-r-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="w-full max-w-6xl glass-card p-6 rounded-2xl shadow-lg relative">
        <h1 className="text-xl font-bold mb-6 text-white text-center">
          My URLs
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-white/20 backdrop-blur-md">
                <th className="p-3 border border-white/30">Long URL</th>
                <th className="p-3 border border-white/30">Short URL</th>
                <th className="p-3 border border-white/30">Created Time</th>
                <th className="p-3 border border-white/30">Visitors</th>
                <th className="p-3 border border-white/30">Delete</th>
              </tr>
            </thead>
            <tbody>
              {urls.length > 0 ? (
                urls.map((url) => (
                  <React.Fragment key={url.shortCode}>
                    <tr
                      className="hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === url.shortCode ? null : url.shortCode
                        )
                      }
                    >
                      <td className="p-2 border border-white/20 break-all">
                        {url.longUrl.length > 50
                          ? url.longUrl.slice(0, 50) + "..."
                          : url.longUrl}
                      </td>
                      <td className="p-2 border border-white/20">
                        <a
                          href={`/shorten/${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-200 underline break-all"
                        >
                          {window.location.origin}/shorten/{url.shortCode}
                        </a>
                      </td>
                      <td className="p-2 border border-white/20">
                        {new Date(url.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2 border border-white/20">{url.clicks}</td>
                      <td className="p-2 border border-white/20 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click
                            confirmDeleteClick(url.shortCode);
                          }}
                          className="px-3 py-1 bg-red-500 bg-opacity-70 hover:bg-opacity-90 rounded transition hover:scale-125 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {/* Expandable tooltip / extra info */}
                    {expandedRow === url.shortCode && (
                      <tr>
                        <td
                          colSpan="5"
                          className="bg-white/10 backdrop-blur-md p-4 border border-white/20 text-white/90"
                        >
                          <div className="flex flex-col gap-2">
                            <p>
                              <strong>Full URL:</strong> {url.longUrl}
                            </p>
                            <p>
                              <strong>Short URL:</strong>{" "}
                              {window.location.origin}/shorten/{url.shortCode}
                            </p>
                            <p>
                              <strong>Created At:</strong>{" "}
                              {new Date(url.createdAt).toLocaleString()}
                            </p>
                            <p>
                              <strong>Clicks:</strong> {url.clicks}
                            </p>
                            {/* You can add more details or analytics here */}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-white/70 italic"
                  >
                    No URLs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-4 py-2 rounded shadow-lg text-white font-medium transition-opacity duration-300 ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-80 text-center shadow-lg">
            <p className="text-white text-lg mb-4">
              Are you sure you want to delete this URL?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleConfirm("yes")}
                className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm("no")}
                className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
