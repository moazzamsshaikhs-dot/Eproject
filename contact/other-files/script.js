let name_error = document.querySelector("#name-error");
let phone_error = document.querySelector("#phone-error");
let email_error = document.querySelector("#email-error");
let message_error = document.querySelector("#message-error");
let submit_error = document.querySelector("#submit-error");
let container = document.querySelector(".container");
let locationInfo = document.querySelector("#location-info");
let mapFrame = document.querySelector("#map-frame");


function validatename(){
    let name = document.querySelector("#contact-name").value;

    if(name.length == 0){
        name_error.innerHTML = 'Name is required';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        name_error.innerHTML = 'Write full name with space';
        return false;
    }
    name_error.innerHTML = "<i class='fas fa-check-circle'></i>";
    return true;
}

function  validatephone(){
     let phone = document.querySelector("#contact-phone").value;

     if(phone.length == 0){
        phone_error.innerHTML = "Phone No is required";
        return false;
     }
     if(phone.length !== 11){
        phone_error.innerHTML = "Phone No should be 11 digits";
        return false;
     }
     if(!phone.match(/^[0-9]{11}$/)){
        phone_error.innerHTML = "Only digits please."
        return false;
     }

     phone_error.innerHTML = "<i class='fas fa-check-circle'></i>";
     return true;
}

function validateemail(){
     let email = document.querySelector("#contact-email").value;

     if(email.length == 0){
        email_error.innerHTML = "Email is required";
        return false;
     }
     if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        email_error.innerHTML = "Email Invalid"
        return false;
     }
     email_error.innerHTML = "<i class='fas fa-check-circle'></i>";
     return true;
}

function validatePassword(){
    let password = document.querySelector("#Password");
    let msg = document.querySelector("#msg");
    let str = document.querySelector("#str");

     if(password.value.length > 0){
        msg.style.display = "block";
    }
    else{
        msg.style.display = "none";
    }

    if(password.value.length < 4){
        str.innerHTML = "'weak'";
        password.style.borderColor = "#ff5925";
        str.style.color = "#ff5925";
        return false;
    }
    
    else if(password.value.length >= 4 && password.value.length < 8){
        str.innerHTML = "'medium'";
        password.style.borderColor = "orange";
        str.style.color = "orange";
        return false;
    }
    else if(password.value.length >= 8){
        str.innerHTML = "<i class='fas fa-check-circle'></i>";
        password.style.borderColor = "#26d730";
        str.style.color = "#26d730";
    }
    return true;
}


function validatemessage(){
        let message = document.querySelector("#contact-message").value;
        let required = 30;
        let left = required - message.length;

        if(left > 0){
         message_error.innerHTML = left + 'more characters required';
         return false;
        }

        message_error.innerHTML = "<i class='fas fa-check-circle'></i>";
        return true;

}


function validateform(){
   if(!validatename() || !validatephone() || !validateemail() || !validatePassword() || !validatemessage()){
      submit_error.style.display = "block";
      submit_error.innerHTML = 'please fix error to submit';
      setTimeout(function(){submit_error.style.display = "none";},3000);
    }else{
        container.style.display = "none";
        openpopup();
    }
    return false;
}
function openpopup(){
   popup.classList.add("open-popup");
}

function closepopup(){
   popup.classList.remove("open-popup");
}


// Scroll Observer
    const animatedElements = document.querySelectorAll(
      ".fade-up, .fade-left, .fade-right, .zoom-in, .fade-rotate, .bounce-in, .blur-in"
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function () {
 // Geolocation Functions
        function getLocation() {
            if (navigator.geolocation) {
                locationInfo.innerHTML = "Getting your location...";
                navigator.geolocation.getCurrentPosition(success, error);
            } else { 
                locationInfo.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Display location info
            locationInfo.innerHTML = `
                <strong>Latitude:</strong> ${latitude.toFixed(6)}<br>
                <strong>Longitude:</strong> ${longitude.toFixed(6)}<br>
                <strong>Accuracy:</strong> ${position.coords.accuracy} meters
            `;
            
            // Create Google Maps embed URL
            const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
            
            // Set iframe source to show the location on a map
            mapFrame.src = mapUrl;
        }

        function error() {
            locationInfo.innerHTML = "Sorry, we couldn't retrieve your location. Please check if location services are enabled.";
            mapFrame.style.display = "none";
        }

getLocation();
});
