const header = document.getElementById('menuBar');
const sticky = header.offsetTop;

function fixMenuBar() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

window.onscroll = () => { fixMenuBar(); };
