$(document).ready(function(){
    $('form.registration .login-submit').click(function(e){
        e.preventDefault();
        $.ajax({
            url: '/login',
            type: "POST",
            data: {user: "vitaly@gmail.com", pass: "123456"},
            beforeSend: function(xhr){},
            success: function( data ){
                console.log( '>>> complete jqXHR: ', data );
            }
         });
    });
});

