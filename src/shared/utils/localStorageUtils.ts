export const setLocalStorage = (key: string, value: string | object) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }

  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (search: string) => {
  if (typeof window === "undefined") return null;

  const data = window.localStorage.getItem(search);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const removeLocalStorage = (search: string) => {
  window.localStorage.removeItem(search);
};
