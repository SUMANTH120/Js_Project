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
                /* Your styling here */
            </style>
        </head>
        <body>
            <h2>Login</h2>
            <form id="loginForm">
                <label for="username">Username:</label><br>
                <input type="text" id="username" required><br><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" required><br><br>
                <input type="submit" value="Login"><br><br>
                <p id="message"></p>
            </form>
            <p>Are you a new user? <a href="#" id="signupLink">Sign Up</a></p>
            
            <script>
                // Handle login
                document.getElementById("loginForm").addEventListener("submit", function(event) {
                    event.preventDefault();
                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;

                    const storedPassword = localStorage.getItem(username);

                    if (storedPassword === password) {
                        // Set the logged-in user
                        localStorage.setItem('currentUser', username);
                        document.getElementById("message").innerText = "Login successful!";
                        window.opener.replaceLoginButtonWithUsername(username);
                        setTimeout(() => { window.close(); }, 1000);
                    } else {
                        document.getElementById("message").innerText = "Invalid username or password!";
                    }
                });

                // Handle sign-up
                document.getElementById("signupLink").addEventListener("click", function(event) {
                    event.preventDefault();
                    document.body.innerHTML = \`
                      <h2>Sign Up</h2>
                      <form id="signUpForm">
                        <label for="newUsername">Username:</label><br>
                        <input type="text" id="newUsername" required><br><br>
                        <label for="newPassword">Password:</label><br>
                        <input type="password" id="newPassword" required><br><br>
                        <input type="submit" value="Sign Up"><br><br>
                      </form>
                      <p id="signupMessage"></p>
                    \`;

                    document.getElementById("signUpForm").addEventListener("submit", function(event) {
                      event.preventDefault();
                      const newUsername = document.getElementById("newUsername").value;
                      const newPassword = document.getElementById("newPassword").value;

                      if (localStorage.getItem(newUsername)) {
                        document.getElementById("signupMessage").innerText = "Username already taken!";
                      } else {
                        localStorage.setItem(newUsername, newPassword);
                        document.getElementById("signupMessage").innerText = "Sign Up successful! You can now log in.";
                      }
                    });
                });
            </script>
        </body>
        </html>
    `);
}

// Attach event listener to the login button
loginButton.addEventListener("click", myopen);
function replaceLoginButtonWithUsername(username) {
  loginButton.outerHTML = `
      <p>Welcome, ${username}!</p>
      <button id="logoutButton">Logout</button>
  `;
  document.getElementById("logoutButton").addEventListener("click", logout);
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  location.reload();  // Reload the page to reset to login state
}
function goBackHome() {
  document.getElementById('book-list').style.display = 'flex';
  document.getElementById('book-list').style.flexWrap = 'wrap'; // Show the book list
  document.getElementById('cart-container').style.display = 'none'; // Hide the cart
}
// Add to cart function
function addToCart(book) {
  const username = localStorage.getItem('currentUser');
  if (!username) {
      alert('Please log in to add items to your cart.');
      return;
  }

  const cartKey = `${username}_cart`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || {};

  if (cart[book.name]) {
      cart[book.name].quantity += 1;
  } else {
      cart[book.name] = { ...book, quantity: 1 };
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`${book.name} added to cart!`);
}

// Display the cart
function displayCart() {
  const username = localStorage.getItem('currentUser');
  if (!username) {
      alert('Please log in to view your cart.');
      return;
  }

  const cartKey = `${username}_cart`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || {};
  const cartContainer = document.getElementById('cart-container');
  const bookList = document.getElementById('book-list');
  
  cartContainer.innerHTML = '';
  cartContainer.style.display = 'block';
  bookList.style.display = 'none';  // Hide books

  // Add Back to Home button


  let total = 0;
  Object.values(cart).forEach(item => {
      total += item.price * item.quantity;
      const cartItemHTML = `
          <div class="cart-item">
              <h5>${item.name}</h5>
              <p>Author: ${item.author}</p>
              <p>Price: $${item.price}</p>
              <p>Quantity: 
                  <button onclick="updateQuantity('${item.name}', -1)">-</button>
                  ${item.quantity}
                  <button onclick="updateQuantity('${item.name}', 1)">+</button>
              </p>
          </div>
      `;
      cartContainer.innerHTML += cartItemHTML;
  });

  cartContainer.innerHTML += `<h3>Total Price: $${total.toFixed(2)}</h3>`;
  cartContainer.innerHTML += `<button id="back-to-home-btn">Back to Home</button>`;

    // Add event listener for the Back to Home button
    document.getElementById('back-to-home-btn').addEventListener('click', goBackHome);
}

// Update quantity of items in cart
function updateQuantity(bookName, change) {
  const username = localStorage.getItem('currentUser');
  if (!username) {
      alert('Please log in to update items in your cart.');
      return;
  }

  const cartKey = `${username}_cart`;
  let cart = JSON.parse(localStorage.getItem(cartKey));

  if (cart[bookName]) {
      cart[bookName].quantity += change;
      if (cart[bookName].quantity <= 0) {
          delete cart[bookName];
      }
      localStorage.setItem(cartKey, JSON.stringify(cart));
      displayCart();
  }
}


// Attach event listener to cart button to show current user's cart
document.getElementById('cart-btn').addEventListener("click", () => {
    document.getElementById('book-list').style.display = 'none';  // Hide books
    displayCart();  // Show cart
});

//books here
const books =[
  {
    "name": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "description": "A gripping, heart-wrenching tale of racial injustice in the Deep South.",
    "price": 18.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxLg0jUsWDZ0ep9YIpZxG2kx7wz6Kh7ddGVQ&s"
  },
  {
    "name": "1984",
    "author": "George Orwell",
    "description": "A dystopian social science novel that delves into totalitarianism and surveillance.",
    "price": 15.99,
    "genre": "Science Fiction",
    "imageLink": "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UY218_.jpg"
  },
  {
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A critique of the American Dream set in the Roaring Twenties.",
    "price": 12.99,
    "genre": "Classic",
    "imageLink": "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UY218_.jpg"
  },
  {
    "name": "Pride and Prejudice",
    "author": "Jane Austen",
    "description": "A classic novel of manners and social expectations in Regency England.",
    "price": 10.99,
    "genre": "Romance",
    "imageLink": "https://m.media-amazon.com/images/I/91HHxxtA1wL._AC_UY218_.jpg"
  },
  {
    "name": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "description": "The timeless story of Holden Caulfield and his disillusionment with society.",
    "price": 14.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr5S-INUFHZcssi583InZW0_oze2H3yrZ2ng&s"
  },
  {
    "name": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "description": "An epic fantasy adventure that sets the standard for modern fantasy.",
    "price": 30.00,
    "genre": "Fantasy",
    "imageLink": "https://elephantbookstore.com/image/cache/catalog/products/fiction/j-r-r-tolkien-the-lord-of-the-rings-6352-950x950.png"
  },
  {
    "name": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "description": "A fantasy classic about the journey of Bilbo Baggins.",
    "price": 15.00,
    "genre": "Fantasy",
    "imageLink": "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UY218_.jpg"
  },
  {
    "name": "Brave New World",
    "author": "Aldous Huxley",
    "description": "A dystopian novel that explores a future shaped by technology and totalitarianism.",
    "price": 16.99,
    "genre": "Science Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-YFJiU73CsqHenp4-yw-Qe6RzyB6qFu_dA&s"
  },
  {
    "name": "Moby-Dick",
    "author": "Herman Melville",
    "description": "The epic tale of Captain Ahab’s obsessive quest to kill the white whale.",
    "price": 18.00,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdN6los4vCodRR4bM5L7au-uP7w3yeNqo4sw&s"
  },
  {
    "name": "War and Peace",
    "author": "Leo Tolstoy",
    "description": "A historical novel that intertwines the lives of Russian aristocracy during the Napoleonic Wars.",
    "price": 22.99,
    "genre": "Historical Fiction",
    "imageLink": "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UY218_.jpg"
  },
  {
    "name": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "description": "A philosophical novel exploring morality, guilt, and redemption.",
    "price": 16.99,
    "genre": "Psychological Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaxgm17YR91vC7dstFGX8RPX2exhBpQd-DcQ&s"
  },
  {
    "name": "Jane Eyre",
    "author": "Charlotte Brontë",
    "description": "The story of a young orphaned girl’s struggle for independence and love.",
    "price": 11.99,
    "genre": "Romance",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrFyufyFnj8z91FuYucJPQx4bZkIVEfFZs-A&s"
  },
  {
    "name": "Wuthering Heights",
    "author": "Emily Brontë",
    "description": "A dark, romantic tale of love and revenge on the Yorkshire moors.",
    "price": 12.50,
    "genre": "Gothic Fiction",
    "imageLink": "data:image/jpeg;base64,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"
  },
  {
    "name": "The Odyssey",
    "author": "Homer",
    "description": "The epic journey of Odysseus as he returns home from the Trojan War.",
    "price": 19.99,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fOB_M8b0EbW54hiw_ybay46S_E_Rse5wRQ&s"
  },
  {
    "name": "The Iliad",
    "author": "Homer",
    "description": "A powerful epic about the Trojan War and the heroism of Achilles.",
    "price": 19.99,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQVu6hCve5R0zYi_JZjcv2diT8Xm3uRjMdw&s"
  },
  {
    "name": "The Divine Comedy",
    "author": "Dante Alighieri",
    "description": "An epic poem that journeys through Hell, Purgatory, and Paradise.",
    "price": 25.99,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTvDJW--mfIMT5gDgY71gThpz9-MxXyG9PWw&s"
  },
  {
    "name": "Catch-22",
    "author": "Joseph Heller",
    "description": "A satirical novel set during WWII that explores absurdity and bureaucracy.",
    "price": 14.99,
    "genre": "Satire",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlRmWjgM-6N1cw8NOz4VkAzeMLszT32AMAfg&s"
  },
  {
    "name": "The Brothers Karamazov",
    "author": "Fyodor Dostoevsky",
    "description": "A philosophical exploration of morality, religion, and free will.",
    "price": 18.99,
    "genre": "Philosophical Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PhB6dZp6gFsSa0dKvkpaGi0vhjDx3tpAYg&s"
  },
  {
    "name": "Anna Karenina",
    "author": "Leo Tolstoy",
    "description": "A tragic love story set in Russian aristocracy, exploring happiness and morality.",
    "price": 17.99,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqOWwW2LEhz-2pI-U0-b8LHkRjq5R3rn8dDw&s"
  },
  {
    "name": "The Alchemist",
    "author": "Paulo Coelho",
    "description": "An allegorical tale of a shepherd's journey to fulfill his personal legend.",
    "price": 10.99,
    "genre": "Adventure",
    "imageLink": "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UY218_.jpg"
  },
  {
    "name": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "description": "The beginning of the magical journey of Harry Potter.",
    "price": 24.99,
    "genre": "Fantasy",
    "imageLink": "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UY218_.jpg"
  },
  {
    "name": "The Da Vinci Code",
    "author": "Dan Brown",
    "description": "A thriller about a secret code hidden in the works of Leonardo da Vinci.",
    "price": 20.99,
    "genre": "Thriller",
    "imageLink": "https://m.media-amazon.com/images/I/91Q5dCjc2KL._AC_UY218_.jpg"
  },
  {
    "name": "The Art of War",
    "author": "Sun Tzu",
    "description": "An ancient Chinese military treatise on strategy and tactics.",
    "price": 9.99,
    "genre": "Philosophy",
    "imageLink": "https://images.cdn.kukufm.com/w:750/f:webp/q:75/https://images.cdn.kukufm.com/f:webp/https://s3.ap-south-1.amazonaws.com/kukufm/channel_icons/7474b104d0c5419782cfe35f9e7d7aba_landscape_920.png"
  },
  {
    "name": "Dune",
    "author": "Frank Herbert",
    "description": "A science fiction saga set in the desert world of Arrakis.",
    "price": 25.99,
    "genre": "Science Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsAJHyLk_5Z-3XYB48JbP_MWUOyIYljtUTg&s"
  },
  {
    "name": "A Brief History of Time",
    "author": "Stephen Hawking",
    "description": "An exploration of the universe, black holes, and time travel.",
    "price": 18.99,
    "genre": "Science",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28iwOkQJ_GJjifquDZd1Zhn37jWHz74KtVg&s"
  },
  {
    "name": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "description": "An exploration of human evolution and the forces that have shaped humanity.",
    "price": 21.99,
    "genre": "Non-Fiction",
    "imageLink": "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UY218_.jpg"
  },
  {
    "name": "The Girl with the Dragon Tattoo",
    "author": "Stieg Larsson",
    "description": "A thriller that combines murder mystery with family saga.",
    "price": 19.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboHBPu6OCgUYi-bUaxtB9EJulRBuhdSTmew&s"
  },
  {
    "name": "The Kite Runner",
    "author": "Khaled Hosseini",
    "description": "A heartbreaking tale of friendship and betrayal in Afghanistan.",
    "price": 17.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbRiXPWVjwWveMUT_YrpHRX8EJEdhtkVYMow&s"
  },
  {
    "name": "Becoming",
    "author": "Michelle Obama",
    "description": "The former First Lady's memoir, detailing her journey and experiences.",
    "price": 18.99,
    "genre": "Biography",
    "imageLink": "https://m.media-amazon.com/images/I/81h2gWPTYJL._AC_UY218_.jpg"
  },
  {
    "name": "Good Omens",
    "author": "Neil Gaiman and Terry Pratchett",
    "description": "A comedic story of an angel and a demon working together to stop Armageddon.",
    "price": 14.99,
    "genre": "Fantasy",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCAHrKUtD4Ix94clu4Jen86KsgOb6ZMbsyFg&s"
  },
  {
    "name": "Educated",
    "author": "Tara Westover",
    "description": "A memoir about a young woman who escapes her survivalist family to pursue an education.",
    "price": 15.99,
    "genre": "Memoir",
    "imageLink": "https://m.media-amazon.com/images/I/81WojUxbbFL._AC_UY218_.jpg"
  },
  {
    "name": "The Night Circus",
    "author": "Erin Morgenstern",
    "description": "A magical, enchanting story of a competition between two young illusionists.",
    "price": 16.99,
    "genre": "Fantasy",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdsItI9TVOgtDKGMZqrzQEA8ozdwFMQm3s1Q&s"
  },
  {
    "name": "The Book Thief",
    "author": "Markus Zusak",
    "description": "A story about a young girl in Nazi Germany, narrated by Death.",
    "price": 12.99,
    "genre": "Historical Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r7aFhLHyuKWa-jWl7Zl9dFa8M8Avo26Cw&s"
  },
  {
    "name": "The Road",
    "author": "Cormac McCarthy",
    "description": "A post-apocalyptic journey of a father and son.",
    "price": 14.99,
    "genre": "Fiction",
    "imageLink": "https://cristinasanders.me/wp-content/uploads/2018/08/the-road1.jpg"
  },
  {
    "name": "The Handmaid's Tale",
    "author": "Margaret Atwood",
    "description": "A dystopian novel about a theocratic society where women have no rights.",
    "price": 13.99,
    "genre": "Dystopian",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5c4b5rSi7iz4xmJ0Qb8xSXXJpOPV23NYdlg&s"
  },
  {
    "name": "The Silent Patient",
    "author": "Alex Michaelides",
    "description": "A psychological thriller about a woman who shoots her husband and then goes silent.",
    "price": 17.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJNavEhQlyUaTpSgSuhvH9RqlVzg6DUPeG_A&s"
  },
  {
    "name": "The Power of Habit",
    "author": "Charles Duhigg",
    "description": "An insightful book on how habits work and how they can be changed.",
    "price": 18.99,
    "genre": "Self-Help",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-7b9QtGpNrS3OwO6iG99tMDxw5W9dAEDikA&s"
  },
  {
    "name": "Gone Girl",
    "author": "Gillian Flynn",
    "description": "A thriller about a husband suspected of murdering his missing wife.",
    "price": 16.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CWYa33HuDsgHW43COLJeUDR1LaNEQw9F3Q&s"
  },
  {
    "name": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "description": "An exploration of the two systems that drive human thought.",
    "price": 19.99,
    "genre": "Psychology",
    "imageLink": "https://differentlywired.co.uk/wp-content/uploads/2017/06/thinking-fast-and-slow.jpg"
  },
  {
    "name": "The Light We Lost",
    "author": "Jill Santopolo",
    "description": "A romance that explores fate, love, and the choices we make.",
    "price": 13.99,
    "genre": "Romance",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7nZ5FdWPsIgwzY0XcaYVlK_WD-zQXMdHLeQ&s"
  },
  {
    "name": "The Secret History",
    "author": "Donna Tartt",
    "description": "A thriller about a group of classics students involved in a murder.",
    "price": 15.99,
    "genre": "Mystery",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCuh46baAH5-f9YzZIJN4YJ5g2_7MLhLNyQ&s"
  },
  {
    "name": "Where the Crawdads Sing",
    "author": "Delia Owens",
    "description": "A mystery set in the marshes of North Carolina.",
    "price": 16.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFYMqHNcRKYO9zEQiOr0J8oDo9UP-aG-0B8g&s"
  },
  {
    "name": "The Poppy War",
    "author": "R.F. Kuang",
    "description": "A fantasy novel inspired by the history of China.",
    "price": 20.99,
    "genre": "Fantasy",
    "imageLink": "https://images.squarespace-cdn.com/content/v1/62d52638c95a125ca4e9aa5b/82026a63-eef3-4821-8d91-13fee8f35023/World-tree-1+%282%29.png"
  },
  {
    "name": "Norwegian Wood",
    "author": "Haruki Murakami",
    "description": "A nostalgic story of love and loss in 1960s Tokyo.",
    "price": 14.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ruqGz23Ulignln90xk7Om-uKjwI_MtdBNQ&s"
  },
  {
    "name": "The Subtle Art of Not Giving a F*ck",
    "author": "Mark Manson",
    "description": "A self-help book that offers a counterintuitive approach to living a good life.",
    "price": 14.99,
    "genre": "Self-Help",
    "imageLink": "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UY218_.jpg"
  },
  {
    "name": "Little Fires Everywhere",
    "author": "Celeste Ng",
    "description": "A novel about the complexities of family, race, and privilege.",
    "price": 14.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsfb9oG3JVonLWJbFLWrQS8EcjmYw43ypVg&s"
  },
  {
    "name": "Normal People",
    "author": "Sally Rooney",
    "description": "A love story between two Irish students exploring class and intimacy.",
    "price": 13.99,
    "genre": "Romance",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBxkjPtopenBhnNHWmfcQ0AmSCnPLgIeqMQ&s"
  },
  {
    "name": "The Outsider",
    "author": "Stephen King",
    "description": "A thriller that combines murder mystery with the supernatural.",
    "price": 20.99,
    "genre": "Horror",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwvXCq8uX7BGfXTj2afDRipnpQvuWXx4JIA&s"
  },
  {
    "name": "The Shining",
    "author": "Stephen King",
    "description": "A horror novel about a family's terrifying stay at the haunted Overlook Hotel.",
    "price": 15.99,
    "genre": "Horror",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRClmmqb3o6uVw5wmu03VurNrGUgwXGLT0bA&s"
  },
  {
    "name": "It",
    "author": "Stephen King",
    "description": "A horror story about children who face an ancient, shape-shifting entity.",
    "price": 25.99,
    "genre": "Horror",
    "imageLink": "https://m.media-amazon.com/images/I/91QQu3SGAWL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "name": "The Silent Corner",
    "author": "Dean Koontz",
    "description": "A thriller about a rogue FBI agent uncovering a sinister conspiracy.",
    "price": 18.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc0jFOpk03ZfcayhJiRpF2J67WpCkcHFjPQQ&s"
  },
  {
    "name": "Big Little Lies",
    "author": "Liane Moriarty",
    "description": "A mystery about secrets and lies in a coastal town.",
    "price": 16.99,
    "genre": "Mystery",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQV-g2kHsJN4yC5J6K-SnWMdT9I-EBqyaRg&s"
  },
  {
    "name": "Sharp Objects",
    "author": "Gillian Flynn",
    "description": "A dark mystery about a journalist investigating murder in her hometown.",
    "price": 15.99,
    "genre": "Mystery",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjtQhoG1fJ-4hg11xU7V-9ttQJPagQ3rIRg&s"
  },
  {
    "name": "The Secret Garden",
    "author": "Frances Hodgson Burnett",
    "description": "A heartwarming story of friendship, healing, and discovery.",
    "price": 10.99,
    "genre": "Classic",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqpd6L1rU70n4Unk85CbefZzkaQ4xCAoYvzQ&s"
  },
  {
    "name": "The Water Dancer",
    "author": "Ta-Nehisi Coates",
    "description": "A magical realist tale about a man escaping slavery in the American South.",
    "price": 16.99,
    "genre": "Historical Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkigFS8xejVP4vpXXIOsleRH3w-2BPWGJJzw&s"
  },
  {
    "name": "The Dutch House",
    "author": "Ann Patchett",
    "description": "A tale of sibling loyalty and family legacy.",
    "price": 15.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMsEDpbNzopyRHcRSZQ7ltTJIhEAhpEvQGg&s"
  },
  {
    "name": "An American Marriage",
    "author": "Tayari Jones",
    "description": "A story of love and racial injustice in modern America.",
    "price": 13.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_Mjb1V-iQR91mnu0MiUN7jH0WFalykHd6A&s"
  },
  {
    "name": "Eleanor Oliphant Is Completely Fine",
    "author": "Gail Honeyman",
    "description": "A heartwarming story about an eccentric woman’s journey to self-acceptance.",
    "price": 12.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxBQ2iGWQkxQ_R8i2svmSamCmJMsDnSPu3w&s"
  },
  {
    "name": "The Woman in the Window",
    "author": "A.J. Finn",
    "description": "A thriller about an agoraphobic woman who witnesses a crime.",
    "price": 16.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSileSbyeiE3xWLtO8t3iOYVpI5oGEtfHvVLw&s"
  },
  {
    "name": "Circe",
    "author": "Madeline Miller",
    "description": "A feminist retelling of the Greek myth of the enchantress Circe.",
    "price": 18.99,
    "genre": "Fantasy",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYkLJ2E4cpGKccqs3zhPjnDFpDSgXRfPnhzw&s"
  },
  {
    "name": "City of Girls",
    "author": "Elizabeth Gilbert",
    "description": "A novel about love, glamour, and adventure in 1940s New York.",
    "price": 17.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAS38u4oo0aCiaFhvqd_1GuDB8sgYIAuBnjg&s"
  },
  {
    "name": "The Alice Network",
    "author": "Kate Quinn",
    "description": "A story of two women in post-WWI Europe hunting down a Nazi collaborator.",
    "price": 16.99,
    "genre": "Historical Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFSdjiBWd1jEte_BWvXgxmMhzoJzWClO5MQ&s"
  },
  {
    "name": "Before We Were Strangers",
    "author": "Renée Carlino",
    "description": "A romance about a second chance at love.",
    "price": 12.99,
    "genre": "Romance",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvj3Bt8UclzZlefIpzFVbTtqoxw0iwy6qg2w&s"
  },
  {
    "name": "All the Light We Cannot See",
    "author": "Anthony Doerr",
    "description": "A WWII novel about a blind French girl and a German boy whose paths collide.",
    "price": 17.99,
    "genre": "Historical Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBCB9bdqJnNMuNzg4CHIeYzCIx7LH6RdqBaw&s"
  },
  {
    "name": "The Girl on the Train",
    "author": "Paula Hawkins",
    "description": "A psychological thriller about a woman who witnesses something shocking.",
    "price": 15.99,
    "genre": "Thriller",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTBiWdz4nZnHLErqgO4NJRDgvn7O6xfkfLjw&s"
  },
  {
    "name": "The Seven Husbands of Evelyn Hugo",
    "author": "Taylor Jenkins Reid",
    "description": "A novel about a Hollywood icon's glamorous and scandalous life.",
    "price": 14.99,
    "genre": "Fiction",
    "imageLink": "https://dailytargum.imgix.net/images/9b2cacea-d2cc-43da-a14d-406fcc6e561a.jpg?ar=16:9&auto=compress&crop=faces&fit=crop&fm=jpg&width=500"
  },
  {
    "name": "Station Eleven",
    "author": "Emily St. John Mandel",
    "description": "A dystopian novel about the aftermath of a global pandemic.",
    "price": 16.99,
    "genre": "Science Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0XPdz74Ly9ulX73JLl7AJvngrUAeProZkw&s"
  },
  {
    "name": "The Giver of Stars",
    "author": "Jojo Moyes",
    "description": "A story about a group of women delivering books in rural America.",
    "price": 17.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGoXz3wAAOjyh6guRFiCuqP8cFA1T0ElSbA&s"
  },
  {
    "name": "The Goldfinch",
    "author": "Donna Tartt",
    "description": "A novel about a young boy’s journey through art, trauma, and obsession.",
    "price": 18.99,
    "genre": "Fiction",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Bkf5wmPZOTLeMq5VhoZOER6L07QjTfbaXQ&s"
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
          <img src="${book.imageLink}" alt="${book.name}">
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

// Function to generate book cards based on search input
function generateBookCards(searchInput = '') {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Clear existing cards

  // Retrieve books from localStorage
  // const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

  // // Filter books based on the search input (case insensitive)
  // const filteredBooks = storedBooks.filter(book => 
  //     book.name.toLowerCase().includes(searchInput.toLowerCase())
  // );
  const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

  // Split the search input into individual words
 
  const searchWords = searchInput.toLowerCase().split(" ");
  
  // Initialize an empty array for the filtered books
  const filteredBooks = [];
  
  // Loop through each book and add it to filteredBooks if it matches any search word
  storedBooks.forEach(book => {
    for (let i = 0; i < searchWords.length; i++) {
      if (book.name.toLowerCase().includes(searchWords[i])) {
        filteredBooks.push(book);
         // Stop further checking if a match is found
      }
    }
  });
  
  

  // Check if there are any matching books
  if (filteredBooks.length === 0) {
      bookList.innerHTML = `<p class="text-center">No books found.</p>`;
      return;
  }

  // Generate cards for filtered books
  filteredBooks.forEach(book => {
      const cardHTML = `
          <div class="col-md-4 my-3">
              <div class="card h-100">
                  <img src="${book.imageLink}" alt="${book.name}" class="card-img-top">
                  <div class="card-body">
                      <h5 class="card-title">${book.name}</h5>
                      <p class="card-text">Author: ${book.author}</p>
                      <p class="card-text">Description: ${book.description}</p>
                      <p class="card-text">Price: $${book.price}</p>
                      <button onclick='addToCart(${JSON.stringify(book)})' class="btn btn-primary">Add to Cart</button>
                  </div>
              </div>
          </div>
      `;
      
      bookList.innerHTML += cardHTML;
  });
}

// Search button functionality
document.getElementById('search-btn').addEventListener('click', function() {
  const searchInput = document.getElementById('search-input').value.trim();
  generateBookCards(searchInput); // Call function with search input
});

// Allow pressing Enter to search
document.getElementById('search-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      const searchInput = document.getElementById('search-input').value.trim();
      generateBookCards(searchInput); // Call function with search input
  }
});

// Call the function to generate cards initially (optional)
// generateBookCards(); // Uncomment if you want to show all cards initially


// function getUsername() {
//   let username = localStorage.getItem('username');
//   if (!username) {
//       username = prompt("Please enter your username:");
//       localStorage.setItem('username', username);
//   }
//   return username;
// }

// const username = getUsername();
// function addToCart(book) {
//   const cartKey = `${username}_cart`;
//   let cart = JSON.parse(localStorage.getItem(cartKey)) || {};

//   if (cart[book.name]) {
//       cart[book.name].quantity += 1;
//   } else {
//       cart[book.name] = { ...book, quantity: 1 };
//   }

//   localStorage.setItem(cartKey, JSON.stringify(cart));
//   alert(`${book.name} added to cart!`);
// }

// // Display cart items as cards and hide the book list
// function displayCart() {
//   const cartKey = `${username}_cart`;
//   const cart = JSON.parse(localStorage.getItem(cartKey)) || {};
//   const bookList = document.getElementById('book-list');
//   const cartContainer = document.getElementById('cart-container');
//   cartContainer.innerHTML = '';
//   cartContainer.style.display = 'flex'; // Show the cart container
//   bookList.style.display = 'none'; // Hide book cards

//   let total = 0;
//   Object.values(cart).forEach(item => {
//       total += item.price * item.quantity;
//       const cartItemHTML = `
//           <div class="col-md-4 my-3">
//               <div class="card h-100">
//                   <div class="card-body">
//                       <h5 class="card-title">${item.name}</h5>
//                       <p class="card-text">Author: ${item.author}</p>
//                       <p class="card-text">Price: $${item.price}</p>
//                       <p class="card-text">
//                           Quantity: 
//                           <button onclick="updateQuantity('${item.name}', -1)">-</button>
//                           ${item.quantity}
//                           <button onclick="updateQuantity('${item.name}', 1)">+</button>
//                       </p>
//                   </div>
//               </div>
//           </div>
//       `;
//       cartContainer.innerHTML += cartItemHTML;
//   });

//   cartContainer.innerHTML += `<div class="col-12"><h3>Total Price: $${total.toFixed(2)}</h3></div>`;
// }

// // Update the quantity of a cart item
// function updateQuantity(bookName, change) {
//   const cartKey = `${username}_cart`;
//   let cart = JSON.parse(localStorage.getItem(cartKey));

//   if (cart[bookName]) {
//       cart[bookName].quantity += change;
//       if (cart[bookName].quantity <= 0) {
//           delete cart[bookName];
//       }
//       localStorage.setItem(cartKey, JSON.stringify(cart));
//       displayCart();
//   }
// }

// // Show cart when the cart button is clicked
// document.getElementById('cart-btn').addEventListener('click', displayCart);

// // Initialize book list on page load
// generateBookCards();
