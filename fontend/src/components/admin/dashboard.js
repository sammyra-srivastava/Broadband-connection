import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Chart, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // const labels = Utils.months({count: 7});
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const donutdata = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ background: "#eee" }}>
      <div className="container-fluid py-3">
        <h3 className="text-muted">Admin Dashboard</h3>
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-xs-12 mt-4">
            <div className="card border border-primary">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <span>2,456</span>
                <i
                  class="fa fa-user-circle float-end my-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 mt-4">
            <div className="card border border-primary">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <span>2,456</span>
                <i
                  class="fa fa-user-circle float-end my-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 mt-4">
            <div className="card border border-primary">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <span>2,456</span>
                <i
                  class="fa fa-user-circle float-end my-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 mt-4">
            <div className="card border border-primary">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <span>2,456</span>
                <i
                  class="fa fa-user-circle float-end my-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-sm-6 col-xs-12 mt-4">
            <div className="card">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <Line data={data} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-12 mt-4">
            <div className="card">
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted">
                <Doughnut data={donutdata} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xs-12 mt-4">
            <div className="card" style={{ height: "20rem" }}>
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted"></div>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12 mt-4">
            <div className="card" style={{ height: "20rem" }}>
              <div className="card-header text-primary h5">Users</div>
              <div className="card-body display-4 text-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
