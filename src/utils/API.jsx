import { getItem, setItem } from "./LocalStorage";
import { conlog } from "./Utils";

// const remote_api_base = "https://cms-zy42.onrender.com/api/v1";
// const remote_base_url = "https://cms-zy42.onrender.com";

const remote_api_base = "https://meetnmarry.com/api";
const remote_base_url = "https://meetnmarry.com";

const local_api_base = "http://localhost:8000/api/v1";
const local_base_url = "http://localhost:8000";

const is_local = false;

export const api_base = is_local ? local_api_base : remote_api_base;
export const base_url = is_local ? local_base_url : remote_base_url;

export async function Fetch(url, stuff) {
  console.log("FETCH ->", url, stuff);
  const resp = await fetch(url, stuff);
  return resp;
}

export async function clearCache() {
  const d = new Date();
  const ct = d.getTime();
  setItem("lastTime", ct);
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("cache-")) {
      localStorage.removeItem(key);
    }
  }
}

export async function getXCached(path, filter) {
  const key = "cache-" + path + JSON.stringify(filter);
  const data = getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  const res = await getX(path, filter);
  setItem("cache-" + path + JSON.stringify(filter), JSON.stringify(res));
  return res;
}

export function getAuthToken() {
  return "Bearer " + getItem("authToken").replaceAll('"', '');
}

export function parseAuthToken() {
  const token = getAuthToken();
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export function getImageURL(x) {
  if (!x) return "";
  if (x.startsWith("http")) return x;
  if (x.startsWith("data")) return x;
  if (x) return base_url + x;
  return "";
}

export async function fetchX(method, path, post, get = null) {
  console.log("fetchX ->", path, JSON.stringify(get));
  var url = `${api_base}/${path}/?`;
  if (get) {
    url += '/?';
    try {
      Object.keys(get).forEach((x) => {
        url = url + x + "=" + get[x] + "&";
      });
    } catch { }
  }
  var r;
  if (method === "GET")
    r = await Fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        Authorization: getAuthToken(),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  else
    r = await Fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        Authorization: getAuthToken(),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  const j = await r.json();
  return j;
}

export async function getX(path, filter = null) {
  console.log("getX ->", path, JSON.stringify(filter));
  var url = `${api_base}/${path}`;
  if (filter) {
    url += '/?';
    try {
      Object.keys(filter).forEach((x) => {
        url = url + x + "=" + filter[x] + "&";
      });
    } catch { }
  }
  const r = await Fetch(url, {
    cache: "default",
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: getAuthToken(),

      "Access-Control-Allow-Origin": "*",
    },
  });
  const j = await r.json();
  return j;
}
export async function postX(path, body, filter = null) {
  console.log("postX ->", path, JSON.stringify(filter), JSON.stringify(body));
  var url = `${api_base}/${path}`;
  if (filter) {
    url += '/?';
    try {
      Object.keys(filter).forEach((x) => {
        url = url + x + "=" + filter[x] + "&";
      });
    } catch { }
  }
  const r = await Fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: getAuthToken(),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  return j;
}

export async function postXTimed(path, filter, body) {
  console.log("postX ->", path, JSON.stringify(filter), JSON.stringify(body));
  const url = `${api_base}/${path}/?${new URLSearchParams(filter).toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: getAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Clear timeout if request completes before timeout

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timed out");
      return { message: "Timeout", severity: "error" }; // Return empty object on timeout
    } else {
      console.error("Error occurred during fetch:", error);
      // Handle other errors
      return { message: "Timeout", severity: "error" }; // Return empty object on timeout
    }
  }
}

export async function postY(path, body, filter = null) {
  console.log("postX ->", path, JSON.stringify(filter), body);
  var url = `${api_base}/${path}`;
  if (filter) {
    url += '/?';
    try {
      Object.keys(filter).forEach((x) => {
        url = url + x + "=" + filter[x] + "&";
      });
    } catch { }
  }
  const r = await Fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: getAuthToken(),
    },
    body: body,
  });
  const j = await r.json();
  return j;
}

export async function deleteX(path) {
  console.log("deleteX ->", path);
  var url = `${api_base}/${path}/`;

  const r = await Fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: getAuthToken(),
    },
  });
  const j = await r.json();
  return j;
}

const endpoints = {
  login: async (user, pass) => await postX('signin', {
    'email_or_phone': user,
    'password': pass
  }),
  profile: async (id) => await getX(`member/public-profile/${id}`),
  packages: async () => await getX('packages'),
  chatList: async () => await getX('member/chat-list'),
  chatMessages: async (id) => await getX(`member/chat-view/${id}`),
  sendMessage: async (message, chat_thread_id) => await postX('member/chat-reply', {
    message,
    chat_thread_id,
    attachment: []
  }),
  memberListing: async () => await postX('member/member-listing')
};

export async function getApiResponse(endpoint, ...args) {
  const ep = endpoints[endpoint];
  const res = await ep(...args);
  return res;
}

export async function cacheApiResponse(endpoint, ...args) {
  const ep = endpoints[endpoint];
  const res = await ep(...args);
  localStorage.setItem('cache-' + endpoint, JSON.stringify(res));
  return res;
}

export function getApiCache(endpoint) {
  const k = localStorage.getItem('cache-' + endpoint);
  if (k) return JSON.parse(k);
  return null;
}