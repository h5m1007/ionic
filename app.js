angular.module('todo',['ionic'])
.controller('TodoCtrl',function($scope,$ionicModal){
	$scope.tasks=[
		{title:'list title1'},
		{title:'list title2'},
		{title:'list title3'},
		{title:'list title4'}
	];

	// 创建并载入模型
	$ionicModal.fromTemplateUrl('new-task.html',function(modal){
		$scope.taskModal = modal;
	},{
		scope: $scope,
		animation: 'slide-in-up'
	});

	// 表单提交时调用
	$scope.createTask = function(task){
		$scope.tasks.push({
			title:task.title
		});
		$scope.taskModal.hide();
		task.title = "";
	};

	// 打开新增的模型
	$scope.newTask = function(){
		$scope.taskModal.show();
	};

	// 关闭新增的模型
	$scope.closeNewTask = function(){
		$scope.taskModal.hide();
	}
});