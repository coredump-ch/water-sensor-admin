// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Coredump Watersensor API').baseApiUrl('http://localhost:3000/api/');

    // create a measurements entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/measurements/:id
    var measurement = nga.entity('measurements');
    // set the fields of the user entity list view
    measurement.listView().fields([
        nga.field('temperature')
    ]);
    // add the user entity to the admin application
    admin.addEntity(measurement);

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
