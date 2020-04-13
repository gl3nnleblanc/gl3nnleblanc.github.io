window.onscroll = function() {fixMenuBar()};

var header = document.getElementById("menuBar");
var sticky = header.offsetTop;

function fixMenuBar() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
