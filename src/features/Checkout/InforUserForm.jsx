import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

export default function InforUserForm({ onChange }) {
  const [cityList, setCityList] = React.useState([]);
  React.useEffect(() => {
    const getCityList = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/");
      const data = res.data.map((item) => item.name);
      setCityList(data);
      setInforUser((prev) => ({ ...prev, city: data[0] }));
    };
    getCityList();
  }, []);

  const [inforUser, setInforUser] = React.useState({
    fullName: "Nguyễn Xuân Phong",
    address: "Vĩnh Quỳnh, Thanh Trì",
    telephoneNumber: "0987654321",
    city: cityList.length > 0 ? cityList[0] : "",
  });

  React.useEffect(() => {
    onChange(inforUser);
  }, [inforUser]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inforUser.fullName}
            onChange={(e) => {
              const newFullName = e.target.value;
              setInforUser((prevInfor) => ({
                ...prevInfor,
                fullName: newFullName,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="telephoneNumber"
            name="state"
            label="Telephone number"
            fullWidth
            variant="standard"
            value={inforUser.telephoneNumber}
            onChange={(e) => {
              const newTelphone = e.target.value;
              setInforUser((prevInfor) => ({
                ...prevInfor,
                telephoneNumber: newTelphone,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={inforUser.address}
            onChange={(e) => {
              const newAddress = e.target.value;
              setInforUser((prevInfor) => ({
                ...prevInfor,
                address: newAddress,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            variant="standard"
            className="m-1 p-0"
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="city">City</InputLabel>
            <Select
              value={inforUser.city}
              labelId="city"
              id="city"
              label="City"
              onChange={(e) => {
                const newCity = e.target.value;
                setInforUser((prevInfor) => ({
                  ...prevInfor,
                  city: newCity,
                }));
              }}
            >
              {cityList.map((city) => {
                return (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
