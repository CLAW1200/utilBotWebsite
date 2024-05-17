var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
  // begin particle script


  var WIDTH;
  var HEIGHT;
  var canvas;
  var con;
  var g;
  var pxs = new Array();
  var rint = 60;

  $(document).ready(function(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    $('#container').width(WIDTH).height(HEIGHT);
    canvas = document.getElementById('star-particle');
    $(canvas).attr('width', WIDTH).attr('height',HEIGHT);
    con = canvas.getContext('2d');
    for(var i = 0; i < 100; i++) {
      pxs[i] = new Circle();
      pxs[i].reset();
    }
    setInterval(draw,rint);

    var $container = $('.container');
    $container.mousedown(function(ev){
      var ox = ev.clientX;
      
      $container.mouseup(function(){
        $container.unbind('mousemove');
        $container.unbind('mouseup');
      });
    });
  });

  function draw() {
    con.clearRect(0,0,WIDTH,HEIGHT);
    for(var i = 0; i < pxs.length; i++) {
      pxs[i].fade();
      pxs[i].move();
      pxs[i].draw();
    }
  }

  function Circle() {
    this.s = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

    this.reset = function() {
      this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
      this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
      this.r = ((this.s.rmax-1)*Math.random()) + 1;
      this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
      this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
      this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
      this.rt = Math.random()*this.hl;
      this.s.rt = Math.random()+1;
      this.stop = Math.random()*.2+.4;
      this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
      this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function() {
      this.rt += this.s.rt;
    }

    this.draw = function() {
      if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
      else if(this.rt >= this.hl) this.reset();
      var newo = 1-(this.rt/this.hl);
      con.beginPath();
      con.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      con.closePath();
      var cr = this.r*newo;
      g = con.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
      g.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
      g.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
      g.addColorStop(1.0, 'rgba(77,101,181,0)');
      con.fillStyle = g;
      con.fill();
    }

    this.move = function() {
      this.x += (this.rt/this.hl)*this.dx;
      this.y += (this.rt/this.hl)*this.dy;
      if(this.x > WIDTH || this.x < 0) this.dx *= -1;
      if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
  }

  // end particle script

  // typing effect

    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

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
    // check if dark mode is enabled
    var darkModeEnabled = localStorage.getItem('dark-mode');
    if (darkModeEnabled === 'enabled') {
      darkModeToggle();
    }
    else if (darkModeEnabled === 'disabled') {
      // do nothing
    }
    else {
      // default to dark mode
      darkModeToggle();
    }
    
    // add event listener to button
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
      darkModeToggle();
    });

  };

// call request api to get stats
fetch('/api/stats')
  .then((response) => response.json())
  .then((data) => {
    document.getElementsByClassName('features7-title1')[0].innerHTML = data.users;
    document.getElementsByClassName('features7-title2')[0].innerHTML = data.servers;
    document.getElementsByClassName('features7-title3')[0].innerHTML = data.commands;
  }
);
