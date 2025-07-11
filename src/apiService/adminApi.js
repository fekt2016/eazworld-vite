import api from "./api";

const adminApi = {
  getAllAdmins: (params) => {
    const validatedParams = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search || undefined,
      sort: params?.sort || "createdAt:desc",
    };
    // Remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(validatedParams).filter(([v]) => v !== undefined)
    );

    return api.get(`/admin`, { params: cleanParams });
  },
};
export default adminApi;
