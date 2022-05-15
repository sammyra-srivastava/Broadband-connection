import { Button, InputAdornment, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app_config from "../../config";
// import "../stylesheet/floristlist.css";
import { Search } from "@mui/icons-material";

const BrowseSlides = () => {
  const url = app_config.backend_url;

  const [floristArray, setFloristArray] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchFlorist = () => {
    fetch(url + "/slide/getall/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setFloristArray(data);
      });
  };

  useEffect(() => {
    fetchFlorist();
  }, []);

  const navigate = useNavigate();

  const displayData = () => {
    if (!loading) {
      return floristArray.map(
        ({ _id, shopName, mobile, email, address, timings, image }) => (
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
              <div
                class="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/shoes%20(3).webp"
                  class="w-100"
                />
                <a href="#!">
                  <div class="mask">
                    <div class="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span class="badge bg-danger ms-2">-10%</span>
                      </h5>
                    </div>
                  </div>
                  <div class="hover-overlay">
                    <div
                      class="mask"
                      style="background-color: rgba(251, 251, 251, 0.15);"
                    ></div>
                  </div>
                </a>
              </div>
              <div class="card-body">
                <a href="" class="text-reset">
                  <h5 class="card-title mb-3">Product name</h5>
                </a>
                <a href="" class="text-reset">
                  <p>Category</p>
                </a>
                <h6 class="mb-3">
                  <s>$61.99</s>
                  <strong class="ms-2 text-danger">$50.99</strong>
                </h6>
              </div>
            </div>
          </div>
        )
      );
    }
  };

  const filterSlides = () => {};

  return (
    <div>
      <header className="current-back">
        <Typography className="text-center text-white" variant="h5">
          Othelo
        </Typography>
        <Typography className="text-center text-white" variant="h2">
          Explore Slides
        </Typography>

        <div className="input-group mt-5">
          <input
            className="form-control"
            value={filter}
            label="Search Here"
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "active.active", mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={filterSlides} type="submit">
            Search
          </Button>
        </div>
      </header>

      <div className="contained-fluid">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item">
                <p>Category</p>
              </li>
            </ul>
          </div>
          <div className="col-md-9">{displayData()}</div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSlides;
