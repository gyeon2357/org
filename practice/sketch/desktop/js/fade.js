
function setup() {
  initializeFields();
  createCanvas(windowWidth, windowHegiht);
  noCursor();
}

function draw() {
  background(1);
  if (mouseIsPressed === true) {
      cursor(HAND);
  } else {
      cursor(CROSS);
  }
  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

function initializeFields() {
}

// fade

jQuery(function($) {
  $("body").css("display", "none");
  $("body").fadeIn(2000);
  $("div.transition").click(function(event){
  event.preventDefault();
  linkLocation = this.href;
  $("body").fadeOut(2000, redirectPage);
  });
  function redirectPage() {
  window.location = linkLocation;
  }
  });

  // weather


  $(document).ready(function() {

    let weatherIcon = {
    
    '01' : 'fas fa-sun',
    
    '02' : 'fas fa-cloud-sun',
    
    '03' : 'fas fa-cloud',
    
    '04' : 'fas fa-cloud-meatball',
    
    '09' : 'fas fa-cloud-sun-rain',
    
    '10' : 'fas fa-cloud-showers-heavy',
    
    '11' : 'fas fa-poo-storm',
    
    '13' : 'far fa-snowflake',
    
    '50' : 'fas fa-smog'
    
    };
    
    
    $.ajax({
    
    url:'http://api.openweathermap.org/data/2.5/weather?q=paju&appid=39a27d1b1124599930efac4a39fb8e8f&units=metric',
    
    
    dataType:'json',
    
    type:'GET',
    
    success:function(data){
    
    var $Icon = (data.weather[0].icon).substr(0,2);
    
    var $Temp = Math.floor(data.main.temp) + 'º';
    
    var $city = data.name;
    
    
    $('.CurrIcon').append('<i class="' + weatherIcon[$Icon] +'"></i>');
    
    $('.CurrTemp').prepend($Temp);
    
    $('.City').append($city);
    
    }
    
    })
    
    });
    

    // particle../


var NUM_PARTICLES = ( ( ROWS = 100 ) * ( COLS = 100) ),
THICKNESS = Math.pow( 100, 2 ),
SPACING = 2,
MARGIN = window.innerHeight + 550,
COLOR = 25,
DRAG = 1,
EASE = 0.5,

/*

used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

B = 4 / Math.PI,
C = -4 / Math.pow( Math.PI, 2 ),
P = 0.225,

*/

container,
particle,
canvas,
mouse,
stats,
list,
ctx,
tog,
man,
dx, dy,
mx, my,
d, t, f,
a, b,
i, n,
w, h,
p, s,
r, c
;

particle = {
vx: 0,
vy: 0,
x: 0,
y: 0
};

function init() {

container = document.getElementById( 'lineBox' );
canvas = document.createElement( 'canvas' );

ctx = canvas.getContext( '2d' );
man = false;
tog = true;

list = [];

w = canvas.width = COLS * SPACING + MARGIN * 1;
h = canvas.height = ROWS * SPACING + MARGIN * 1;

container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
container.style.marginTop = Math.round( h * -0.5 ) + 'px';

for ( i = 0; i < NUM_PARTICLES; i++ ) {

p = Object.create( particle );
p.x = p.ox = MARGIN + SPACING * ( i % COLS );
p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

list[i] = p;
}

container.addEventListener( 'mousemove', function(e) {

bounds = container.getBoundingClientRect();
mx = e.clientX - bounds.left;
my = e.clientY - bounds.top;
man = true;

});

if ( typeof Stats === 'function' ) {
document.body.appendChild( ( stats = new Stats() ).domElement );
}

container.appendChild( canvas );
}

function step() {

if ( stats ) stats.begin();

if ( tog = !tog ) {

if ( !man ) {

  t = +new Date() * 0.1;
  mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
  my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
}
  
for ( i = 0; i < NUM_PARTICLES; i++ ) {
  
  p = list[i];
  
  d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
  f = -THICKNESS / d;

  if ( d < THICKNESS ) {
    t = Math.atan2( dy, dx );
    p.vx += f * Math.cos(t);
    p.vy += f * Math.sin(t);
  }

  p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
  p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

}

} else {

b = ( a = ctx.createImageData( w, h ) ).data;

for ( i = 0; i < NUM_PARTICLES; i++ ) {

  p = list[i];
  b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
}

ctx.putImageData( a, 0, 0 );
}

if ( stats ) stats.end();

requestAnimationFrame( step );
}

init();
step();