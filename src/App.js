import React from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeforcesid: "",
      name: "",
      Organization: "",
      currRating: "",
      rank: "",
      maxrating: "",
      arr: [],
      isloggedin: false,
      statee: {
        labels: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N"
        ],
        datasets: [
          {
            label: "Problems Solved",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      Rating: {
        labels: ["800","900","1000","1100","1200","1300","1400","1500","1600","1700", "1800","1900","2000","2100","2200","2300","2400","2500","2600","2700"
        ],
        datasets: [
            {
            label: "Levels Of problem Solved",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  }
  componentDidMount() {
    this.setState({
      codeforcesid: "",
      name: "",
      Organization: "",
      currRating: "",
      rank: "",
      maxrating: "",
      isloggedin: false,
      arr: this.CreateArray
    });
  }
  CreateArray() {
    const array = [];
    for (var i = 0; i < 7; i++) {
      array.push(0);
    }
    return array;
  }
  CodeforcesId = (event) => {
    let value = event.target.value;
    this.setState({
      codeforcesid: value
    });
  };
  Clicked() {
    console.log(this.state.isloggedin);
    var new_to_set = this.state.isloggedin === false ? true : false;
    this.setState({ isloggedin: new_to_set }, function () {
      if (this.state.isloggedin === false) {
        this.setState({ codeforcesid: "", name: "" });
        return;
      }
      const url =
        "https://codeforces.com/api/user.info?handles=" +
        this.state.codeforcesid;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if(res.status === "FAILED"){
            alert("There is not any person with this handlename on codeforces.");
            return;
          }
          this.setState({
            name: res.result[0].hasOwnProperty('firstName') === true ?  res.result[0].firstName : "Bro",
            rank: res.result[0].rank, // in string
            maxrating: res.result[0].maxRating, // in numbers
            Organization: res.result[0].organization,
            currRating: res.result[0].rating
          });
        });
      const Qsolved =
        "https://codeforces.com/api/user.status?handle=" +
        this.state.codeforcesid +
        "&from=1&count=1000000";
      console.log(Qsolved);
      var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var rating = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      fetch(Qsolved)
        .then((res) => res.json())
        .then((res) => {
          if(res.status === "FAILED"){
            return;
          }
          var z = res.result;
          for (var i = 0; i < z.length; i++) {
            var idx = z[i].problem.index.charCodeAt(0) - 65;
            if (z[i].verdict === "OK") {
              count[idx]++;
              var rt = z[i].problem.rating - 800;
              rt = rt / 100;
              rating[rt]++;
            }
          }
          this.setState({
            statee: {
              labels: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N"
              ],
              datasets: [
                {
                  label: "Problems Solved",
                  backgroundColor: "rgba(75,192,192,1)",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: count
                }
              ]
            },
            Rating: {
             labels:["800","900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300","2400","2500","2600","2700"
            ],
              datasets: [
                {
                  label: "Levels Of problem Solved",
                  backgroundColor: "rgba(75,192,192,1)",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: rating
                }
              ]
            }
          });
        });
    });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.Clicked()}>
          {this.state.isloggedin === true ? "Logout" : "Login"}
        </button>
        <input
          disabled={this.state.isloggedin}
          onChange={this.CodeforcesId}
          type="text"
          placeholder="Enter your Codeforces id"
          value={this.state.codeforcesid}
        />
        {this.state.name !== "" ? (
          <div>
            <h1> Hello {this.state.name} </h1>
            <h2> Your maximum rating is {this.state.maxrating} </h2>
            <h2> Your current rating is {this.state.currRating} </h2>
            <h2> You belongs to {this.state.Organization} </h2>
            <h2> You are {this.state.rank} </h2>
            <Bar
              data={this.state.statee}
              height={85}
              options={{
                title: {
                  display: true,
                  text: "Levels Of Problems Solved",
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
            <Bar
              data={this.state.Rating}
              height={85}
              options={{
                title: {
                  display: true,
                  text: "Levels Of Problems Solved",
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default App;
