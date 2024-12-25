let data = JSON.parse(localStorage.getItem("lectures")) || [];
class lectureList {
  constructor() {}
  showLectureList() {
    display(data);
    function display(data) {
      document.querySelector(".section").innerHTML = ""; // Clear previous content
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");
        div.innerHTML = `
           <div class="details">
            <span>${elem.title}</span>
            <button class="type">${elem.type}</button>
            <p><b>Instructor Name:</b> ${elem.instructor}</p>
            <p><b>Category:</b> ${elem.category}</p>
            <p><b>Link:</b> <a href="${elem.link}" target="_blank">${elem.link}</a></p>
            <p><b>Duration:</b> ${elem.duration}</p>
            <p><b>Time:</b> ${elem.time}</p>
            <p><b>Schedule:</b> ${elem.schedule}</p>
            <p><b>Description:</b> ${elem.description}</p>
          </div>
        `;
        let button = document.createElement("button");
        button.innerText = "Remove";
        button.setAttribute("id", "remove");
        button.addEventListener("click", () => {
          removeLecture(index);
        });
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
    const newLecture = {
      title,
      type,
      category,
      instructor,
      description: description || "No Description",
      link: link || "",
      duration: duration || "No Duration",
      time: time || "No Time",
      schedule,
    };

    data.push(newLecture);
    localStorage.setItem("lectures", JSON.stringify(data));
    this.showLectureList();
  }
}

function showLecture() {
  const list = new lectureList();
  list.showLectureList();
}
showLecture();

function addLecture() {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const instructor = document.getElementById("instructor").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;
  const duration = document.getElementById("duration").value;
  const time = document.getElementById("time").value;
  const schedule = document.getElementById("schedule").value;

  const lecture = new lectureList();
  lecture.addLectureList(title, type, category, instructor, description, link, duration, time, schedule);
}

function showData() {
  const emailData = JSON.parse(localStorage.getItem("currentUser"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData}</p>
  `;
}
showData();
