function darkModeToggle() {
  //css dark mode
  document.body.classList.toggle('dark-mode');
  //invert button
  var btn = document.getElementById('dark-mode-toggle');
  btn.classList.toggle('inverted');
  //invert logo img
  img = document.getElementsByClassName("footer4-logo1");
  for (i = 0; i < img.length; i++) {
    img[i].classList.toggle('inverted');
  }
  // invert footer line
  line = document.getElementsByClassName('thq-divider-horizontal');
  for (i = 0; i < line.length; i++) {
    //set bg color to white or black
    line[i].style.backgroundColor = line[i].style.backgroundColor === 'rgb(255, 255, 255)' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
  }

  //set img src to light.png or dark.png
  var img = document.getElementById('dark-mode-toggle');
  var src = img.getAttribute('src');
  if (src == 'light.png') {
    img.src = 'dark.png';
    // set box shadow to black
    for (let j = 2; j <= 7; j++) {
      let box = document.getElementsByClassName(`features23-container${j}`);
      for (let i = 0; i < box.length; i++) {
        //set box shadow to black
        box[i].style.boxShadow = 'rgba(0, 0, 0, 1) 2px 2px 4px 0px';
      }
    }
    //save flag to local storage
    localStorage.setItem('dark-mode', 'disabled');
  } else {
    img.src = 'light.png';
    //set box shadow to white
    for (let j = 2; j <= 7; j++) {
      let box = document.getElementsByClassName(`features23-container${j}`);
      for (let i = 0; i < box.length; i++) {
        //set box shadow to white
        box[i].style.boxShadow = 'rgba(255, 255, 255, 1) 2px 2px 4px 0px';
      }
    }
    //save flag to local storage
    localStorage.setItem('dark-mode', 'enabled');
  } 
}


window.onload = function() {  
    // check if dark mode is enabled
    var darkModeEnabled = localStorage.getItem('dark-mode');
    if (darkModeEnabled === 'enabled') {
      document.body.style.transition = 'none';
      darkModeToggle();
      setTimeout(function() {
        document.body.style.transition = '';
      }, 1000);
    }
    else if (darkModeEnabled === 'disabled') {
      // do nothing
    }
    else {
      // default to dark mode
      // darkModeToggle();
    }
    
    // add event listener to button
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
      darkModeToggle();
    });
};

