$(document).ready(function(){

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
    $('.todo_list textarea').autogrow({onInitialize: true});

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
});

