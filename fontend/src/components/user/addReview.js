import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../../config";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import { NetworkSpeed } from "network-speed";
// const testNetworkSpeed = new NetworkSpeed();

const AddReview = () => {
  const url = app_config.api_url;
  const [location, setLocation] = useState("");
  const [speed, setSpeed] = useState("");
  const [speedLoading, setSpeedLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const fetchData = () => {};

  // 1. Form Object
  const reviewForm = {
    title: "",
    description: "",
    user: currentUser._id,
    location: "",
    speed: "",
  };

  const checkLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation(position.coords.latitude, position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };

  const imageAddr =
    "https://drive.google.com/u/0/uc?id=1jTbY1LjBJs2JZyFOphR9f32UZeaGqczG&export=download";
  const downloadSize = 4680310; //bytes

  function ShowProgressMessage(msg) {
    if (console) {
      if (typeof msg == "string") {
        console.log(msg);
      } else {
        for (var i = 0; i < msg.length; i++) {
          console.log(msg[i]);
        }
      }
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
      var actualHTML = typeof msg == "string" ? msg : msg.join("<br />");
      oProgress.innerHTML = actualHTML;
    }
  }

  function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
  }

  if (window.addEventListener) {
    window.addEventListener("load", InitiateSpeedDetection, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", InitiateSpeedDetection);
  }

  function MeasureConnectionSpeed() {
    setSpeedLoading(true);
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
      endTime = new Date().getTime();
      showResults();
    };

    download.onerror = function (err, msg) {
      ShowProgressMessage("Invalid image, or error downloading");
    };

    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
      var duration = (endTime - startTime) / 1000;
      var bitsLoaded = downloadSize * 8;
      var speedBps = (bitsLoaded / duration).toFixed(2);
      var speedKbps = (speedBps / 1024).toFixed(2);
      var speedMbps = (speedKbps / 1024).toFixed(2);
      ShowProgressMessage([
        "Your connection speed is:",
        speedBps + " bps",
        speedKbps + " kbps",
        speedMbps + " Mbps",
      ]);
      setSpeed(speedMbps + " Mbps");
      setSpeedLoading(false);
    }
  }

  // async function getNetworkDownloadSpeed() {
  //   const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
  //   const fileSizeInBytes = 500000;
  //   const speed = await testNetworkSpeed.checkDownloadSpeed(
  //     baseUrl,
  //     fileSizeInBytes
  //   );
  //   console.log(speed);
  // }

  // async function getNetworkUploadSpeed() {
  //   const options = {
  //     hostname: "www.google.com",
  //     port: 80,
  //     path: "/catchers/544b09b4599c1d0200000289",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const fileSizeInBytes = 2000000;
  //   const speed = await testNetworkSpeed.checkUploadSpeed(
  //     options,
  //     fileSizeInBytes
  //   );
  //   console.log(speed);
  // }

  useEffect(() => {
    checkLocation();
    MeasureConnectionSpeed();
    // getNetworkDownloadSpeed();
    // getNetworkUploadSpeed();
  }, []);

  const navigate = useNavigate();

  //   2. submit function
  const submitReview = (values) => {
    console.log(values);

    fetch(url + "/review/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Review Added Successfully!!",
          }).then(() => {
            navigate("/main/listreviews");
          });
        });
      }
    });
  };

  return (
    <div className="add-review">
      <Container>
        <header style={styles.header}>
          <Typography className="text-center text-white fw-bolder" variant="h5">
            Connecty
          </Typography>
          <Typography className="text-center text-white" variant="h2">
            Add New Review
          </Typography>
        </header>
        <Card>
          <CardContent>
            <Formik initialValues={reviewForm} onSubmit={submitReview}>
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
                    multiline
                    rows={4}
                    id="description"
                    onChange={handleChange}
                    value={values.description}
                    label="Description"
                    className="w-100 mt-3"
                  />

                  <Grid container spacing={4}>
                    <Grid xs={{ mt: 5 }} item md={6}>
                      <TextField
                        value={speed}
                        label="speed"
                        disabled
                        className="w-100 mt-3"
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm mt-3 float-end"
                        onClick={MeasureConnectionSpeed}
                      >
                        {" "}
                        Capture Speed
                      </button>
                    </Grid>
                    <Grid xs={{ mt: 5 }} item md={6}>
                      <TextField
                        value={location}
                        label="location"
                        disabled
                        className="w-100 mt-3"
                      />
                    </Grid>
                  </Grid>

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

const styles = {
  header: {
    background:
      "linear-gradient(to right, #00000092, #00000092), url(http://localhost:5000/images/add_review_head.jpg)",
    // backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "2rem",
  },
};

export default AddReview;
