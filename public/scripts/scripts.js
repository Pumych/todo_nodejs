/**
 * TODO:
 * 1. Add "v" for todos: text-decoration: line-through; for CSS on div
 * 2. Update to-do view, replace text area with div ($('.editable').each(function(){this.contentEditable = true;});)
 */

(function(window){
    var _plugin = {}, _pluginName = 'TodoList';
    _plugin[_pluginName] = function(){
        var _ = this;
        _.settings = {
            debug: true
        }; // settings

        _.selectors = {
            todoListWrap:   '.todo_wrap',
            todoList:       '.todo_wrap .todo_list',
            todoListDelete: '.todo_wrap .todo_list .delete',
            todoListText:   '.todo_wrap .todo_list .text',
            todoListDone:   '.todo_wrap .todo_list .done',
            todoLogout:     '.todo_wrap .logout',
            todoAddNew:     'form.todo .add-submit',
            todoText:       'form.todo input.insert-text',
            regSubmit:      'form.registration .login-submit',
            regEmail:       'form.registration input[name="email"]',
            regPass:        'form.registration input[name="pass"]',
            regError:       'form.registration .errMessage'
        }; // selectors

        _.vars = {
            urls: {
                getTodo:    '/get_todo',
                addTodo:    '/add_todo',
                removeTodo: '/remove_todo',
                updateTodo: '/update_todo',
                logIn:      '/login',
                logOut:     '/logout'
            },

            dataIdAttr: 'data-id'
        }; // vars

        _.log = function(msg){
            if(!this.settings.debug) return;
            var _args = [_pluginName + ' lib :: '];
            _args = _args.concat(arguments);
            if (typeof console == 'object' && typeof console.log != "undefined") {
                console.info.apply(this, _args);
            }
        }; // log

        _.utils = {
            // Gets list of to-do from DB and updates the page view
            getTodo: function(){
                $.ajax({
                    url: '/get_todo',
                    type: "POST",
                    success: function( data ){
                        var res = JSON.parse(data);
                        console.log( data );
                        var todoHtml = '';
                        console.log( res );
                        for(var todo in res.todos){
                            todoHtml += '<li data-id="'+res.todos[todo]._id+'">';
                            todoHtml += '<span class="buttons"><span class="delete"></span></span>';
                            todoHtml += (res.todos[todo].done) ? '<input class="done" type="checkbox" checked="checked" />' : '<input class="done" type="checkbox" />';
                            todoHtml += '<div class="text done_' + res.todos[todo].done + '" contenteditable="true">'+res.todos[todo].text+'</div></li>';
                        }

                        if($('body .todo_wrap .todoListWrap .todo_list').length == 0){
                            $('body .todo_wrap .todoListWrap').append('<ul class="todo_list"></ul>');
                        }
                        $('body .todo_wrap .todoListWrap .todo_list').html(todoHtml);
                    }
                });
            }, // getTodo()

            // Removes to-do from DB and from page
            removeTodo: function(data){
                $.ajax({
                    url: '/remove_todo',
                    type: 'POST',
                    data: data,
                    success: function( data ){
                        var res = JSON.parse(data);
                        console.log( res );
                        if(res.returnID == "1"){
                            _.utils.getTodo();
                        }
                    }
                });
            }, // removeTodo()

            // Updates the content of to-do
            updateTodo: function(data){
                $.ajax({
                    url: '/update_todo',
                    type: 'POST',
                    data: data,
                    success: function( data ){
                        var res = JSON.parse(data);
                        console.log( res );
                        if(res.returnID == "1"){
                            _.utils.getTodo();
                        }
                    }
                });
            }, // updateTodo()

            // Add new to-do
            addTodo: function(){
                // Add new to-do
                $(_.selectors.todoAddNew).click(function(e){
                    e.preventDefault();

                    var text = $(_.selectors.todoText).val();
                    if(text.length == 0) return;

                    $.ajax({
                        url: _.vars.urls.addTodo,
                        type: "POST",
                        data: {text: text, done: false},
                        beforeSend: function(xhr){},
                        success: function( data ){
                            var res = JSON.parse(data);
                            $(_.selectors.todoText).val('');
                            _.utils.getTodo();
                        }
                    });
                });




            },

            // Login form submit
            loginSubmit: function(){
                $(_.selectors.regSubmit).click(function(e){
                    e.preventDefault();
                    var email = $(_.selectors.regEmail).val();
                    var pass = $(_.selectors.regPass).val();

                    $.ajax({
                        url: _.vars.urls.logIn,
                        type: "POST",
                        data: {user: email, pass: pass},
                        beforeSend: function(xhr){},
                        success: function( data ){
                            console.log('>>> ', data);
                            var res = JSON.parse(data);

                            if(res.returnID == "0"){
                                $(_.selectors.regError).html(res.msg);
                            } else {
                                window.location.replace('todo');
                            }
                        }
                    });
                });
            },

            // Logout
            logOut: function(){
                $(_.selectors.todoLogout).click(function(e){
                    e.preventDefault();

                    $.ajax({
                        url: _.vars.urls.logOut,
                        type: "POST",
                        success: function( data ){
                            console.log('>>> ', data);
                            var res = JSON.parse(data);

                            if(res.returnID == "1")
                                window.location.replace('/');

                        }
                    });
                });
            },

            documentReadyInit: function(){
                if($(_.selectors.todoListWrap).length > 0){
                    _.utils.getTodo();
                }

                // Remove to-do on click "delete"
                $( document ).on( "click", _.selectors.todoListDelete, function() {
                    var data = { todo_id: $(this).parent().parent().attr(_.vars.dataIdAttr)};
                    _.utils.removeTodo(data)
                });

                // Updates to-do on blur
                $( document ).on("blur", _.selectors.todoListText, function(){
                    var dataId = $(this).parent().attr(_.vars.dataIdAttr);

                    if($(this).text().length == 0){
                        _.utils.removeTodo(dataId)
                    } else {
                        console.log( $(this).text() );
                        var data = {todo_id:dataId, text: $(this).text()}
                        _.utils.updateTodo(data);
                    }
                });

                // Updates to-do on "done"
                $( document).on('click', _.selectors.todoListDone, function(){
                    var dataId = $(this).parent().attr(_.vars.dataIdAttr);
                    var data = {todo_id:dataId, doneUpdate: true}
                    _.utils.updateTodo(data);
                });


            },

            // Sets height of textarea compatible
            autogrowTextarea: function(textarea){
                if($(textarea).length > 0){
                    $(textarea).autogrow({onInitialize: true});
                }
            }, // autogrowTextarea

            // Prints on all pages what need to be done in application
            whatTodo: function(){
                if(_.settings.debug){
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
            }
        }; // utils

        _.init = function(){
            _.utils.whatTodo();
            _.utils.loginSubmit();
            _.utils.logOut();
            _.utils.addTodo();
            _.utils.documentReadyInit();
        };

    };
    window[_pluginName] = new _plugin[_pluginName];
}(window));

$(document).ready(function(){

    TodoList.init();

});
