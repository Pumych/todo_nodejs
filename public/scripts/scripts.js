$(document).ready(function(){

    if($('.todo_wrap').length > 0){
        updateTodo();
    }

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
                var res = JSON.parse(data);
                $('form.todo textarea').val('');
                updateTodo();
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

// Gets list of to-do from DB and updates the page view
function updateTodo(){
    $.ajax({
        url: '/get_todo',
        type: "POST",
        success: function( data ){
            var res = JSON.parse(data);
            var todoHtml = '';
            for(var todo in res.todos){
                todoHtml += '<li data-id="'+res.todos[todo]._id+'">';
                todoHtml += '<span class="buttons"><span class="delete"></span></span>';
                todoHtml += '<div class="text_wrap"><textarea class="text">'+res.todos[todo].text+'</textarea></div></li>';
            }

            if($('body .todo_wrap .todo_list').length == 0){
                $('body .todo_wrap').append('<ol class="todo_list"></ol>');
            }
            $('body .todo_wrap .todo_list').html(todoHtml);
            bindRemoveTodo();
        }
    });
}

function bindRemoveTodo(){
    console.log( 'bindRemoveTodo() init' );
    // Removes to-do from DB and updates the page
    $('.todo_wrap .todo_list .delete').click(function(){
        var dataId = $(this).parent().parent().attr('data-id');
        $.ajax({
            url: '/remove_todo',
            type: 'POST',
            data: { todo_id: dataId },
            success: function( data ){

                var res = JSON.parse(data);
                console.log( res );
                if(res.returnID == "1")
                    $('li[data-id="'+dataId+'"]').remove();
            }
        });
    });
}