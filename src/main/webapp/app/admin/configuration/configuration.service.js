(function() {
    'use strict';

    angular
        .module('app')
        .factory('CgConfigurationService', CgConfigurationService);

    CgConfigurationService.$inject = ['$filter', '$http'];

    function CgConfigurationService ($filter, $http) {
        var service = {
            get: get,
            getEnv: getEnv
        };

        return service;

        function get () {
            return $http.get('management/configprops').then(getConfigPropsComplete);

            function getConfigPropsComplete (response) {
                var properties = [];
                angular.forEach(response.data, function (data) {
                    properties.push(data);
                });
                var orderBy = $filter('orderBy');
                return orderBy(properties, 'prefix');
            }
        }

        function getEnv () {
            return $http.get('management/env').then(getEnvComplete);

            function getEnvComplete (response) {
                var properties = {};
                angular.forEach(response.data, function (val,key) {
                    var vals = [];
                    angular.forEach(val, function (v,k) {
                        vals.push({ key:k, val:v });
                    });
                    properties[key] = vals;
                });
                return properties;
            }
        }
    }
})();
