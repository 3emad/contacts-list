'use strict';
angular.module('contantsListApp').controller('ContactListCtrl', ['CONFIG', '$injector', '$rootScope', '$scope', '$filter', function (CONFIG, $injector, $rootScope, $scope, $filter) {
    // dynamically load enviorement of backend
    var ContactsListModelAPI = $injector.get(CONFIG[CONFIG.activeModel].service);
    $scope.loading = true;
    $scope.contactsList = [];
    $scope.filteredContacts = [];

    // handle filteration with pagination
    $scope.$watch('searchText', _.debounce(function (searchText, oldValue, $$scope) {
        $$scope.$apply(function() {
            if ($$scope.contactsList.length === 0) {
                return false;
            }

            if (!searchText){
                // return all
                $$scope.pagination.set.list($$scope.contactsList);
                $$scope.pagination.first();
                return true;
            }
            var filter;
            var filterRegex = new RegExp(searchText, 'gi');
            // FIXME the phone regex isn't perfect yet
            if(searchText.search(/^(([0-9]{0,4})(-)?){1,3}$/) !== -1) {
                filter = function(contact) {
                    return contact.phone.search(filterRegex) !== -1;
                };
            } else if (searchText.search(/^[a-z ,.'-]+$/i) !== -1) {
                filter = function(contact) {
                    return contact.name.search(filterRegex) !== -1;
                };
            }

            $$scope.pagination.set.list(
                _.filter($$scope.contactsList, filter)
            );
            $$scope.pagination.first();
        });
    }, 500), true);

    ContactsListModelAPI.get().then(function (response) {
        $scope.loading = false;
        if (typeof response.$inst !== 'undefined') {
            // Firebase case
            $scope.contactsList = response;
        } else {
            $scope.contactsList = response.data.contacts;
        }

        // iniate pagination
        $scope.pagination = new Pagination('filteredContacts', $scope, $scope.contactsList);
    });

    // pagination module
    // TODO change it to a service to init new instances from it
    function Pagination(scopeModel, $scope, $$scopeList) {
        var _this = this;
        _this.$$scope = $scope;
        // FIXME this will break since two pagination will raise a conflict
        _this.$$scope.pagerProgress = 0;
        _this.$$scopeList = $$scopeList;
        _this.currentPage = 1;
        _this.numPerPage = 10;
        _this.firstPage = 1;
        _this.lastPage = 1;

        _this.pager =  function(pager, set) {

            if (set) {
                _this.currentPage = pager;
            } else {
                _this.currentPage = _this.currentPage + pager;
            }
            var begin = ((_this.currentPage - 1) * _this.numPerPage);
            var end = begin + _this.numPerPage;
            _this.$$scope[scopeModel] = _this.$$scopeList.slice(begin, end);
            // FIXME read at init level
            _this.$$scope.pagerProgress = (_this.currentPage / _this.lastPage) * 100;
        };

        _this.update = function() {
            _this.lastPage = Math.ceil(_this.$$scopeList.length / _this.numPerPage);
        };

        // set 1st page on construction
        _this.pager(_this.firstPage, true);
        _this.update();

        return {
            set: {
                list: function(List) {
                    _this.$$scopeList = List;
                    _this.update();
                }
            },
            get: {
                list: function() {
                    return _this.$$scopeList;
                }
            },
            firstPage: function() { return _this.firstPage; },
            lastPage: function() { return _this.lastPage; },
            currentPage: function() { return _this.currentPage; },
            next: function() { _this.pager(+1); },
            prev: function() { _this.pager(-1); },
            first: function() { _this.pager(_this.firstPage, true); },
            last: function() { _this.pager(_this.lastPage, true); },
            page: function(page) {
                if (page < 1 || page > _this.lastPage) {
                    return false;
                }
                _this.pager(page, true);
            }
        };
    }
}]);
