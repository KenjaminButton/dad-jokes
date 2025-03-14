// This is our main program that gets jokes from the internet!

/**
 * This function gets a new joke from the internet and shows it on our page
 * It's marked as 'async' because we have to wait for the joke to come back from the internet
 */
async function getNewJoke() {
    // First, let's get the parts of our page we need to change
    const button = document.getElementById('jokeButton');
    const jokeElement = document.getElementById('jokeText');
    
    // Show that we're working on getting a new joke
    button.disabled = true;  // Make the button un-clickable while we wait
    jokeElement.textContent = 'Loading...';  // Show "Loading..." while we get the joke

    try {
        // Try to get a joke from the internet
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',  // Tell the website we want the joke in computer-friendly format
                'User-Agent': 'Web Dad Jokes App'  // Tell the website who we are
            }
        });

        // Check if something went wrong
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        // Get the joke from the response and turn it into text we can use
        const data = await response.json();
        
        // Write the joke in the console (like a secret message!)
        console.log('Received joke:', data.joke);
        
        // Show the joke on the page
        jokeElement.textContent = data.joke;
    } catch (error) {
        // If something goes wrong, we'll handle it here
        console.error('Error fetching joke:', error);
        jokeElement.textContent = 'Oops! Failed to fetch a dad joke. Try again?';
    } finally {
        // Whether we got a joke or not, make the button clickable again
        button.disabled = false;
    }
}

// When the page first loads, get our first joke automatically
window.addEventListener('load', getNewJoke);
