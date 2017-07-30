var Projects = function(){}

Projects.listProjects = function(success, error) {
    $.ajax({
        method: 'GET',
        url: RestAPI.projects,
        crossDomain: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        },
        data: {
            email: sessionStorage.getItem('wakanda-user-email'),
            token: sessionStorage.getItem('wakanda-user-token')
        }
    }).success(success).error(function(jqXHR, textStatus, response, thrownError) {
        if(response.statusCode === 401) {
            redirectIndex();
        } else {
            error.call(jqXHR, textStatus, response, thrownError);
        }
    });
};