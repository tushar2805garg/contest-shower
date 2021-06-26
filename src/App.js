import React from "react";
import {Bar,Pie} from "react-chartjs-2";
import "./App.css";
import Tag from "./Tags";
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
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
      },
      Tags:{
        labels:[],
        datasets:[
          { 
            label: "Tags Of problem Solved",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
          }
        ]
      }
    };
  }
  CreateTag(){
    const arr=[];
    console.log(Tag);
    for(const tag in Tag){
      arr.push(tag);
    }
    console.log(arr);
    return arr;
  }
  CreateArray(size) {
    const array = [];
    for (var i = 0; i < size; i++) {
      array.push(0);
    }
    return array;
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
      arr: this.CreateArray(),
      Tags:{
         labels:this.CreateTag(),
         datasets:[
          {
            label: "Tags Of problem Solved",
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              "#FF1493", "	#FF69B4","#800080","	#4169E1","#0000CD","	#AFEEEE","	#40E0D0"
              ,"#00FFFF","#00FF7F","#32CD32","	#FFFF00","	#DAA520","	#CD5C5C","#A52A2A	",
              "#D2691E","	#FF00FF","#D8BFD8","	#9932CC","#8B008B","#C71585","#1E90FF",
              "	#5F9EA0","	#AFEEEE","#5F9EA0"
          ],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
          }
         ]
      }
    });
  }
  CodeforcesId = (event) => {
    let value = event.target.value;
    this.setState({
      codeforcesid: value
    });
  };
  Clicked() {
    var new_to_set = this.state.isloggedin === false ? true : false;
    this.setState({ isloggedin: new_to_set }, function () {
      if (this.state.isloggedin === false) {
        this.setState({ codeforcesid: "", name: "" });
        return;
      }
      const url =
        "https://codeforces.com/api/user.info?handles=" +
        this.state.codeforcesid;
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
      var count = this.CreateArray(26);
      var rating = this.CreateArray(24);
      var countoftags= this.CreateArray(37);
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
              for(var j=0;j<z[i].problem.tags.length;j++){
                var str=z[i].problem.tags[j];
                // str=str.replace(/\s/g, "");
                str=str.replace(/[-\s]/g,"")
                countoftags[Tag[str]]++;
              }
            }
          }
          var c=0;
          console.log(count);
          for(var i=0;i<count.length;i++){
            c=c+count[i];
          }
          console.log(c);
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
            },
            Tags:{
               labels:this.CreateTag(),
               datasets:[
                {
                  label: "Tags Of problem Solved",
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    "#FF1493", "	#FF69B4","#800080","	#4169E1","#0000CD","	#AFEEEE","	#40E0D0"
                    ,"#00FFFF","#00FF7F","#32CD32","	#FFFF00","	#DAA520","	#CD5C5C","#A52A2A	",
                    "#D2691E","	#FF00FF","#D8BFD8","	#9932CC","#8B008B","#C71585","#1E90FF",
                    "	#5F9EA0","	#AFEEEE","#5F9EA0"
                ],
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: countoftags
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
         <img src="contestshower.jpg" className="image"/>
         <div className="input">
        <Button variant="contained" color="primary" onClick={() => this.Clicked()}
        style={{padding:"10px",margin:"10px"}}
        >
          {this.state.isloggedin === true ? "Logout" : "Login"}
        </Button>
        <Input autoComplete="off"
          disabled={this.state.isloggedin}
          onChange={this.CodeforcesId}
          type="text"
          placeholder="Enter your Codeforces id"
          value={this.state.codeforcesid}
        />
        </div>
        {this.state.name !== "" ? (
          <div>
            <h1> Hello {this.state.name} </h1>
            <h2> Your maximum rating is {this.state.maxrating} </h2>
            <h2> Your current rating is {this.state.currRating} </h2>
            <h2> You belongs to {this.state.Organization} </h2>
            <h2> You are {this.state.rank} </h2>
            <div  className="chart-container">
            <Pie
           data={this.state.Tags}
             options={{
              maintainAspectRatio: false,
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            plugins:{
            legend:{
              display:true,
              position:'right'
            }
          },
          }}
        />
            <Bar
              data={this.state.statee}
              // height={85}
              options={{
                // responsive:true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: "Levels Of Problems Solved",
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: "right"
                }, 
                // width:"400",
                // height:"400",
              }}
            />
            <Bar
              data={this.state.Rating}
              // height={85}
              // className="chart-container"
              options={{
                // responsive:true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: "Levels Of Problems Solved",
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: "right"
                },  
                // width:"400",
                // height:"400",
              }}
            />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default App;
