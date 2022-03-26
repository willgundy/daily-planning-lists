// import functions and grab DOM elements

import { redirectToPlanner,
    signUp,
    login
} from './fetch-utils.js';

// let state

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');


// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state


signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signInForm);

    const user = await login(data.get('email'), data.get('password'));

    if (user) {
        redirectToPlanner();
    } else {
        window.alert('not a valid user. Please try signing up');
    }
});

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signUpForm);

    const user = await signUp(data.get('email'), data.get('password'));

    if (user) {
        await redirectToPlanner();
    } else {
        window.alert('not a valid user. Please try signing up');
    }
});