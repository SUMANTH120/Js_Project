let loginButton = document.getElementById("login");
let newwindow;

// Function to open the login window
function myopen() {
    newwindow = window.open("", "LoginWindow", "width=400,height=400");

    // Add login form to the new window
    newwindow.document.write(`
        <html>
        <head>
            <title>Login</title>
            <style>
                form {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    width: 80%;
                    margin: auto;
                }
                h2 {
                    text-align: center;
                }
                input[type="text"], input[type="password"] {
                    width: 90%;
                    padding: 8px;
                    margin: 5px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                input[type="submit"] {
                    width: 95%;
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                input[type="submit"]:hover {
                    background-color: #0056b3;
                }
                p {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h2>Login</h2>
            <form id="loginForm">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required><br><br>

                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br><br>

                <input type="submit" value="Login"><br><br>

                <p>Are you a new user? <a href="#" id="signupLink">Sign Up</a></p>
            </form>

            <p id="message"></p>

            <script>
                // Login form handling
                document.getElementById("loginForm").addEventListener("submit", function(event) {
                    event.preventDefault();

                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;

                    // Retrieve password from localStorage
                    const storedPassword = localStorage.getItem(username);

                    if (storedPassword === password) {
                        document.getElementById("message").innerText = "Login successful!";
                        window.opener.replaceLoginButtonWithUsername(username);  // Call to replace login button in parent window
                        setTimeout(() => {
                            window.close();  // Close the window after a successful login
                        }, 1000);
                    } else {
                        document.getElementById("message").innerText = "Invalid username or password!";
                    }
                });

                // Handle the Sign Up link click
                document.getElementById("signupLink").addEventListener("click", function(event) {
                    event.preventDefault();
                    openSignUpForm();
                });

                // Function to open the Sign Up form
                function openSignUpForm() {
                    document.body.innerHTML = \`
                        <h2>Sign Up</h2>
                        <form id="signUpForm">
                            <label for="newUsername">Username:</label><br>
                            <input type="text" id="newUsername" name="newUsername" required><br><br>

                            <label for="newPassword">Password:</label><br>
                            <input type="password" id="newPassword" name="newPassword" required><br><br>

                            <input type="submit" value="Sign Up"><br><br>
                        </form>
                        <p id="signupMessage"></p>
                    \`;

                    // Handle the Sign Up form submission
                    document.getElementById("signUpForm").addEventListener("submit", function(event) {
                        event.preventDefault();

                        const newUsername = document.getElementById("newUsername").value;
                        const newPassword = document.getElementById("newPassword").value;

                        // Check if username already exists
                        if (localStorage.getItem(newUsername)) {
                            document.getElementById("signupMessage").innerText = "Username already taken!";
                        } else {
                            // Store the new user data in localStorage
                            localStorage.setItem(newUsername, newPassword);
                            document.getElementById("signupMessage").innerText = "Sign Up successful! You can now log in.";
                        }
                    });
                }
            </script>
        </body>
        </html>
    `);
}

// Attach event listener to the login button
loginButton.addEventListener("click", myopen);

// Function to replace the login button with the username after successful login
function replaceLoginButtonWithUsername(username) {
    loginButton.outerHTML = `<p>Welcome, ${username}!</p>`;
}
