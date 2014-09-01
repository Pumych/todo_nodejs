$(document).ready(function(){
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
                var res = JSON.parse(data);
//                console.log('>>> ');
//
//                if(!res.returnID){
//                    $('form.registration .errMeassage').text(res.msg);
//                } else {
//                    alert('gotodo');
//                }
            }
         });
    });
});

