// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '92.222.9.74',
        port: '56723',
        endpoints: {
            oneUsers: '/users/:username',
            allUsers: '/api/users',
            exists: '/users/exists',
            updateUsers: '/users/update',
            authenticate: '/login',
            signup: '/users/sign-up',
            validateAccount: '/users/validateAccount/:emailToken',
            allHouses: '/houses/house',
            addHouse: '/add/house',
            removeHouse: '/houses/:houseId',
            uploadFileHouse: '/houses/uploadFile/:houseId',
            fileHouse: '/houses/file/:id',
            rooms: '/rooms',
            roomsByHouse: '/rooms/:houseName',
            phases: '/phases',
            historic : {
                getHistoricByUser: '/historic',
                getHistoricByUserByMonth: '/historic/month',
                getHistoricByUserByYear: '/historic/year'
            },
            tasks: {
                allTasks: '/tasks',
                oneTask: '/tasks/:id',
                allTasksForUser: '/tasks',
                next: '/tasks/next/:id',
                upload : '/uploadFile/:id',
                dowload : '/downloadFile/:fileName/:id',
                fileNames : '/fileNames/:id',
                comment : '/commentaire/:id'
            },
            allSkills: '/skills',
            oneSkill: '/skills/:idSkill',
            oneSubSkill: '/skill/subskill/:id',
            onePrestataire: '/add/prestataire',
            allShortcuts: '/shortcuts',
            addShortcut: '/add/shortcuts',
            oneShortcut: '/interlocuteur/:id',
            interlocuteur: '/interlocuteur'
        }
    }
};
