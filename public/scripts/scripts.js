/**
 * TODO:
 * 1. Add "v" for todos: text-decoration: line-through; for CSS on div
 * 2. Update to-do view, replace text area with div ($('.editable').each(function(){this.contentEditable = true;});)
 */

$(document).ready(function(){

    // If on to-do page get todos
    if($('.todo_wrap').length > 0){
        getTodo();
    }

    // Remove to-do on click "delete"
    $( document ).on( "click", ".todo_wrap .todo_list .delete", function() {
        var data = { todo_id: $(this).parent().parent().attr('data-id')};
        removeTodo(data)
    });

    // Updates to-do on blur
    $( document ).on("blur", '.todo_list .text',function(){
        var dataId = $(this).parent().attr('data-id');

        if($(this).text().length == 0){
            removeTodo(dataId)
        } else {
            console.log( $(this).text() );
            var data = {todo_id:dataId, text: $(this).text()}
            updateTodo(data);
        }
    });

    $( document).on('click', '.todo_list .done', function(){
        var dataId = $(this).parent().parent().attr('data-id');
        var data = {todo_id:dataId, doneUpdate: true}
        updateTodo(data);
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
//    if($('.todo_list textarea').length > 0){
//        $('.todo_list textarea').autogrow({onInitialize: true});
//    }

    // Add new to-do
    $('.todo .add-submit').click(function(e){
        e.preventDefault();

        var text = $('form.todo input.insert-text').val();
        if(text.length == 0) return;

        $.ajax({
            url: '/add_todo',
            type: "POST",
            data: {text: text, done: false},
            beforeSend: function(xhr){},
            success: function( data ){
                var res = JSON.parse(data);
                $('form.todo input.insert-text').val('');
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

    whatTodo();
});

// Gets list of to-do from DB and updates the page view
function getTodo(){
    $.ajax({
        url: '/get_todo',
        type: "POST",
        success: function( data ){
            var res = JSON.parse(data);
            console.log( data );
            var todoHtml = '';
            for(var todo in res.todos){
                todoHtml += '<li data-id="'+res.todos[todo]._id+'">';
                todoHtml += '<span class="buttons"><span class="done"></span><span class="delete"></span></span><input type="checkbox" />';
                todoHtml += '<div class="text done_'+res.todos[todo].done +'" contenteditable="true">'+res.todos[todo].text+'</div></li>';
            }

            if($('body .todo_wrap .todo_list').length == 0){
                $('body .todo_wrap').append('<ul class="todo_list"></ul>');
            }
            $('body .todo_wrap .todo_list').html(todoHtml);
        }
    });
}

// Removes to-do from DB and from page
function removeTodo(data){
    $.ajax({
        url: '/remove_todo',
        type: 'POST',
        data: data,
        success: function( data ){
            var res = JSON.parse(data);
            console.log( res );
            if(res.returnID == "1"){
                getTodo();
            }
        }
    });
}

// Updates the content of to-do
function updateTodo(data){
    $.ajax({
        url: '/update_todo',
        type: 'POST',
        data: data,
        success: function( data ){
            var res = JSON.parse(data);
            console.log( res );
            if(res.returnID == "1"){
                getTodo();
            }
        }
    });
}

//Sets to-do as done
//function setDone(dataId, done){
//    $.ajax({
//        url: '/update_todo',
//        type: 'POST',
//        data: { todo_id: dataId, done: done },
//        success: function( data ){
//            var res = JSON.parse(data);
//            console.log( res );
//            if(res.returnID == "1"){
//                getTodo();
//            }
//        }
//    });
//}

// Prints on all pages what need to be done in application
function whatTodo(){
    var list ='';
    var listArr = [
        "Animated hover etc.",
        "Stay logged in for 1 hour"
    ];

    list += '<ol class="whatTodo">';
    for(var item in listArr){
        list += '<li>' + listArr[item] + '</li>';
    }
    list += '</ol>';
    $('body').append(list);
}