$(document).ready(function(){
    $("p").click(function(){
        $('#content').append($('.row:first-child').clone());
    });
});

