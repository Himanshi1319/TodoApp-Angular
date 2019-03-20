var angApp = angular.module('myApp', []);
angApp.controller('myCtrl', function ($scope, $http) {
    $scope.label="ADD";
    $scope.localtask={};
   var refresh=function(){
    $http.get('api/tasks').success(function(res){
       $scope.tasklist=res;
       console.log(res);
       $scope.taskName="";
    
});
};
refresh();
$scope.add=function(){

    if($scope.label=="ADD")
    {
        $http.post('api/task',$scope.taskName).success(function(res){
            console.log(res);
    
        });
        refresh();
    }
    if ($scope.label=='UPDATE')
    {
        $http.put('api/task/'+ $scope.taskName._id, $scope.taskName).success(function(res){
                console.log(res);
        });
        $scope.label="ADD";
        refresh();
    }
    
    
};

$scope.delete=function(id){
    $http.delete('api/task/'+id).success(function(res){
       refresh();
    });
};
$scope.edit=function(task)
{
    $scope.taskName=task;
    $scope.label="UPDATE";

}

});