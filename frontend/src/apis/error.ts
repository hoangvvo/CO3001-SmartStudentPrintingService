import { ResponseError } from "./openapi";

export const parseResponseError = async (error: Error) => {
  if (!(error instanceof ResponseError)) {
    return error;
  }
  const text = await error.response.text();
  try {
    const json = JSON.parse(text);
    return new Error(json.message);
  } catch (e) {
    return new Error(error.message);
  }
};
