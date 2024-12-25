let data = JSON.parse(localStorage.getItem("assignments")) || [];

class LectureList {
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
            <p><b>Description:</b> ${elem.description || "N/A"}</p>
            <p><b>Link:</b> <a href="${elem.link}" target="_blank">${elem.link || "N/A"}</a></p>
            <p><b>Duration:</b> ${elem.duration || "N/A"}</p>
            <p><b>Time:</b> ${elem.time || "N/A"}</p>
            <p><b>Schedule:</b> ${elem.schedule}</p>
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
      data.splice(index, 1); // Remove the selected lecture
      localStorage.setItem("assignments", JSON.stringify(data));
      display(data); // Refresh the lecture list
    }
  }

  addLectureList(title, type, instructor, schedule, description, link, duration, time) {
    const newLecture = {
      title,
      type,
      instructor,
      schedule,
      description,
      link,
      duration,
      time: time || this.getCurrentTime(),
    };

    data.push(newLecture); // Add the new lecture to the data array
    localStorage.setItem("assignments", JSON.stringify(data));
    this.showLectureList(); // Refresh the lecture list
  }

  getCurrentTime() {
    const today = new Date();
    return `${today.getHours()}:${String(today.getMinutes()).padStart(2, "0")}`;
  }
}

// Initialize and display lectures
function showLecture() {
  const list = new LectureList();
  list.showLectureList();
}
showLecture();

// Add new lecture
function addLecture() {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  const instructor = document.getElementById("instructor").value;
  const schedule = document.getElementById("schedule").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;
  const duration = document.getElementById("duration").value;
  const time = document.getElementById("time").value;

  const lecture = new LectureList();
  lecture.addLectureList(title, type, instructor, schedule, description, link, duration, time);
}

// Display current user data
function showData() {
  const emailData = JSON.parse(localStorage.getItem("currentUser")) || "Guest";
  document.querySelector(".guest").innerHTML = `
    <p>${emailData}</p>
  `;
}
showData();
