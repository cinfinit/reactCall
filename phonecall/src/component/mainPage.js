import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast } from "react-toastify";
import { Select } from "antd";
import "antd/dist/antd.css";

import "react-toastify/dist/ReactToastify.css";
import config from "../config";
import axios from "axios";
const { Option } = Select;

class MainPage extends Component {
  state = {
    name: "",
    user_number: "",
    receiver_number: "",
    duration: "",
    uid: "",
    inProgress: false,

    callDetails: {},
  };

  submitData = () => {
    const { name, user_number, receiver_number, callDetails } = this.state;
    axios
      .post(`${config.baseUrl}/api/caller/create`, {
        name,
        user_number,
        receiver_number,
        call_details: callDetails,
      })
      .then((res) => {
        console.log("caller response ", res.data);
      })
      .catch((err) => {
        alert("Some error occured");
      });
  };
  getStatus = () => {
    let { uid } = this.state;
    axios
      .post(`${config.baseUrl}/api/caller/getdetails`, {
        callUid: uid,
      })
      .then(async (res) => {
        console.log("caller response ", res.data);
        if (res.data == "error") {
          setTimeout(() => {
            this.getStatus();
          }, 3000);
        } else {
          this.setState({ callDetails: res.data, inProgress: false });
          console.log(Object.keys(this.state.callDetails).length);
          if (Object.keys(this.state.callDetails).length > 1) {
            this.submitData();
          }
          //   console.log("lenght", this.state.callDetails);
          console.log("got the final response ", res.data);
        }
      });
  };

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (val) => {
    this.setState({ duration: val });
  };
  makeCall = (e) => {
    e.preventDefault();
    console.log("we are under this make call function");
    const { name, user_number, receiver_number, duration } = this.state;
    if (this.validator.allValid()) {
      axios
        .post(`${config.baseUrl}/api/caller/makecall`, {
          name,
          user_number,
          receiver_number,
          duration,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ uid: res.data.requestUuid, inProgress: true });
          setTimeout(() => {
            this.getStatus();
          }, 4000);
        })
        .catch((err) => {
          alert("Some error occured ");
        });
      console.log("all of this is valid ");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      console.log("some errors ");
    }
  };
  componentWillMount = () => {
    this.validator = new SimpleReactValidator();
  };

  render() {
    return (
      <div class="mt-5 row justify-content-center">
        <div class="col-md-6">
          <span class="anchor" id="formLogin"></span>
          <div class="card card-outline-secondary">
            <div class="card-header">
              <h3 class="mb-0">Make Call </h3>
            </div>
            <div class="card-body">
              <form
                autocomplete="off"
                class="form"
                id="formLogin"
                name="formLogin"
                role="form"
              >
                <div class="form-group">
                  <label for="uname1">Enter your name</label>
                  <input
                    class="form-control"
                    name="name"
                    required=""
                    type="text"
                    onChange={this.inputChange}
                  />
                  <p style={{ color: "red" }}>
                    {this.validator.message(
                      "Name",
                      this.state.name,
                      "required"
                    )}
                  </p>
                </div>
                <div class="form-group">
                  <label for="uname1">
                    Enter your Number(By Default Your Number is +17755350001 ){" "}
                  </label>

                  <input
                    class="form-control"
                    name="user_number"
                    required=""
                    onChange={this.inputChange}
                  />
                  <p style={{ color: "red" }}>
                    {this.validator.message(
                      "Your Number",
                      this.state.user_number,
                      "required"
                    )}
                  </p>
                </div>
                <div class="form-group">
                  <label>Enter Number you want to call to</label>
                  <input
                    autocomplete="new-password"
                    class="form-control"
                    name="receiver_number"
                    required=""
                    onChange={this.inputChange}
                  />
                  <p style={{ color: "red" }}>
                    {this.validator.message(
                      "Receiver Number",
                      this.state.receiver_number,
                      "required"
                    )}
                  </p>
                </div>

                <div class="form-group">
                  <label>Duration</label>
                  <br />
                  <Select
                    defaultValue="Select the Minutes"
                    style={{ width: 120 }}
                    onChange={this.handleChange}
                  >
                    <Option value={5}>5 Mins</Option>
                    <Option value={10}>10 Mins</Option>
                    <Option value={15}>15 Mins</Option>
                  </Select>
                  <p style={{ color: "red" }}>
                    {this.validator.message(
                      "Duration",
                      this.state.duration,
                      "required"
                    )}
                  </p>
                </div>

                <button
                  class="btn btn-success btn-lg float-right"
                  type="button"
                  onClick={this.makeCall}
                >
                  Make Call
                </button>
              </form>
            </div>
          </div>
        </div>
        {this.state.inProgress == true ? (
          <h4>Calling in progress ....</h4>
        ) : null}
        <div class="col-md-6">
          <span class="anchor" id="formLogin"></span>
          <div class="card card-outline-secondary">
            <div class="card-header">
              <h3 class="mb-0"> Call Details Will be Shown here </h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label>Call State</label>
                <p>
                  {Object.keys(this.state.callDetails).length > 1
                    ? this.state.callDetails.callState
                    : "N.A"}
                </p>
              </div>
              <div class="form-group">
                <label>Call Duration</label>
                <p>
                  {Object.keys(this.state.callDetails).length > 1
                    ? this.state.callDetails.callDuration
                    : "N.A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
