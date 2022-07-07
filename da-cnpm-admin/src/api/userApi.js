import axiosClient from "./axiosClient";

const userApi = {
  getAll: (params) => {
    const url = `/admin/users`;
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/admin/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/admin`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/admin/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/admin/user/${id}`;
    return axiosClient.delete(url);
  },
  updateStatus: (id, data) => {
    const url = `/admin/users/${id}/status`;
    return axiosClient.patch(url, data);
  },

  // delete: (id) => {
  //   const url = `/admin/user/${id}`;
  //   return axiosClient.delete(url);
  // },

  //
  getShops: (params) => {
    const url = "/shops";
    return axiosClient.get(url, { params });
  },
};

export default userApi;
