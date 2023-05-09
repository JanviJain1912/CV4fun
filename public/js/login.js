function toggleMenu() {
  let menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

// login form and signup form

const pass_field = document.querySelector('.pass-key');
         const showBtn = document.querySelector('.show');
         showBtn.addEventListener('click', function(){
          if(pass_field.type === "password"){
            pass_field.type = "text";
            showBtn.textContent = "HIDE";
            showBtn.style.color = "#3498db";
          }else{
            pass_field.type = "password";
            showBtn.textContent = "SHOW";
            showBtn.style.color = "#222";
          }
         });

form.addEventListener("submit" , () => {
  const login = {
      email: email.value,
      password: password.value
  }
  fetch("/api/login",{
      method: "POST",
      body: JSON.stringify(login),
      headers:{
          "Content-type" : "application/json"
      }
  }).then(res => res.json())
    .then(data => {
      if(data.status == "error"){
          success.style.display = "none"
          error.style.display = "block"
          error.innerText = data.error
      } else{
          error.style.display = "none"
          success.style.display = "block"
          success.innerText = data.success
          // window.location.replace('../public/main.html') ;
      }
  });
});

