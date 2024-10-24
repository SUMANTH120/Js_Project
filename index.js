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

//books here
const books = [
    {
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A novel set in the Great Depression that explores themes of racial injustice and moral growth.",
      price: 18.99
    },
    {
      name: "1984",
      author: "George Orwell",
      description: "A dystopian novel about a totalitarian regime that uses surveillance and mind control to maintain power.",
      price: 15.99
    },
    {
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A critique of the American Dream, centered on wealth, love, and tragedy in the 1920s.",
      price: 14.99
    },
    {
      name: "Pride and Prejudice",
      author: "Jane Austen",
      description: "A classic romantic novel that examines the manners, education, and marriage in early 19th century England.",
      price: 12.99
    },
    {
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      description: "A story of teenage angst and alienation, focusing on a young man's disillusionment with society.",
      price: 17.99
    },
    {
      name: "Moby Dick",
      author: "Herman Melville",
      description: "An epic tale of obsession and revenge, following Captain Ahab's hunt for the elusive white whale.",
      price: 16.50
    },
    {
      name: "Brave New World",
      author: "Aldous Huxley",
      description: "A dystopian novel set in a technologically advanced future where individuality and freedom are suppressed.",
      price: 14.50
    },
    {
      name: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "A fantasy novel following the adventures of Bilbo Baggins as he embarks on a journey to reclaim a treasure.",
      price: 13.99
    },
    {
      name: "War and Peace",
      author: "Leo Tolstoy",
      description: "A sweeping historical novel that chronicles the lives of aristocratic families during the Napoleonic Wars.",
      price: 22.50
    },
    {
      name: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      description: "A philosophical novel that explores faith, free will, and morality through the lives of three brothers.",
      price: 19.99
    },
    {
      name: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      description: "A psychological drama about a young man's moral dilemma after committing a murder.",
      price: 14.99
    },
    {
      name: "Jane Eyre",
      author: "Charlotte Brontë",
      description: "A Gothic romance that follows the orphaned Jane Eyre's journey to independence and love.",
      price: 11.99
    },
    {
      name: "Wuthering Heights",
      author: "Emily Brontë",
      description: "A dark and passionate tale of love and revenge set on the Yorkshire moors.",
      price: 10.99
    },
    {
      name: "The Odyssey",
      author: "Homer",
      description: "An ancient Greek epic poem chronicling Odysseus' long and perilous journey home after the Trojan War.",
      price: 13.99
    },
    {
      name: "The Iliad",
      author: "Homer",
      description: "An epic poem about the events of the Trojan War and the hero Achilles' rage and its consequences.",
      price: 13.50
    },
    {
      name: "The Divine Comedy",
      author: "Dante Alighieri",
      description: "A narrative poem depicting Dante's journey through Hell, Purgatory, and Heaven.",
      price: 17.50
    },
    {
      name: "Anna Karenina",
      author: "Leo Tolstoy",
      description: "A complex novel exploring love, infidelity, and social norms in 19th-century Russian society.",
      price: 15.99
    },
    {
      name: "Frankenstein",
      author: "Mary Shelley",
      description: "A Gothic horror novel about a scientist who creates life, only to face the tragic consequences.",
      price: 9.99
    },
    {
      name: "Dracula",
      author: "Bram Stoker",
      description: "A Gothic horror novel that introduced Count Dracula and established many conventions of vampire fiction.",
      price: 12.99
    },
    {
      name: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      description: "A novel about the moral degeneration of a man whose portrait ages while he remains youthful.",
      price: 11.99
    },
    {
      name: "Les Misérables",
      author: "Victor Hugo",
      description: "A sprawling novel about social injustice, redemption, and revolution in 19th-century France.",
      price: 18.99
    },
    {
      name: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      description: "An epic tale of revenge, as Edmond Dantès escapes from prison and seeks justice against those who betrayed him.",
      price: 16.99
    },
    {
      name: "Don Quixote",
      author: "Miguel de Cervantes",
      description: "A comic novel about an aging man who sets out to revive chivalry, only to have his delusions lead to misadventure.",
      price: 14.99
    },
    {
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      description: "A coming-of-age story about Holden Caulfield, a rebellious teenager facing the realities of adulthood.",
      price: 17.99
    },
    {
      name: "Fahrenheit 451",
      author: "Ray Bradbury",
      description: "A dystopian novel about a future society where books are banned and 'firemen' burn them.",
      price: 13.50
    },
    {
      name: "The Road",
      author: "Cormac McCarthy",
      description: "A post-apocalyptic novel about a father and son’s journey through a devastated landscape.",
      price: 12.99
    },
    {
      name: "The Grapes of Wrath",
      author: "John Steinbeck",
      description: "A novel about the struggles of a family during the Great Depression as they travel west seeking a better life.",
      price: 14.99
    },
    {
      name: "East of Eden",
      author: "John Steinbeck",
      description: "A multi-generational epic that examines the nature of good and evil through two families.",
      price: 15.99
    },
    {
      name: "Moby Dick",
      author: "Herman Melville",
      description: "A seafaring adventure that explores obsession, revenge, and the clash between man and nature.",
      price: 16.50
    },
    {
      name: "Beloved",
      author: "Toni Morrison",
      description: "A novel about an escaped slave haunted by the memory of her daughter and the horrors of slavery.",
      price: 11.50
    },
    {
      name: "Lolita",
      author: "Vladimir Nabokov",
      description: "A controversial novel about a man’s obsession with a young girl, written with dazzling linguistic skill.",
      price: 13.99
    },
    {
      name: "Middlemarch",
      author: "George Eliot",
      description: "A novel that examines the social and political issues of a provincial town through a wide array of characters.",
      price: 17.99
    },
    {
      name: "The Sun Also Rises",
      author: "Ernest Hemingway",
      description: "A novel that portrays a group of disillusioned expatriates living in Europe after World War I.",
      price: 12.50
    },
    {
      name: "The Old Man and the Sea",
      author: "Ernest Hemingway",
      description: "A novella about an old fisherman’s struggle to catch a giant marlin in the Gulf Stream.",
      price: 9.99
    },
    {
      name: "The Stranger",
      author: "Albert Camus",
      description: "A novel about a disaffected man who becomes involved in a senseless murder, exploring existential themes.",
      price: 11.99
    },
    {
      name: "Catch-22",
      author: "Joseph Heller",
      description: "A satirical novel set during World War II that explores the absurdity of war and bureaucracy.",
      price: 14.99
    },
    {
      name: "Slaughterhouse-Five",
      author: "Kurt Vonnegut",
      description: "A satirical novel about a soldier’s experience of the firebombing of Dresden during World War II.",
      price: 13.50
    },
    {
      name: "The Handmaid’s Tale",
      author: "Margaret Atwood",
      description: "A dystopian novel set in a future where women’s rights have been stripped away and a theocratic dictatorship rules.",
      price: 14.99
    },
    {
        name: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        description: "A magical realist novel that chronicles the rise and fall of the Buendía family in the fictional town of Macondo.",
        price: 18.99
    },
    {
        name: "The Sound and the Fury",
        author: "William Faulkner",
        description: "A novel that uses multiple narrative styles to depict the decline of the Compson family in the American South.",
        price: 12.99
    },
    {
        name: "Invisible Man",
        author: "Ralph Ellison",
        description: "A novel about an African American man whose race makes him invisible in a racially divided society.",
        price: 16.99
    },
    {
        name: "On the Road",
        author: "Jack Kerouac",
        description: "A novel that captures the restless spirit of America’s postwar Beat Generation as they search for meaning and adventure.",
        price: 11.50
    },
    {
        name: "The Bell Jar",
        author: "Sylvia Plath",
        description: "A semi-autobiographical novel about a young woman’s struggle with mental illness.",
        price: 13.99
    },
    {
        name: "A Clockwork Orange",
        author: "Anthony Burgess",
        description: "A dystopian novel set in a near-future society where teenage delinquency is rampant, and explores themes of free will.",
        price: 14.99
    },
    {
        name: "Dune",
        author: "Frank Herbert",
        description: "A science fiction novel set in a desert world, focusing on politics, religion, and ecology.",
        price: 15.99
    },
    {
        name: "The Shining",
        author: "Stephen King",
        description: "A horror novel about a family isolated in a haunted hotel, and the psychic powers of their son.",
        price: 16.99
    },
    {
        name: "The Left Hand of Darkness",
        author: "Ursula K. Le Guin",
        description: "A science fiction novel that explores themes of gender and sexuality on a planet where inhabitants can change gender.",
        price: 12.99
    },
    {
        name: "Rebecca",
        author: "Daphne du Maurier",
        description: "A Gothic novel about a young woman who is haunted by the memory of her husband's first wife.",
        price: 11.99
    },
    {
        name: "The Kite Runner",
        author: "Khaled Hosseini",
        description: "A novel that traces the journey of a young boy from Kabul and explores themes of friendship, guilt, and redemption.",
        price: 14.99
    },
    {
        name: "Life of Pi",
        author: "Yann Martel",
        description: "A novel about a young boy stranded on a lifeboat with a Bengal tiger, blending spirituality and adventure.",
        price: 12.50
    },
    {
        name: "The Road",
        author: "Cormac McCarthy",
        description: "A post-apocalyptic novel about a father and son’s journey through a desolate world.",
        price: 13.99
    },
    {
        name: "The Color Purple",
        author: "Alice Walker",
        description: "A novel about African American women in the South facing racism, sexism, and domestic violence.",
        price: 12.50
    },
    {
        name: "The Book Thief",
        author: "Markus Zusak",
        description: "A novel set in Nazi Germany, narrated by Death, and follows a young girl who steals books to cope with the horrors of war.",
        price: 11.99
    },
    {
        name: "The Alchemist",
        author: "Paulo Coelho",
        description: "A philosophical novel about a shepherd's journey to find treasure, which ultimately leads to self-discovery.",
        price: 10.99
    },
    {
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        description: "A non-fiction book that explores the history and impact of the human species from prehistoric times to the present.",
        price: 16.99
    },
    {
        name: "Educated",
        author: "Tara Westover",
        description: "A memoir about a woman who grows up in a survivalist family and eventually escapes to pursue an education.",
        price: 14.99
    },
    {
        name: "The Night Circus",
        author: "Erin Morgenstern",
        description: "A fantasy novel about a magical competition set in a mysterious traveling circus.",
        price: 15.50
    },
    {
        name: "Gone Girl",
        author: "Gillian Flynn",
        description: "A psychological thriller about a husband suspected of being involved in his wife's disappearance.",
        price: 14.99
    },
    {
        name: "The Goldfinch",
        author: "Donna Tartt",
        description: "A Pulitzer Prize-winning novel about a young boy who survives an explosion in an art museum and becomes attached to a painting.",
        price: 17.99
    },
    {
        name: "The Underground Railroad",
        author: "Colson Whitehead",
        description: "A historical fiction novel that reimagines the Underground Railroad as an actual railway system helping slaves escape.",
        price: 13.50
    },
    {
        name: "Big Little Lies",
        author: "Liane Moriarty",
        description: "A domestic thriller about three women whose lives unravel as secrets come to light.",
        price: 12.99
    },
    {
        name: "The Girl on the Train",
        author: "Paula Hawkins",
        description: "A psychological thriller about a woman who becomes obsessed with the lives of people she watches from her train.",
        price: 11.99
    },
    {
        name: "The Light We Lost",
        author: "Jill Santopolo",
        description: "A romance novel about two people whose love endures through years of separation and life changes.",
        price: 10.99
    },
    {
        name: "Americanah",
        author: "Chimamanda Ngozi Adichie",
        description: "A novel that explores race, identity, and immigration through the eyes of a Nigerian woman living in the U.S.",
        price: 14.99
    },
    {
        name: "Where the Crawdads Sing",
        author: "Delia Owens",
        description: "A mystery novel about a young girl who grows up isolated in the marshes of North Carolina and becomes a murder suspect.",
        price: 12.99
    },
    {
        name: "The Silent Patient",
        author: "Alex Michaelides",
        description: "A psychological thriller about a woman who stops speaking after being accused of murdering her husband.",
        price: 13.50
    },
    {
        name: "Normal People",
        author: "Sally Rooney",
        description: "A novel that follows the complex relationship between two young people from school to adulthood.",
        price: 13.99
    },
    {
        name: "Circe",
        author: "Madeline Miller",
        description: "A retelling of the myth of Circe, a powerful sorceress, as she navigates her exile and encounters with gods and mortals.",
        price: 15.50
    },
    {
        name: "The Water Dancer",
        author: "Ta-Nehisi Coates",
        description: "A historical fiction novel about a young man with a mystical power who escapes slavery via the Underground Railroad.",
        price: 14.99
    },
    {
        name: "Little Fires Everywhere",
        author: "Celeste Ng",
        description: "A novel about race, privilege, and motherhood in a seemingly perfect suburban community.",
        price: 13.99
    },
    {
        name: "The Overstory",
        author: "Richard Powers",
        description: "A novel that explores the interconnectedness of human lives and nature, centering around trees and environmental activism.",
        price: 16.50
    },
    {
        name: "The Testaments",
        author: "Margaret Atwood",
        description: "A sequel to 'The Handmaid's Tale,' set 15 years after the original story.",
        price: 14.99
    },
    {
        name: "Becoming",
        author: "Michelle Obama",
        description: "A memoir by the former First Lady of the United States, detailing her life from childhood through the White House years.",
        price: 19.99
    },
    {
        name: "The Nightingale",
        author: "Kristin Hannah",
        description: "A historical fiction novel about two sisters in Nazi-occupied France during World War II.",
        price: 14.99
    },
    {
        name: "A Gentleman in Moscow",
        author: "Amor Towles",
        description: "A novel about a Russian aristocrat sentenced to house arrest in a luxury hotel during the early years of the Soviet Union.",
        price: 17.50
    },
    {
        name: "The Tattooist of Auschwitz",
        author: "Heather Morris",
        description: "A historical novel based on the true story of a man",
        price: 18.25
    }
]


localStorage.setItem('books', JSON.stringify(books));

// Retrieve books from localStorage
const storedBooks = JSON.parse(localStorage.getItem('books'));

function generateBookCards() {
  const bookList = document.getElementById('book-list');
  
  storedBooks.forEach(book => {
    const cardHTML = `
      <div class="col-md-4 my-3">
        <div class="card h-100">
          <img src="img_avatar3.png" alt="${book.name}">
          <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">Author: ${book.author}</p>
            <p class="card-text">Description: ${book.description}</p>
            <p class="card-text">Price: $${book.price}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
      </div>
    `;
    
    bookList.innerHTML += cardHTML;
  });
}

// Call the function to generate cards
generateBookCards();