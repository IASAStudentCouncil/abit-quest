var date = new Date("27 Aug 2020 00:00:00 GMT+3")
console.log(date)
var bool = true;

var countDownDate = date.getTime();

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var hours = Math.floor(distance / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer__time").innerHTML = hours + "h:"
  + minutes + "m:" + seconds + "s" + (bool ? "|" : "");
  bool = !bool;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer__time").innerHTML = "NOW";
  }
}, 1000);
