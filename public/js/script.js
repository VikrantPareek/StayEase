// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Tax Toggler
let taxSwitch = document.getElementById("switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("taxes");
  for (info of taxInfo) {
    if(info.style.display !== "inline"){
    info.style.display = "inline";
    }else{
      info.style.display = "none"
    }
  }
});
// taxSwitch.addEventListener("click", () => {
//   let body = document.querySelector("body");
//   if(body.style.backgroundColor !== "black"){
//   body.style.backgroundColor = "black";
//   }else {
//      body.style.backgroundColor = "white"
//   }
//   if(body.style.color !== "white"){
//   body.style.color = "white";
//   }else{
//     body.style.color = "black";
//   }
// });
