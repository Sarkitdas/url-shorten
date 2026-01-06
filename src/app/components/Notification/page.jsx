"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PremiumSubscriptionPage() {
  const [urlsCount, setUrlsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
  async function fetchUrls() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
        cache: "no-store",
      });
      const data = await res.json();

      // Adjust this according to your API structure
      const urlsArray = Array.isArray(data.urls) ? data.urls : [];
      setUrlsCount(urlsArray.length);

      if (urlsArray.length >= 100) {
        console.log("🎉 User reached 100 URLs!");
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  }

  fetchUrls();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-4">Premium Subscription</h1>
        <p className="text-lg mb-6">
          Unlock unlimited URLs, priority support, and premium features.  
          You currently have <span className="font-bold">{urlsCount}</span> URLs.
          <span className="block mt-2 text-sm text-white/80">Maximum 100 URLs for Free!</span>
        </p>

        {urlsCount >= 5 && (
          <div className="bg-yellow-300 text-black font-bold p-3 rounded mb-6 animate-pulse">
            🎉 You have reached the maximum of 100 URLs!
          </div>
        )}

        <button
          onClick={() => router.push("/components/Subscription")}
          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Go to Premium Page
        </button>

        <p className="mt-4 text-sm text-white/80">
          Upgrade to premium to remove all limitations and get extra features.
        </p>
      </div>
    </div>
  );
}
