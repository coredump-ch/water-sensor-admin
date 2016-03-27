// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('Coredump Watersensor API').baseApiUrl('http://localhost:3000/api/');

    var sponsor = nga.entity('sponsors').updateMethod('patch');
    var sensor = nga.entity('sensors').updateMethod('patch');
    var measurement = nga.entity('measurements').updateMethod('patch');

    sponsor.listView().fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('active', 'boolean')
    ]);
    sponsor.showView().fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('description', 'text'),
        nga.field('active', 'boolean')
    ]);
    sponsor.creationView().fields([
        nga.field('name'),
        nga.field('description', 'text'),
        nga.field('active', 'boolean')
    ]);
    sponsor.editionView().fields(sponsor.creationView().fields());

    sensor.listView().fields([
        nga.field('id'),
        nga.field('device_name'),
        nga.field('caption'),
        nga.field('location'),
        nga.field('sponsor_id', 'reference')
            .targetEntity(sponsor)
            .targetField(nga.field('name'))
            .label('Sponsor')
    ]);
    sensor.showView().fields(sensor.listView().fields());
    sensor.creationView().fields([
        nga.field('device_name'),
        nga.field('caption'),
        nga.field('location')
    ]);
    sensor.editionView().fields(sensor.creationView().fields());

    measurement.listView().fields([
        nga.field('id'),
        nga.field('temperature'),
        nga.field('created_at', 'datetime'),
        nga.field('sensor_id', 'reference')
            .targetEntity(sensor)
            .targetField(nga.field('caption'))
            .label('Sensor')
    ]);

    admin.addEntity(sponsor);
    admin.addEntity(sensor);
    admin.addEntity(measurement);

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
