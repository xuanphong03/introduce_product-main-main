import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = "/api/v1/auth/register";
    return axiosClient.post(url, data);
  },

  updateInfo(newInfor) {
    const url = "/user/information/update";
    return axiosClient.patch(url, newInfor);
  },

  updatePassword(newPassword) {
    const url = "/auth/local/password/update";
    return axiosClient.patch(url, newPassword);
  },
};

export default userApi;
