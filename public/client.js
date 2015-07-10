$(function(){

  $.get('/tasks', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var taskData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/tasks', data: taskData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(taskName){
      appendToList([taskName]);
      form.trigger('reset');
    });
  });

  function appendToList(tasks) {
    var list = [];
    var content, task;
    for(var i in tasks){
      task = tasks[i];
      content = '<a href="/tasks/'+task+'">'+task+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-task="'+task+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.task-list').append(list)
  }


  $('.task-list').on('click', 'a[data-task]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + target.data('task')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
