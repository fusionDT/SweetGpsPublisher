angular.module('exisChat.controller', [])

.controller('HomeCtrl', function($scope, $riffle, $ionicScrollDelegate) {

  $scope.msgs = [];

  //Login anonymously to Exis (requires Auth appliance level 0)
  $riffle.login().then(join);

  //a handler that only wants message objects
  var wantMsg = $riffle.want(receiveMsg, {username: String, msg: String});

  //a handler that only wants join events
  var wantJoinEvent = $riffle.want(joinEvent, String);

  //handle messages here
  function receiveMsg(msg){
    msg.received = true;
    $scope.msgs.push(msg);
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  }

  //handle join events
  function joinEvent(user){
    var msg ={username: user, join: true};
    $scope.msgs.push(msg);
  }
   
  function join(){
    $riffle.publish('exisChat', $riffle.user.username());
    $scope.welcome = "Welcome " + $riffle.user.username() + "!";
  }

  $riffle.subscribe('exisChat', wantMsg);
  $riffle.subscribe('exisChat', wantJoinEvent);

  $scope.sendMsg = function(text){
    var msg = {username: $riffle.user.username(), msg: text}
    $riffle.publish('exisChat', msg);
    $scope.msgs.push(msg);
    $scope.input.msg = "";
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  }
});
