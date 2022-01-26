const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');

const registerUser = [];

form.addEventListener('submit', e => {
   e.preventDefault();

   validate();
   showUsers();
   firstName.focus();
})

const validate = () => {
   let validationErrors = false;
   const firstNameValue = firstName.value;
   const lastNameValue = lastName.value;
   const emailValue = email.value;

   if(firstNameValue === '') {
      validationErrors = true;
      errorFunction(firstName, 'Name cannot be blank');
   } else if (firstNameValue.length < 2) {
      validationErrors = true;
      errorFunction(firstName, 'Name must be atleast 2 characters');
   } else {
      successFunction(firstName);
      firstName.value = ''
   }

   if(lastNameValue === '') {
      validationErrors = true;
      errorFunction(lastName, 'Name cannot be blank');
   } else if (lastNameValue.length < 2) {
      validationErrors = true;
      errorFunction(lastName, 'Name must be atleast 2 characters');
   } else {
      successFunction(lastName);
      lastName.value = ''
   }

   if(emailValue === '') {
      validationErrors = true;
      errorFunction(email, 'Email cannot be blank');
   } else if (!emailFunction(emailValue)) {
      validationErrors = true;
      errorFunction(email, 'Email is not valid');
   } else {
      successFunction(email);
      email.value = ''
   }

   console.log(validationErrors);
   if(validationErrors !== true) {
      const user = {
         id: Date.now().toString(),
         firstName: firstNameValue,
         lastName: lastNameValue,
         email: emailValue
      }
      registerUser.push(user);
   } 
   console.log(registerUser);
}

const showUsers = () => {
   const newUser = document.querySelector('#user');
   newUser.innerHTML = '';
   for(let i = 0; i < registerUser.length; i++) {
      newUser.innerHTML += `
      <div>${registerUser[i].firstName} ${registerUser[i].lastName}</div>
      <small><a href="">${registerUser[i].email}</a></small>`
   }
}


const errorFunction = (input, message) => {
   const formControl = input.parentElement;
   const small = formControl.querySelector('small');
   small.innerText = message;
   formControl.classList.remove('success');
   formControl.classList.add('error');
}

const successFunction = input => {
   const formControl = input.parentElement;
   formControl.classList.add('success');
   formControl.classList.remove('error');
}

const emailFunction = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

