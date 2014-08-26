var app = angular.module("test-app", []);

app.controller("myCtrl", function() {
    
});

app.directive('sprintBacklog', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/sprintBacklog.html'
    }
});

app.controller("sprintBacklogController", function($scope) {
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
            }]

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
            }]
        }
    ];


    $scope.showSprintItemModal = false;
    $scope.toggleSprintItemModal = function (index, itemType) {
        if (index >= 0) {
            // todo: task description(s), link(s)
            var currentItems = $scope.sprintItems[index];
            switch (itemType) {
                case "story":
                    // todo
                    console.log("story");
                    $scope.chosenItems = [{ description: currentItems.description, link: currentItems.link }];
                    break;
                case "task":
                    // todo
                    //var tasks = items.tasks;
                    $scope.chosenItems = currentItems.tasks;
                    console.log("task");
                    break;
                default:
                    break;
            }
        }
        $scope.showSprintItemModal = !$scope.showSprintItemModal;
        var top = index * 50;
        var el = document.getElementById("sprintItemModal");
        //console.log(angular.element(el));

    }



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

});