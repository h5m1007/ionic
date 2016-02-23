angular.module('todo', ['ionic'])
    .factory('Projects', function() {
        return {
            all: function() {
                var projectString = window.localStorage['projects'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function(projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject: function(projectTitle) {
                return {
                    title: projectTitle,
                    task: []
                };
            },
            getLastActiveIndex: function() {
            	return parseInt(window.localStorage['LastActiveIndex']) || 0;
            },
            setLastActiveIndex: function(index){
            	window.localStorage['lastActiveProject'] = index;
            }
        }
    })
    .controller('TodoCtrl', function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate){
    	var createProject = function(projectTitle){
    		var newProject = Projects.newProject(projectTitle);
    		$scope.projects.push(newProject);
    		Projects.save($scope.projects);
    		$scope.selectProject(newProject,$scope.projects.length-1);
    	}

    	// 加载或初始化项目
    	$scope.projects = Projects.all();

    	$scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    	$scope.newProject = function(){
    		var projectTitle = prompt('Project name');
    		if(projectTitle){
    			createProject(projectTitle);
    		}
    	};

    	$scope.selectProject = function(project, index){
    		$scope.activeProject = project;
    		Projects.setLastActiveIndex(index);
    		$ionicSideMenuDelegate.toggleLeft(false);
    	};

    	$ionicModal.fromTemplateUrl('new-task.html',function(modal){
    		$scope.taskModal = modal;
    	},{
    		scope: $scope
    	});

    	$scope.createTask = function(task){
    		if(!$scope.activeProject || !task){
    			return;
    		}
    		$scope.activeProject.tasks.push();
    	}

    })
