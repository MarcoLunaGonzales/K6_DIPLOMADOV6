import http from "k6/http";
import execution from "k6/execution";
import { check } from "k6";

export const options = {
  stages: [
    { target: 1, duration: "1s" },   
  ],
};

export function setup() {
  const loginUrl = "https://dummyjson.com/auth/login";
  const payload = JSON.stringify({
    username: "emilys",
    password: "emilyspass",
    expiresInMins: 30, // optional
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(loginUrl, payload, params);

  check(res, { "login successful": (r) => r.status === 200 });

  console.log(`Login response: ${res.json("token")}`);

  return { token: res.json("token") };
}

