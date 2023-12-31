import { API_BASE_PATH, api } from "./api";
import { CreateUserFile200Response, ResponseError } from "./openapi";

export const userFileApi = {
  getUserFile(id: number) {
    return api.getUserFile({
      id,
    });
  },
  listUserFiles() {
    return api.listUserFiles();
  },
  async createUserFile({ file }: { file: File }) {
    const formData = new FormData();
    formData.append("file", file);
    // multipart upload with key "file"
    const res = await fetch(`${API_BASE_PATH}/files`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      throw new ResponseError(res, "Failed to create user file");
    }

    return res.json() as Promise<CreateUserFile200Response>;
  },
  deleteUserFile(id: number) {
    return api.deleteUserFile({
      id,
    });
  },
};
