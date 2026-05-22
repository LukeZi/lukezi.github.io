const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(name === '' || email === '' || message === '') {

    formMessage.innerHTML = `
      <p style="color: #ef4444; margin-top: 20px;">
        Please fill out all fields.
      </p>
    `;

    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(!email.match(emailPattern)) {

    formMessage.innerHTML = `
      <p style="color: #ef4444; margin-top: 20px;">
        Please enter a valid email address.
      </p>
    `;

    return;
  }

  formMessage.innerHTML = `
    <p style="color: #22c55e; margin-top: 20px;">
      Your message has been sent successfully.
    </p>
  `;

  contactForm.reset();

});