// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: 'localhost',
        port: '8080',
        endpoints: {
            oneUsers: '/api/users/:id',
            allUsers: '/api/users',
            authenticate: '/login',
            signup: '/users/sign-up',
            validateAccount: '/users/validateAccount/:emailToken',
            allHouses: '/houses/house',
            addHouse: '/add/house',
            removeHouse: '/houses/:houseId',
            rooms: '/rooms',
            tasks: {
              allTasks: '/tasks',
              oneTask: '/tasks/:id',
              allTasksForUser: '/tasks',
              upload : '/uploadFile/:id',
              dowload : '/downloadFile/:fileName',
              fileNames : '/fileNames/:id'
            },
            allSkills: '/skills',
            oneSkill: '/skills/:idSkill'
        }
    }
};
