import { ResponseError } from "./openapi";

export const parseResponseError = async (error: Error) => {
  if (!(error instanceof ResponseError)) {
    return error;
  }
  const text = await error.response.text();
  try {
    const json = JSON.parse(text);
    return new Error(
      json.message ||
        json.error ||
        `Request failed with status code ${error.response.status}`,
    );
  } catch (e) {
    return new Error(error.message);
  }
};

export const handleResponseError = async (error: Error) => {
  const parsedError = await parseResponseError(error);
  throw parsedError;
};
