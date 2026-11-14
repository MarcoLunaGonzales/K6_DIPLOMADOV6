import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [{ target: 1, duration: "1s" }],
};

export function setup() {
  const loginUrl = "https://dummyjson.com/auth/login";
  const payload = JSON.stringify({
    username: "emilys",
    password: "emilyspass",
    expiresInMins: 30,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(loginUrl, payload, params);

  const token = res.json("accessToken");
  const loginSucceeded = check(res, {
    "login successful": (r) => r.status === 200,
    "access token received": () => Boolean(token),
  });

  if (!loginSucceeded || !token) {
    throw new Error(`Login failed with HTTP status ${res.status}. Check the credentials and response.`);
  }
  console.log(`Login Satisfactorio. Access token: ${token}`);

  return { token };
}

export default function (data) {
  const authMeUrl = "https://dummyjson.com/auth/me";

  const params = {
    headers: {
      "Authorization": `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };

  const res = http.get(authMeUrl, params);

  check(res, {
    "auth/me successful": (r) => r.status === 200,
  });

  console.log(`Auth me status: ${res.status}`);
}

