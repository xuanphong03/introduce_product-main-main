import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ChangeInforUserForm from "./ChangeInforUserForm";

ChangeInforUser.propTypes = {};

function ChangeInforUser({ userInfor }) {
  const handleSubmit = async (data) => {
    try {
      toast.success("Update personal information successfully <3");
      console.log(data);
    } catch (error) {}
  };
  return <ChangeInforUserForm onSubmit={handleSubmit} userInfor={userInfor} />;
}

export default ChangeInforUser;
