var Sample = angular.module('Sample', [
    'ngRoute'
]);

Sample.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: '/sample/views/home.html',
            controller: 'homeController'
          })
          .when('/items', {
            templateUrl: '/sample/views/items.html',
            controller: 'itemsController'
          })
          .when('/item/:id', {
            templateUrl: '/sample/views/item.html',
            controller: 'itemController'
          })
          .otherwise({
            redirectTo: '/'
          });
    }
]);

Sample.service('globalFunctions', ['$http',
    function ($http) {
        this.sendRequest = function (method, url, headers, data) {
            return $http({
                method: method,
                url: url,
                transformRequest: angular.identity,
                headers: headers,
                data: JSON.stringify(data)
            })
        };

        this.defaultFunction = function () {
        };
    }
]);

Sample.controller('navController', ['globalFunctions', '$scope', '$location',
    function (globalFunctions, $scope, $location) {
        // To do...
    }
]);

Sample.controller('commonController', ['globalFunctions', '$scope',
    function (globalFunctions, $scope) {
        // To do...
    }
]);

Sample.controller('homeController', ['globalFunctions', '$scope',
    function (globalFunctions, $scope) {
        $scope.page = {
            title: 'Home',
            subtitle: 'You\'re welcome!'
        };

        $scope.form = {
            date: '',
            time: ''
        };

        $scope.send = function () {
            console.log($scope.form);
            M.toast({ html: 'Look at the console!', classes: 'rounded' });
        }

        // This is for Calendar and Time pickers:
        angular.element(document).ready(function () {
            let dateNow = new Date();
            let dateInterFr = {
                cancel: 'Annuler',
                clear: 'Vider',
                done: 'Ok',
                previousMonth:    '‹',
                nextMonth:    '›',
                months:    [
                    'Janvier',
                    'Février',
                    'Mars',
                    'Avril',
                    'Mai',
                    'Juin',
                    'Juillet',
                    'Août',
                    'Septembre',
                    'Octobre',
                    'Novembre',
                    'Décembre'
                ],
                monthsShort:    [
                    'Jan',
                    'Fév',
                    'Mar',
                    'Avr',
                    'Mai',
                    'Jui',
                    'Jui',
                    'Aoû',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Déc'
                ],
                weekdays:    [
                    'Dimanche',
                    'Lundi',
                    'Mardi',
                    'Mercredi',
                    'Jeudi',
                    'Vendredi',
                    'Samedi'
                ],
                weekdaysShort:    [
                    'Dim',
                    'Lun',
                    'Mer',
                    'Jeu',
                    'Mer',
                    'Ven',
                    'Sam'
                ],
                weekdaysAbbrev:    ['D', 'L', 'M', 'M', 'J', 'V', 'S']
            };
            let timeInterFr = {
                cancel: 'Annuler',
                clear: 'Vider',
                done: 'Ok'
            };
            
            $scope.dateInstance = M.Datepicker.init(document.querySelector('.datepicker'), {
                autoClose: true,
                defaultDate: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()),
                setDefaultDate: true,
                format: 'dd/mm/yyyy',
                i18n: dateInterFr
            });
            $scope.timeInstance = M.Timepicker.init(document.querySelector('.timepicker'), {
                autoClose: true,
                twelveHour: false,
                defaultTime: dateNow.getHours() + 1 + ':00',
                i18n: timeInterFr
            });
            $scope.timeInstance._updateTimeFromInput();
            $scope.timeInstance.done();
        });
    }
]);

Sample.controller('itemsController', ['globalFunctions', '$scope',
    function (globalFunctions, $scope) {
        $scope.page = {
            title: 'Items',
            subtitle: 'List of items'
        };

        $scope.items = [];

        // Get items:
        promiseGet = globalFunctions.sendRequest('GET', 'php/GetItems.php', null, null);
        promiseGet.then(
            function (response) {
                $scope.items = response.data;
                console.log($scope.items);
            },
            function (error) {
                console.log(error);
            }
        );
    }
]);

Sample.controller('itemController', ['globalFunctions', '$scope', '$routeParams',
    function (globalFunctions, $scope, $routeParams) {
        $scope.page = {
            title: 'Item',
            subtitle: ''
        }

        $scope.item = {};

        // Get item:
        promiseGet = globalFunctions.sendRequest('GET', 'php/GetItem.php?id=' + $routeParams.id, null, null);
        promiseGet.then(
            function (response) {
                $scope.item = response.data;
                $scope.page.subtitle = $scope.item.name;
            },
            function (error) {
                console.log(error);
            }
        );
    }
]);