import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { Divider, Paper } from "@mui/material";
import InputField from "../../../components/form-control/InputField/InputField";
import SelectField from "../../../components/form-control/SelectField/SelectField";

ChangeInforUserForm.propTypes = {
  onSubmit: PropTypes.func,
  userInfor: PropTypes.object,
};

function ChangeInforUserForm({ onSubmit, userInfor }) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your full name.")
      .test(
        "Should has at least two words",
        "Please enter at least two words.",
        (value) => {
          return value.trim().split(" ").length >= 2;
        }
      ),
    telephoneNumber: yup.string(),
    address: yup.string(),
  });

  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const getCityList = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/");
      const data = res.data.map((item) => item.name);
      setCityList(data);
    };
    getCityList();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    console.log(data);

    if (onSubmit) {
      console.log(data);
      onSubmit(data);
    }
  };

  return (
    <Paper className="flex-1 mr-4 relative">
      <form className="mt-4 px-4" onSubmit={handleSubmit(formSubmit)}>
        <h2 className="font-bold uppercase text-2xl mb-4 text-center">
          Change information
        </h2>
        <Divider className="w-full" />
        <div className="mt-4">
          <InputField
            id="fullName"
            label="Full name"
            placeholder="Enter your name..."
            type="text"
            register={{
              ...register("fullName", {
                value: userInfor.fullName,
              }),
            }}
            errorMessage={errors.fullName?.message}
            required
          />
        </div>
        <InputField
          id="telephoneNumber"
          label="Telephone number"
          placeholder="Enter your telephone number..."
          type="text"
          register={{
            ...register("telephoneNumber", {
              value: userInfor.phoneNumber,
            }),
          }}
          errorMessage={errors.telephoneNumber?.message}
        />
        <InputField
          id="address"
          label="Address"
          placeholder="Enter your address..."
          type="text"
          register={{
            ...register("address", {
              value: userInfor.address,
            }),
          }}
          errorMessage={errors.address?.message}
        />
        <div className="mt-4">
          <SelectField
            name="city"
            label="City: "
            options={cityList}
            register={{
              ...register("city", {
                value: userInfor.city,
              }),
            }}
            errorMessage={errors.address?.message}
          />
        </div>
        <button className="absolute hover:bg-blue-700 bottom-2 right-2 w-24 mt-12 py-2 px-4 self-end bg-blue-500 rounded-md text-white text-lg cursor-pointer">
          SAVE
        </button>
      </form>
    </Paper>
  );
}

export default ChangeInforUserForm;
