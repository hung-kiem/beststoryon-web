import { authApi } from "@/api-client/auth-api";
import * as React from "react";

export default function Login() {
  const login = async () => {
    try {
      // Call login API here
      await authApi.login({ username: "hungnk1", password: "admin123" });
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const getProfile = async () => {
    try {
      // Call get profile API here
      await authApi.getProfile();
    } catch (error) {
      console.error("Failed to get profile", error);
    }
  };

  const logout = async () => {
    try {
      // Call logout API here
      await authApi.logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div>
      <h1>Login page</h1>

      <button onClick={login}>Login</button>
      <button onClick={getProfile}>Get profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
