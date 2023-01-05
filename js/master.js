
// Random Background Option 
let backgroundOption = true;
 // variable to control the Interval 

    let backgroundOnterval;

    // check id there's local storage random background Item
    let backgroundlocalitem = localStorage.getItem("background_option");

    // check if random background local is not empty 
    
    if (backgroundlocalitem !== null) {

        console.log(backgroundlocalitem);
        console.log(typeof(backgroundlocalitem));

        if (backgroundlocalitem === "true") {
            backgroundOption = true;
        }
        else {
            backgroundOption = false;
        }
        // remove active class from all spans 
        document.querySelectorAll(".random-background span").forEach(element => {
            element.classList.remove("active")
        });

        if (backgroundlocalitem === "true") {
            document.querySelector(".random-background .yes").classList.add("active");

        } else {

            document.querySelector(".random-background .no").classList.add("active");

        }
    }


// check if there's local Storage Color Option 

let mainColors= localStorage.getItem("color-option");

console.log(mainColors);

if (mainColors !== null) {
    console.log('Local Storage is Not Empty you can set it on Root now');
    document.documentElement.style.setProperty('--main-color',mainColors);

    
    //remove active class from all colors list items 

    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        // add active class on element with data-color ===  local storage items 

        if (element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        }
    });

}


// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
    
};
// Switch Colors 
const colorsLi= document.querySelectorAll(".color-list li");

// console.log(colorsLi);
// loop on all list items
colorsLi.forEach(li => {

    // console.log(li);
    //loop on list items 
    li.addEventListener("click",(e)=> {
        // console.log(e.target.dataset.color);
        // set coloron Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        //set color on local storage 
        localStorage.setItem('color-option',e.target.dataset.color);

        handleActive(e);

    });

});
// Switch random background option
const randomBackEl= document.querySelectorAll(".random-background span");

// console.log(randomBackEl);
// loop on all span
randomBackEl.forEach(span => {

    // console.log(li);
    //loop on list items 
    span.addEventListener("click",(e)=> {

        handleActive(e);
            if (e.target.dataset.background === "yes")
            {
                backgroundOption = true;
                randomizeImgs();

                localStorage.setItem("background_option", true);
            
            }
            else {

                backgroundOption = false;
                clearInterval(backgroundOnterval);
                localStorage.setItem("background_option", false);

            }
    });

});

//selecting landing page element 

let landingPange = document.querySelector(".landing-page");

//get arrays of imgs 

let imgsArray= ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];


// function to randomize imgs 
function randomizeImgs() {
    if (backgroundOption === true) {

        backgroundOnterval = setInterval(()=> {

            // Get Random number 
            
            let randomNumber = Math.floor(Math.random()* imgsArray.length);
            // console.log(randomNumber);
            
            // change background img url 
            
            landingPange.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
            }, 10000);
    }
}

randomizeImgs();


// Select skills Selector 

let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
    // Skills Offset top 

    let skillsOffsetTop = ourSkills.offsetTop;

    //skills outer height 

    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height 

    let windowHeight = this.innerHeight;

    //window scroll top 

    let windowScrollTop= this.pageYOffset;

    // this.console.log(skillsOffsetTop);

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        // this.console.log ("Skills section reached");
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        })

    }
    if ( windowScrollTop >800) {

        document.getElementById("btn2").style.display = "block";
    
    }
    else {
        document.getElementById("btn2").style.display = "none";

    }
}

// create popup with the image 

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach (img => {
    img.addEventListener('click', (e) => {




        //create Overlay Element 

        let overlay = document.createElement("div");

        //add class to overlay 
        overlay.className ='popup-overlay';

        //append Overlay to the Body 
        document.body.appendChild(overlay);

        //create the pop up box
        let popupBox = document.createElement("div");

        // add class to popup box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            //create heading
            let imgHeading = document.createElement("h3")

            // create text for heading 
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading 
            imgHeading.appendChild(imgText);

            // append the heading to the popup box 
            popupBox.appendChild(imgHeading);

        }

        // create the image 

        let popupImage= document.createElement("img");

        // set image source 

        popupImage.src = img.src;


        // add image to popup box 

        popupBox.appendChild(popupImage);
        // console.log(popupBox);

        //append the popup box to body 
        document.body.appendChild(popupBox);

        //create the Close Span 

        let closeButton = document.createElement("span");

        // create the close Button Text 

        let closeButtonText =document.createTextNode("X");

        // create text to close button 
        closeButton.appendChild(closeButtonText);

        // add class to close button 
        closeButton.className = 'close-button';

        //add close button to popupbox 

        popupBox.appendChild(closeButton);

    });
})

// close popup 
document,addEventListener("click", function (e) {

    if(e.target.className == 'close-button') {

        //remove the current popup 
        e.target.parentNode.remove();
        // remove overlay 
        document.querySelector(".popup-overlay").remove();
    }
})


// select all Bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
const upbtn = document.querySelectorAll(".btn");



// allBullets.forEach(bullet => {
//     bullet.addEventListener("click",(e)=> {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

function scrollToSomewhere (elements) {
    elements.forEach(ele => {
        ele.addEventListener("click",(e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
scrollToSomewhere(upbtn);


// handle active state 

function handleActive(ev) {

            // remove active class from all childrens 
            ev.target.parentElement.querySelectorAll(".active").forEach(element => {
                element.classList.remove("active");
            });
            // add active class on self
            ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

    span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

    bulletsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show') {

    bulletsContainer.style.display = 'block';

    localStorage.setItem("bullets_option", 'block');

    } else {

    bulletsContainer.style.display = 'none';

    localStorage.setItem("bullets_option", 'none');

    }

    handleActive(e);

});

});


// Reset option button 

document.querySelector(".reset-options").onclick = function (){
    // localStorage.clear(); lw kol 7aga bdon ma a7did
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("random-background");
    //reload window
    window.location.reload();


}

// toggel menu 

let toggleBtn = document.querySelector(".toggle-menu ");
let tlinks =document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // stop propagation 
    e.stopPropagation();
    //toggle class 'menu-activ' on button
    this.classList.toggle("menu-active");
    // toggle class 'open' on links
    tlinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button 
document.addEventListener("click",(e) => {
    if (e.target !== toggleBtn && e.target !== tlinks) {
        //check if menu is open 
        if (tlinks.classList.contains("open")) {

    //toggle class 'menu-activ' on button
    toggleBtn.classList.toggle("menu-active");
    // toggle class 'open' on links
    tlinks.classList.toggle("open");
        }
    }
});

// stop propegation on menu

tlinks.onclick = function(e) {

    e.stopPropagation();
}