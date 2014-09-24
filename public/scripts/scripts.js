$(document).ready(function(){

//    if(getCookie('todoLoggedIn')=='1'){
//        window.location.replace('todo');
//    }

    // Login form submit
    $('form.registration .login-submit').click(function(e){
        e.preventDefault();
        var email = $('.registration input[name="email"]').val();
        var pass = $('.registration input[name="pass"]').val();

        $.ajax({
            url: '/login',
            type: "POST",
            data: {user: email, pass: pass},
            beforeSend: function(xhr){},
            success: function( data ){
                console.log('>>> ', data);
                var res = JSON.parse(data);

                if(res.returnID == "0"){
                    $('form.registration .errMessage').html(res.msg);
                } else {
                    window.location.replace('todo');
                }
            }
         });
    });

    // Autogrow textarea
    if($('.todo_list textarea').length > 0){
        $('.todo_list textarea').autogrow({onInitialize: true});
    }

    // Add new to-do
    $('.todo .add-submit').click(function(e){
        e.preventDefault();

        var text = $('form.todo textarea').val();
        if(text.length == 0) return;

        $.ajax({
            url: '/add_todo',
            type: "POST",
            data: {text: text},
            beforeSend: function(xhr){},
            success: function( data ){
                console.log('>>> ', data);
                var res = JSON.parse(data);

            }
        });
    });

    $('.todo_wrap .logout').click(function(e){
        e.preventDefault();

        $.ajax({
            url:'/logout',
            type: "POST",
            success: function( data ){
                console.log('>>> ', data);
                var res = JSON.parse(data);

                if(res.returnID == "1")
                    window.location.replace('/');

            }
        });
    });
});

//function setCookie(name, value, days) {
//    if (days) {
//        var date = new Date();
//        date.setTime(date.getTime()+(days*24*60*60*1000));
//        var expires = "; expires="+date.toGMTString();
//    }
//    else var expires = "";
//    document.cookie = name+"="+value+expires+"; path=/";
//}
//
//function getCookie(name) {
//    var nameEQ = name + "=";
//    var ca = document.cookie.split(';');
//    for(var i=0;i < ca.length;i++) {
//        var c = ca[i];
//        while (c.charAt(0)==' ') c = c.substring(1,c.length);
//        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//    }
//    return null;
//}
