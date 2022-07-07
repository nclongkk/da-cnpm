import axiosClient from "./axiosClient";

const notifcationApi = {
  getNotifications: () => {
    const url = "/notifications";
    return axiosClient.get(url);
  },
  deleteNotifications: (id) => {
    const url = "/notifications";
    return axiosClient.delete(`${url}/${id}`);
  },
  updateNotificationStatus: (id) => {
    const url = "/notifications";
    return axiosClient.patch(url, {
      notificationIds: [id],
    });
  },
};

export default notifcationApi;
