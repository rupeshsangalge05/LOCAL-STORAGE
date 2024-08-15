function registration() {
    document.getElementById(".registerForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById(".email").value;
        const fName = document.getElementById(".fName").value;
        const lName = document.getElementById(".lName").value;
        const contact = document.getElementById(".contact").value;
        const password = document.getElementById(".password").value;
        const cPassword = document.getElementById(".cPassword").value;

        if (password !== cPassword) {
            alert("Password doesn't match!")
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || []

        const userAlreadyExist = users.some(user => user.email === email)

        if (userAlreadyExist) {
            alert("User already exist with this email!");
        } else {
            users.push({ email, fName, lName, contact, password, cPassword });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful!");
            window.location.href = "login.html"
        }

    })
}
registration();


function login() {

    document.getElementById(".loginForm").addEventListener("submit", function (e) {
        e.preventDefault()
        const email = document.getElementById(".email").value;
        const password = document.getElementById(".password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid rmail or password!!");
        }
    });
}

login();

function dashboard(){
    window.onload = () => {
        const loggedInUser  = JSON.parse(localStorage.getItem("loggedInUser"));

        if(!loggedInUser){
            alert("You have must be logged in to see this dashboard ");
            window.location.href = "login.html";
        }else{
            document.getElementById("user").textContent = loggedInUser.fName;
        }

        var logoutBtn = document.getElementById("logout")
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }
}
dashboard();