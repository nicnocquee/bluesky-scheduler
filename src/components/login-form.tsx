import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";
import { toast } from "sonner";
import { BlueSkyFlutter } from "./bluesky-flutter";
import { login } from "@/lib/bluesky";

export function LoginForm({
  onSuccess,
}: {
  onSuccess: (identifier: string) => void;
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(identifier, password);
      toast.success("Successfully logged in!");
      onSuccess(identifier);
    } catch (error: unknown) {
      console.log(error);
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-8 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="space-y-2 text-center text-muted-foreground">
        <h1 className="text-4xl font-bold text-black">
          Bluesky Later{" "}
          {import.meta.env.VITE_STORAGE_MODE !== "remote"
            ? "Browser Mode"
            : "Self Hosted Mode"}
        </h1>
        <p>A simple web app to schedule posts on Bluesky</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Login to Bluesky
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Handle or Email
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="handle.bsky.social"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <p className="text-gray-500 mt-4">
              You can create a{" "}
              <a
                className="underline"
                href="https://bsky.app/settings/app-passwords"
                target="_blank"
              >
                new app password here
              </a>
              .{" "}
              {import.meta.env.VITE_STORAGE_MODE !== "remote"
                ? "Your credentials will be saved in this browser's IndexedDB."
                : "Your credentials will be saved in the PostgreSQL database that is used by the API server."}
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div className="flex flex-col space-y-2 items-center">
        <BlueSkyFlutter
          href="https://bsky.app/profile/nico.fyi"
          text="Made by @nico.fyi"
          className="text-blue-600"
        />
        <a
          href="https://github.com/nicnocquee/bluesky-later"
          target="_blank"
          className="underline text-muted-foreground"
        >
          Source code
        </a>
      </div>
    </div>
  );
}
