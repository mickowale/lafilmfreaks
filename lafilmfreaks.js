// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  // We do most of the necassary javascript here.


  /* For the movie page */

  function getProgressBarClass (value) {
    if (value <= 3) return "green";
    else if (value <= 7) return "orange";
    else return "red";
  }
  $('.progressBar').click(function (e) {
    var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
        y = e.pageY - this.offsetTop,  // or e.offsetY
        clickedValue = x * this.max / this.offsetWidth,
        adjusted_value = Math.round (clickedValue)
  this.value = adjusted_value;	
  $(this).removeClass()
  $(this).addClass (getProgressBarClass(this.value));
    // this.style.color = "blue";
});

});
