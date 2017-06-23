$(function(){
  $("#hamburger-menu").click(function(){
    $(this).toggleClass("open");
    $("#sidebar").toggleClass("open");
  })  
});