import React, { Component } from 'react';
import './App.css';
import uploadImage from './assets/upload.png'
import approvedImage from './assets/approved.png'
import avatarSvg from './assets/avatar.svg'
import locationSvg from './assets/location.svg'
import emailSvg from './assets/email.svg'
import educationSvg from './assets/education.svg'
import majorSvg from './assets/major.svg'
import levelSvg from './assets/level.svg'
import sortSvg from './assets/sort.svg'
import brifcaseSvg from './assets/brifcase.svg'
import copySvg from './assets/copy.svg'

let CVs = [
  {
    id: 1,
    name: "Natalie Short",
    email: "natalieShort@gmail.com",
    edu: "Stanford University",
    major: "Computer Information Systems",
    jobTitle: "Front-end Developer",
    address: "London,UK",
    carrerLevel: "Senior",
    skills: ["Teamwork", "Gradle", "HTML", "CSS", "Javascript", "ReactJS"],
    yearsOfexp: "9",
    pic: avatarSvg

  },
  {
    id: 2,
    name: "Mikel Long",
    email: "mikelLong@gmail.com",
    edu: "Harverd University",
    major: "Computer Science",
    jobTitle: "AI Developer",
    address: "Texas,US",
    carrerLevel: "Senior",
    skills: ["Team Leader", "Python", "C++", "Neural Networks", "Adaptable", "Work Savvy", "Teamwork", "Communication", "Time Management"],
    yearsOfexp: "7",
    pic: avatarSvg

  },
  {
    id: 3,
    name: "Harry Potter ",
    email: "harryPotter@gryffindor.com",
    edu: "Hogwarts School of Witchcraft and Wizardry",
    major: "Hero",
    jobTitle: "Trying to stay alive",
    address: "J. K. Rowling's series of Harry Potter",
    carrerLevel: "Even if none he is the hero",
    skills: ["Teamwork", "Understands Snakes", "Curse Mark", "Friends"],
    yearsOfexp: "8",
    pic: avatarSvg

  },
  {
    id: 4,
    name: "Lord Voldemort",
    email: "theDarkLord@slytherin.com",
    edu: "Hogwarts School of Witchcraft and Wizardry",
    major: "Evil Wizard",
    jobTitle: "Ending Harry Potter's Life",
    address: "J. K. Rowling's series of Harry Potter",
    carrerLevel: "Leader of the Death Eaters",
    skills: ["Self Centered", "Teleportation", "Understands Snakes", "Works Alone"],
    yearsOfexp: "99",
    pic: avatarSvg

  }
]




class App extends Component {
  state = {
    progressBar: { width: "0%" },
    maxNumOfResumes: 15,
    filesList: [],
    resumeBalance: 150,
    filters: [
      { type: "keyword", value: "" },
      { type: "jobtitle", value: "" },
      { type: "major", value: "" },
      { type: "level", value: "" },
      { type: "sort", value: "" },
      { type: "exp", value: "" },
    ],
    CVs,
    filterdCVs: CVs

  }
  setProgressBar(numOfFiles) {
    let progress = (numOfFiles / this.state.maxNumOfResumes) * 100
    this.setState({
      progressBar: { width: `${progress}%` }
    })
  }
  setBalance(numOfFiles) {

    this.setState({
      resumeBalance: this.state.resumeBalance - numOfFiles
    })

  }


  removeFile(myFile) {
    let filesList = [...this.state.filesList]
    filesList = filesList.filter(file1 => {
      return file1.name !== myFile.name
    })
    this.setBalance(-1);
    this.setProgressBar(filesList.length)
    this.setState({
      filesList
    })
  }

  handleFiles(event) {
    event.persist()
    console.log(event)
    let filesObj = event.target.files
    let numOfFiles = event.target.files.length
    let filesList = this.state.filesList ? [...this.state.filesList] : []
    for (const key in filesObj) {
      if (filesObj.hasOwnProperty(key) && key !== "length") {
        filesList.push(filesObj[key]);

      }
    }


    if (numOfFiles <= (this.state.maxNumOfResumes - this.state.filesList.length)) {
      console.log(this.state, filesList.length, numOfFiles, this.state.maxNumOfResumes - this.state.filesList.length);
      this.setBalance(numOfFiles);
      this.setProgressBar(filesList.length)
      this.setState({
        filesList
      })

    }
    else {
      console.log("over max");

    }


  }
  addFilter(event, type) {
    let filters = [...this.state.filters];
    let valueToCompare = event.target.value.toLowerCase()
    let filter = { type, value: valueToCompare }
    let addFilter = () => {
      filters.forEach(element => {
        if (element.type === type) {
          element.value = filter.value
        }
      });
    }
    console.log(this.state, filter);
    switch (type) {
      case "keyword":
        addFilter()
        break;
      case "jobtitle":
        addFilter()
        break;
      case "major":
        addFilter()
        break;
      case "level":
        addFilter()
        break;
      case "exp":
        addFilter()
        break;
      case "sort":
        addFilter()
        break;
      default:
        break;
    }
    this.setState({
      filters: [...filters]
    })
    
    this.handleSearch([...this.state.CVs])

  }
  handleSearch(CVS) {
    let filterdCVs = CVS
    let filters = [...this.state.filters]
    
    
    filters.forEach(filter => {
      console.log(filter);
      if(filter.value!=="")
      switch (filter.type) {
        case "keyword":
          filterdCVs = filterdCVs.filter(cv => {
              let skill = cv.skills.some(skill=>skill.toLowerCase().includes(filter.value))
            if (cv.name.toLowerCase().includes(filter.value) ||
              cv.address.toLowerCase().includes(filter.value) ||
              cv.email.toLowerCase().includes(filter.value) ||
              cv.major.toLowerCase().includes(filter.value) ||
              cv.jobTitle.toLowerCase().includes(filter.value) ||
              cv.carrerLevel.toLowerCase().includes(filter.value)||
              skill
              ){
              
                return true

              }
              return ""
          })
          break;

        case "jobtitle":

          filterdCVs = filterdCVs.filter(cv => cv.jobTitle.toLowerCase().includes(filter.value))
  
          break;
        case "major":

          filterdCVs = filterdCVs.filter(cv => cv.major.toLowerCase().includes(filter.value))
  
          break;
        case "level":

          filterdCVs = filterdCVs.filter(cv => cv.carrerLevel.toLowerCase().includes(filter.value))

          break;

          case "exp":
            switch (filter.value) {
              case "1":
                  filterdCVs=filterdCVs.filter(cv => cv.yearsOfexp >= 10)
                break;
              case "2":
                  filterdCVs=filterdCVs.filter(cv => cv.yearsOfexp <= 10)
                break;
              default:
                break;
            }

          break;
          
          case "sort":
            switch (filter.value) {
              case "1":
                  filterdCVs = filterdCVs.sort((a, b) => parseFloat(a.yearsOfexp) - parseFloat(b.yearsOfexp))
                break;
              case "2":
                  filterdCVs =filterdCVs.sort((a, b) => parseFloat(a.yearsOfexp) - parseFloat(b.yearsOfexp)).reverse()
                break;
              default:
                break;
            }
          break;
        default:
          break;
      }
    })
    
    
    this.setState({
      filterdCVs
    })
     

  }

  render() {

    let task1 = this.task1()
    let task2 = this.task2()
    
    return (
      <React.Fragment>{task2}</React.Fragment>
    );
  }
  task1() {
    return (<div className="pt-4 bg-my-grey d-flex flex-column">
      <div className="mr-auto ml-5">
        <h5>Upload Resumes</h5>
        <p className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div className="container-1 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column justify-content-center align-items-center text-secondary">
        <div className="bg-my-grey">
          <div className="mt-2 formContainer  pl-3 pr-3 pb-5 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column align-items-center">
            <div className="w-100 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column justify-content-center align-items-center p-5" >
              <label className="fileSelect w-100  ml-auto mr-auto" style={{ height: "45vh" }}>
                <input className="hidden" type="file" multiple disabled={this.state.filesList.length === this.state.maxNumOfResumes} onChange={(e) => this.handleFiles(e)}></input>
                <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-column justify-content-center align-items-center h-75">
                  <div><img className="img-responsive w-100 h-100" src={uploadImage} alt=""></img></div>
                  <div><h5 className="text-center">Click here to upload files </h5></div>
                </div>
              </label>
              <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex w-100 mt-2">

                <div>
                  <div className="text-center">Note: You Can Upload Max of {this.state.maxNumOfResumes} resume.</div>

                </div>

                <div className="text-center ml-auto">
                  <input className="btn myBtn pl-0 pr-0 pt-3 pb-3 " value="Upload CV" readOnly disabled={this.state.filesList.length === this.state.maxNumOfResumes}></input>
                </div>

              </div>
              {this.state.filesList.length > 0 ? <div className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex flex-wrap rounded border filesContainer mt-1">
                {this.state.filesList.map(file => <div className="rounded  btn m-1 text-white bg-my-primary2" onClick={() => this.removeFile(file)}>{file.name}</div>)}
              </div> : <div className="filesContainerPlaceholder"></div>}
            </div>


          </div>
          <div className="text-dark ">
            <div className="d-flex w-100">
              <div className="col-md-4"></div>
              <div className="mt-5 text-center col-md-6"><h5>{this.state.resumeBalance} Resume Balance</h5></div>
              <div className="mt-5 text-center ml-auto"><h5>{this.state.filesList.length} {this.state.filesList.length <= 1 ? <span>Resume</span> : <span>Resumes</span>} Uploaded</h5></div>
            </div>
            <div className="progress bg-dark mb-1 w-100">
              <div id="progressBar" className="progress-bar progress-bar-animated myProgressBar"
                role="progressbar"
                style={this.state.progressBar}></div>
            </div>

          </div>
        </div>
      </div>
    </div>)
  }
  task2() {
    let finalCVs = this.state.filterdCVs
    return (
      <div className="container myContainer" >
        <div className="d-flex justify-content-between">
          <div className="CVsContainer mt-3 p-3 w-75">
            <h5>Uploaded CVs</h5>
            <div className="row container-fluid ">
              {
                finalCVs.map(cv => {
                  return <div className="col-sm-12 rounded p-2 mt-3 bg-white">
                    <div className="mt-2 ml-2">
                      <div className="d-flex justify-content-between">
                        <img className="rounded-circle" src={uploadImage} alt="" width="30px"></img><span className="ml-3 mr-auto font-13" >{cv.name}</span><span className="align-self-end f-13" ><img src={approvedImage} alt=""width="30px"></img></span>
                      </div>
                      <div className="pl-5 font-12" >
                        <div><img alt="" src={locationSvg} width="16px" className="mr-2 mb-1"></img>{cv.address}</div>
                        <div><img alt="" src={emailSvg} width="16px" className="mr-2 mb-1"></img>{cv.email}</div>
                        <div><img alt="" src={educationSvg} width="16px" className="mr-2 mb-1"></img>{cv.edu}</div>
                        <div><img alt="" src={majorSvg} width="16px" className="mr-2 mb-1"></img>{cv.major}</div>
                        <div><img alt="" src={avatarSvg} width="16px" className="mr-2 mb-1"></img>{cv.jobTitle}</div>
                        <div><img alt="" src={levelSvg} width="16px" className="mr-2 mb-1"></img>{cv.carrerLevel}</div>
                        <div><img alt="" src={levelSvg} width="16px" className="mr-2 mb-1"></img>Years Of Experience: {cv.yearsOfexp}</div>

                        <div className="d-flex flex-wrap justify-content-start mt-3">
                          {cv.skills.map(skill => <div className="badge bg-light p-2 m-2 font-12">{skill}</div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                })

              }

            </div>
          </div>
          <div className="mt-3 filters w-25 ml-3">
            <div className="" style={{ backgroundColor: "white", height: "60vh" }}>
              <div className="rounded-top text-light text-left pr-3 pl-3 pt-2 pb-2 w-100 bg-my-primary2"><h6 className="mt-2 text-light">Filters</h6></div>
              <div className="d-flex mt-3 ml-4 mr-4">
                <img src={sortSvg} alt="" width="16px" className="mr-2 mb-1"></img>
                <select className="form-control border-0" onChange={(e) => this.addFilter(e, "sort")}>
                  <option selected value="0">Sort By</option>
                  <option value="1">ASC By Years Of Exp </option>
                  <option value="2">DES By Years Of Exp</option>
                </select>
              </div>
              <div className="d-flex ml-4 mr-4">
                <img src={copySvg} alt="" width="16px" className="mr-2 mb-1"></img>
                <select className="form-control border-0">
                  <option selected value="0">Match CV's</option>

                </select>
              </div>
              <div className="d-flex ml-4 mr-4">
                <img src={brifcaseSvg} alt="" width="16px" className="mr-2 mb-1"></img>
                <select className="form-control border-0" onChange={(e) => this.addFilter(e, "exp")} >
                  <option selected value="0">Experience</option>
                  <option value="1">More Than 10</option>
                  <option value="2">Less Than 10</option>
                </select>
              </div>
              <div className="d-flex mt-4 ml-4 mr-4 ">
                <input className="form-control searchBy" onChange={(e) => this.addFilter(e, "keyword")} placeholder="Search By Keyword"></input>
              </div>
              <div className="d-flex mt-4 ml-4 mr-4 ">
                <input className="form-control searchBy" onChange={(e) => this.addFilter(e, "jobtitle")} placeholder="Search By Job Title"></input>
              </div>
              <div className="d-flex mt-4 ml-4 mr-4 ">
                <input className="form-control searchBy" onChange={(e) => this.addFilter(e, "major")} placeholder="Search By Major"></input>
              </div>
              <div className="d-flex mt-4 ml-4 mr-4 ">
                <input className="form-control searchBy " onChange={(e) => this.addFilter(e, "level")} placeholder="Search By Career Level"></input>
              </div>


            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App;
