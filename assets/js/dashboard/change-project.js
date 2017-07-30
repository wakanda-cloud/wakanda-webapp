$(function() {
    if(window.location.href.indexOf("dashboard") > -1) {
        let $changeProjectMenu = $('#changeProjectMenu');
        Projects.listProjects(function(data, status) {
            JSON.parse(data).forEach(function(element) {
                $changeProjectMenu.find('ul').append(createProjectItem(element));
            });
        });
        $changeProjectMenu.show();
    }
});

function createProjectItem(project) {
    let $li = $('<li></li>');
    $li.attr('alt', project.name);
    $li.bind('click', function() {
        fetchProjects($(this).attr('alt'));
    });
    return $li.append($('<a href="#">' + project.company + " - " + project.name + '</a>'));
}