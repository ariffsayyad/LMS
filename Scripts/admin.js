let data = JSON.parse(localStorage.getItem("users")) || [];

class userList {
  constructor() {}

  // Show the user list with login count, ensuring each email is unique
  showUserList() {
    display(data);
    function display(data) {
      document.querySelector(".user-list").innerHTML = "";
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("details");
        div.innerHTML = `
          <p>${elem.email}</p>
          <p>${elem.pass}</p>
          <p>${elem.usertype}</p>
          <p>Login Count: ${elem.loginCount || 0}</p>
        `;
        let div2 = document.createElement("div");
        let p = document.createElement("p");
        p.setAttribute("id", "remove");
        p.innerText = "Remove";
        p.addEventListener("click", () => {
          removeUser(elem, index);
        });
        div2.append(p);
        div.appendChild(div2);
        document.querySelector(".user-list").append(div);
      });
    }

    // Remove user function
    function removeUser(elem, index) {
      data.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(data));
      display(data);
    }
  }

  // Add new student/user data, checking if email already exists
  addStudentData(e, p, t) {
    const existingUser = data.find(user => user.email === e);

    // If user exists, update the password and user type (don't add a duplicate)
    if (existingUser) {
      existingUser.pass = p;  // Update password if email exists
      existingUser.usertype = t;  // Update user type if needed
    } else {
      this.email = e;
      this.pass = p;
      this.usertype = t;
      this.loginCount = 0; // Initialize login count for new users
      data.push(this);
    }

    localStorage.setItem("users", JSON.stringify(data));
    this.showUserList();
  }

  // Increment the login count
  incrementLoginCount(email) {
    const user = data.find(user => user.email === email);
    if (user) {
      user.loginCount = (user.loginCount || 0) + 1;
      localStorage.setItem("users", JSON.stringify(data));
    }
  }
}

// Show the user list
function showUser() {
  let list = new userList();
  list.showUserList();
}

showUser();

// Add new student data to the list
function addStudent() {
  event.preventDefault();
  let e = document.getElementById("email").value;
  let p = document.getElementById("pass").value;
  let t = document.getElementById("type").value;
  let student = new userList();
  student.addStudentData(e, p, t);
}

// Display current user data (if logged in)
function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData}</p>
    `;
}

showData();

// Function to handle user login and increment login count
function userLogin(email) {
  let list = new userList();
  list.incrementLoginCount(email);
  updateDashboard(); // Update the admin dashboard after login
}

// Function to update the admin dashboard with the login count
function updateDashboard() {
  let list = new userList();
  list.showUserList();
}

// Example: Simulate user login and track login count
// Call userLogin with the email when a user logs in
// For example: userLogin('user@example.com');





function userLogin(email, password) {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    // Update the UI with login count
    console.log(data);
    // Example: Update your dashboard with the new login count
  })
  .catch(error => console.error("Error:", error));
}
