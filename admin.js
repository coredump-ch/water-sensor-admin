var adminApp = angular.module('adminApp', ['ng-admin']);

adminApp.config(['RestangularProvider', function(RestangularProvider) {
    var token = window.prompt('Please specify API token', '0123456789ABCDEF');
    RestangularProvider.setDefaultHeaders({'Authorization': 'Token token=' + token});
}]);

// declare a function to run when the module bootstraps (during the 'config' phase)
adminApp.config(['NgAdminConfigurationProvider', function (nga) {
    var sponsor = nga.entity('sponsors').updateMethod('patch');
    var sensor = nga.entity('sensors').updateMethod('patch');
    var measurement = nga.entity('measurements').updateMethod('patch');

    sponsor.listView().fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('active', 'boolean'),
        nga.field('sensor_ids', 'reference_many')
            .targetEntity(sensor)
            .targetField(nga.field('id'))
    ]);
    sponsor.creationView().fields([
        nga.field('name'),
        nga.field('description', 'text'),
        nga.field('active', 'boolean'),
        nga.field('sensor_ids', 'reference_many')
            .targetEntity(sensor)
            .targetField(nga.field('device_name'))
            .label('Devices')
    ]);
    sponsor.editionView().fields(sponsor.creationView().fields());

    sensor.listView().fields([
        nga.field('id'),
        nga.field('device_name'),
        nga.field('caption'),
        nga.field('latitude', 'number').format('0.0000'),
        nga.field('longitude', 'number').format('0.0000'),
        nga.field('sponsor_id', 'reference')
            .targetEntity(sponsor)
            .targetField(nga.field('name'))
            .label('Sponsor')
    ]);
    sensor.creationView().fields([
        nga.field('device_name'),
        nga.field('caption'),
        nga.field('latitude', 'number').format('0.0000'),
        nga.field('longitude', 'number').format('0.0000')
    ]);
    sensor.editionView().fields(sensor.creationView().fields());

    measurement.listView().fields([
        nga.field('id'),
        nga.field('temperature'),
        nga.field('created_at', 'datetime'),
        nga.field('sensor_id', 'reference')
            .targetEntity(sensor)
            .targetField(nga.field('device_name'))
            .label('Sensor')
    ]);

    // Configure Application
    var admin = nga.application('Coredump Watersensor API').baseApiUrl('http://localhost:3000/api/');

    // Configure Menus
    admin.addEntity(sponsor);
    admin.addEntity(sensor);
    admin.addEntity(measurement);

    admin.menu(nga.menu()
        .addChild(nga.menu(sponsor).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(sensor).icon('<span class="glyphicon glyphicon-cloud"></span>'))
        .addChild(nga.menu(measurement).icon('<span class="glyphicon glyphicon-list"></span>'))
    );

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
