/**
 * TODO:
 * 1. Add "v" for todos: text-decoration: line-through; for CSS on div
 * 2. Update to-do view, replace text area with div ($('.editable').each(function(){this.contentEditable = true;});)
 */

$(document).ready(function(){

    if($('.todo_wrap').length > 0){
        getTodo();
    }

    $( document ).on( "click", ".todo_wrap .todo_list .delete", function() {
        var dataId = $(this).parent().parent().attr('data-id');
        removeTodo(dataId)
    });

    // Updates to-do on blur
    $( document ).on("blur", '.todo_list textarea',function(){
        var dataId = $(this).parent().parent().attr('data-id');

        if($(this).val().length == 0){
            removeTodo(dataId)
        } else {
            updateTodo(dataId, $(this).val());
        }
    });


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
                getTodo();
            }
        });
    });

    // Logout
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
function getTodo(){
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
        }
    });
}

// Removes to-do from DB and from page
function removeTodo(dataId){
    $.ajax({
        url: '/remove_todo',
        type: 'POST',
        data: { todo_id: dataId },
        success: function( data ){

            var res = JSON.parse(data);
            console.log( res );
            if(res.returnID == "1"){
                $('li[data-id="'+dataId+'"]').remove();
                getTodo();
            }
        }
    });
}

// Updates the content of to-do
function updateTodo(dataId, dataTodo){
    $.ajax({
        url: '/update_todo',
        type: 'POST',
        data: { todo_id: dataId, text: dataTodo },
        success: function( data ){
            var res = JSON.parse(data);
            console.log( res );
            if(res.returnID == "1"){
                getTodo();
            }
        }
    });
}