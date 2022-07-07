import axiosClient from "./axiosClient";

const statisticApi = {
  getStatisticsUsers: (params) => {
    const url = `/admin/users/statistics`;
    return axiosClient.get(url, { params });
  },
  getTransactions: (params) => {
    const url = `/admin/transactions`;
    return axiosClient.get(url, { params });
  },
};

export default statisticApi;
