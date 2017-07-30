var ProjectHelper = new Helper();

ProjectHelper.anyProjectRegistered = {
    actions: [
        {element: '#addProjectBtn', action: GlowElement}
    ],
    notification: "message_project_help_without_projects",
    stopTrigger: [
        {element: '#addProjectBtn', event: "click"}
    ]
};

ProjectHelper.createFirstProject = {
    actions: [
        {element: '#apiKey', action: GlowElement},
        {element: '#encryptKey', action: GlowElement}
    ],
    notification: "message_how_to_use_api",
    stopTrigger: [
        {element: 'body', event: "click"}
    ]
};
