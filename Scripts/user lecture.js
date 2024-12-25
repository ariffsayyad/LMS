let data = JSON.parse(localStorage.getItem("lectures")) || [];

class lectureList {
  constructor() {
    // Initialize properties
    this.title = '';
    this.type = '';
    this.category = '';
    this.instructor = '';
    this.description = '';
    this.link = '';
    this.duration = '';
    this.time = '';
    this.schedule = '';
  }

  showLectureList() {
    display(data);

    function display(data) {
      document.querySelector(".section").innerHTML = "";
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");
        div.innerHTML = `
          <div class="details">
            <span>${elem.title}</span>
            <button class="type">${elem.type}</button>
            <p><b>Instructor Name:</b> ${elem.instructor}</p>
            <p><b>Link:</b> <a href="${elem.link}" target="_blank">${elem.link}</a></p>
            <p><b>Duration:</b> ${elem.duration}</p>
            <p><b>Time:</b> ${elem.time}</p>
            <p><b>Schedule:</b> ${elem.schedule}</p>
            <p><b>Description:</b> ${elem.description}</p>
          </div>
        `;
        let button = document.createElement("button");
        
        div.appendChild(button);
        document.querySelector(".section").append(div);
      });
    }

    function removeLecture(index) {
      data.splice(index, 1);
      localStorage.setItem("lectures", JSON.stringify(data));
      display(data);
    }
  }

  addLectureList(title, type, category, instructor, description, link, duration, time, schedule) {
    this.title = title;
    this.type = type;
    this.category = category;
    this.instructor = instructor;
    this.description = description;
    this.link = link;
    this.duration = duration;
    this.time = time;
    this.schedule = schedule;

    data.push(this);
    localStorage.setItem("lectures", JSON.stringify(data));
    this.showLectureList();
  }
}

function addLecture(event) {
  event.preventDefault();
  
  let title = document.getElementById("title").value;
  let type = document.getElementById("type").value;
  let category = document.getElementById("category").value;
  let instructor = document.getElementById("instructor").value;
  let description = document.getElementById("description").value;
  let link = document.getElementById("link").value;
  let duration = document.getElementById("duration").value;
  let time = document.getElementById("time").value;
  let schedule = document.getElementById("schedule").value;

  let lecture = new lectureList();
  lecture.addLectureList(title, type, category, instructor, description, link, duration, time, schedule);
}

function showLecture() {
  let list = new lectureList();
  list.showLectureList();
}

showLecture();

function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `<p>${emailData}</p>`;
}

showData();
