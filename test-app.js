var app = angular.module("test-app", ['ngDialog']);


app.directive('sprintBacklog', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/sprintBacklog.html'
    }
});

app.controller("sprintBacklogController", ['$scope','ngDialog',function($scope, ngDialog) {
    $scope.sprintItems = [
        {
            description: "Story 1",
            done: true,
            link: "story1",
            tasks: [
                {
                    status: "doing",
                    description: "Gör det här",
                    link: "task 1.1"
                },
                {
                    status: "doing",
                    description: "Inte det här",
                    link: "task 1.2"
                }
            ]

        },
        {
            description: "Story 2",
            done: false,
            link: "story2",
            tasks: [
                {
                    status: "todo",
                    description: "gul",
                    link: "task 2.1"
                },
                {
                    status: "done",
                    description: "blå",
                    link: "task 2.2"
                }
            ]
        },
        {
            description: "Story 3",
            done: false,
            link: "story3",
            tasks: [
                {
                    status: "doing",
                    description: "röd",
                    link: "task 3.1"
                },
                {
                    status: "todo",
                    description: "svart",
                    link: "task 3.2"
                },
                {
                    status: "todo",
                    description: "grön",
                    link: "task 3.3"
                },
                {
                    status: "todo",
                    description: "rosa",
                    link: "task 3.4"
                }
            ]
        }
    ];


    $scope.toggleSprintItemModal = function (index, itemType) {

        // Creates a new scope for the modal
        var modalScope = $scope.$new();
        var description, items;
        

        switch (itemType.type) {
            case "story":
                description = $scope.sprintItems[index].description;
                items = $scope.sprintItems[index].tasks;

                modalScope.content = {description: description,items: items};
                break;
            case "task":
                description = $scope.sprintItems[index].description + ":" + itemType.status;
                items = $scope.sprintItems[index].tasks;
                var modalItems = [];

                // Sorting out the tasks with the right status
                for (var i = 0, len = items.length; i < len; i++)
                    if (items[i].status === itemType.status) 
                        modalItems.push(items[i]);

                modalScope.content = { description: description, items: modalItems };
                break;
        }


        ngDialog.open({
            template: 'sprintBacklogDialog.html',
            className: 'ngdialog-theme-plain',
            scope: modalScope
        });
    };

    $scope.storyLimit = 10;

    $scope.countTasks = function(index,status) {
        var tasks = $scope.sprintItems[index].tasks;
        var counter = 0;
        angular.forEach(tasks, function(value, i) {
            if (value.status === status) {
                counter++;
            }
        });
        return counter;
    };

}]);

