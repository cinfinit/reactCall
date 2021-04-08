import React, { Component } from "react";
import axios from "axios";
import config from "../config";
class Logpage extends Component {
  state = {
    logs: [],
  };
  componentDidMount = () => {
    axios.get(`${config.baseUrl}/api/caller`).then(async (res) => {
      console.log("log response ", res.data);
      //   let obj = [...res.data];
      //   obj.map((i) => {
      //     i.call_details = JSON.parse(i.call_details);
      //   });

      this.setState({ logs: res.data });

      //   console.log("lenght", this.state.callDetails);
    });
  };
  render() {
    return (
      <>
        <div class="mt-5 row justify-content-center">
          <div class="col-md-6">
            <span class="anchor" id="formLogin"></span>
            <div class="card card-outline-secondary">
              <div class="card-header">
                <h3 class="mb-0"> User logs would be shown here </h3>
              </div>

              {this.state.logs.length >= 1
                ? this.state.logs.map((user_logs) => {
                    return (
                      <div class="card-body">
                        Name : {user_logs.name} <br />
                        Call Duration : {user_logs.call_details.callDuration}
                        <br />
                        Call State : {user_logs.call_details.callState}
                        <br />
                        To Number : {user_logs.call_details.toNumber}
                      </div>
                    );
                  })
                : "No Data Yet"}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Logpage;
