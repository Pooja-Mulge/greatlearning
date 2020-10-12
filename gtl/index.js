document.addEventListener('DOMContentLoaded', (event) => {
	var acc = document.getElementsByClassName("accordion");
	var panel = document.getElementsByClassName('panel');

	for (var i = 0; i < acc.length; i++) {
	    acc[i].onclick = function() {
	        var setClasses = !this.classList.contains('active');
	        setClass(acc, 'active', 'remove');
	        setClass(panel, 'show', 'remove');

	        if (setClasses) {
	            this.classList.toggle("active");
	            this.nextElementSibling.classList.toggle("show");
	        }
	    }
	}

	function setClass(els, className, fnName) {
	    for (var i = 0; i < els.length; i++) {
	        els[i].classList[fnName](className);
	    }
	}

	let currentSlide = 0;
	const slides = document.querySelectorAll(".slide")
	const dots = document.querySelectorAll('.dot')

	const init = (n) => {
	  slides.forEach((slide, index) => {
	    slide.style.display = "none"
	  	dots.forEach((dot, index) => {
	      dot.classList.remove("active")
	    })
	  })
	  slides[n].style.display = "block"
	  dots[n].classList.add("active")
	}
	document.addEventListener("DOMContentLoaded", init(currentSlide))
	const next = () => {
	  currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++
	  init(currentSlide)
	}

	const prev = () => {
	  currentSlide <= 0 ? currentSlide = slides.length - 1 : currentSlide--
	  init(currentSlide)
	}

	document.querySelector(".next").addEventListener('click', next)

	document.querySelector(".prev").addEventListener('click', prev)
	dots.forEach((dot, i) => {
	  dot.addEventListener("click", () => {
	    console.log(currentSlide)
	    init(i)
	    currentSlide = i
	  })
	})


	const formId = "save-later-form"; // ID of the form
	const url = location.href; //  href for the page
	const formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
	const saveButton = document.querySelector("#applyNow"); // select save button
	let form = document.querySelector(`#${formId}`); // select form
	let formElements = form.elements;
	let privacyCheck = document.querySelector("#privacy"); 
	
	const getFormData = () => {
		if(validateForm()){
		  let data = { [formIdentifier]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
		  for (const element of formElements) {
		    if (element.name.length > 0) {
		      data[formIdentifier][element.name] = element.value;
		    }
		    if(data[formIdentifier][element.name] == "accept"){
		    	if(privacyCheck.checked == true){
		    		data[formIdentifier][element.name] = true;
			    }else{
			    	data[formIdentifier][element.name] = false;
			    }
		    }
		   
		  }
		  return data;
		}
	};

	saveButton.onclick = event => {
	  event.preventDefault();
	  data = getFormData();
	  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
	  const message = "Form draft has been saved!";
	  alert(message);
	};

	const populateForm = () => {
	  if (localStorage.key(formIdentifier)) {
	    const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
	    for (const element of formElements) {
	      if (element.name in savedData) {
	        element.value = savedData[element.name];
	      }
	      if(savedData[element.name] == "accept" && savedData[element.name] == true){
		    	document.getElementById('privacy').setAttribute('checked','checked');
		    }else{
		    	document.getElementById('privacy').setAttribute('checked', '');
		    }
	    }
	    // const message = "Form has been refilled with saved data!";
	    // alert(message);
	  }
	};
	document.onload = populateForm();

	function printError(elemId, hintMsg) {
	    document.getElementById(elemId).innerHTML = hintMsg;
	}

	function validateForm() {
    // Retrieving the values of form elements 
    var name = document.getstartedForm.name.value;
    var email = document.getstartedForm.email.value;
    var mobile = document.getstartedForm.number.value;
    var experience = document.getstartedForm.experience.value;
    var currentorganization = document.getstartedForm.currentorganization.value;
    var privacy = false;
        if(document.getElementById("privacy").checked) {
            privacy = true;
        }else{
        	privacy = false;
        }
   
    
	// Defining error variables with a default value
    var nameErr = emailErr = mobileErr = experienceErr = organizationErr = privacyErr = true;
    
    // Validate name
    if(name == "") {
        printError("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }
    
    // Validate email address
    if(email == "") {
        printError("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else{
            printError("emailErr", "");
            emailErr = false;
        }
    }
    
    // Validate mobile number
    if(mobile == "") {
        printError("mobileErr", "Please enter your mobile number");
    } else {
        var regex = /^[1-9]\d{9}$/;
        if(regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid 10 digit mobile number");
        } else{
            printError("mobileErr", "");
            mobileErr = false;
        }
    }
    
    // Validate country
    if(experience == "") {
        printError("experienceErr", "Please select your experience");
    } else {
        printError("experienceErr", "");
        experienceErr = false;
    }
    
    //Validate currentorganization
    if(currentorganization == ""){
    	printError("organizationErr", "Please select your current organization");
    } else {
        printError("organizationErr", "");
        organizationErr = false;
    }

    // Validate privacy
    if(privacy == false) {
        printError("privacyErr", "Please accept privacy");
    } else {
        printError("privacyErr", "");
        privacyErr = false;
    }
    
    // Prevent the form from being submitted if there are any errors
    if((nameErr || emailErr || mobileErr || experienceErr || organizationErr || privacyErr) == true) {
       return false;
    } else {
        return true;
    }
};
});
