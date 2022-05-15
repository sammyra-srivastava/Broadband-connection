import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app_config from "../../config";

const ListReviews = () => {
  const url = app_config.api_url;
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(url + "/review/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviewList(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const displayData = () => {
    return reviewList.map(
      ({ _id, title, description, user, location, speed }) => {
        return (
          <div className="card mt-5">
            <div className="row">
              <div className="col-md-9">
                <div className="card-body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => navigate("/main/reviewdetail/" + _id)}
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <img
                      className="img-fluid"
                      src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    />
                    <p className="text-center">{user.username}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
  };

  return (
    <>
      <header className="browse-header text-white py-5 text-center">
        <h1>Find Best Broadband Connection</h1>
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <input className="form-control" />
            <button className="btn btn-primary">
              {" "}
              <i class="fas fa-search"></i>{" "}
            </button>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="col-md-3">{/* <h3>Sidebar here</h3> */}</div>
        <div className="col-md-9">
          <div className="col-md-10 mx-auto">{displayData()}</div>
        </div>
      </div>
    </>
  );
};

export default ListReviews;
