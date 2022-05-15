import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import app_config from "../../config";
import Swal from "sweetalert2";
const AddQuery = () => {
  const url = app_config.api_url;

  const fetchData = () => {};
  const [filter, setFilter] = useState("");

  // 1. Form Object
  const queryForm = {
    title: "",
    description: "",
    vendor: "",
    location: [],
    speed: [],
  };

  //   2. submit function
  const submitQuery = (values) => {
    console.log(values);

    fetch(url + "/query/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({ title: "Query Successsfully Added", icon: "success" });
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  };

  return (
    <div style={{ background: "#eee", height: "100vh", paddingTop: "5rem" }}>
      <Container>
        <header className="add-query-back">
          <Typography className="text-center text-white" variant="h5">
            Connecty
          </Typography>
          <Typography className="text-center text-white" variant="h2">
            Add New Query
          </Typography>
        </header>
        <Card>
          <CardContent>
            <Formik initialValues={queryForm} onSubmit={submitQuery}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="title"
                    onChange={handleChange}
                    value={values.title}
                    label="Title"
                    className="w-100 mt-5"
                  />

                  <TextField
                    id="description"
                    onChange={handleChange}
                    value={values.description}
                    label="Description"
                    className="w-100 mt-3"
                  />

                  <Button type="submit" variant="contained" className="mt-5">
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default AddQuery;
