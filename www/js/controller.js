angular.module('exisChat.controller', [])

.controller('HomeCtrl', function($scope, $riffle, $ionicScrollDelegate) {

  $scope.msgs = [];

  //Login anonymously to Exis (requires Auth appliance level 0)
  $riffle.login();

  //subscribe to the chat channel
  $riffle.subscribe('exisChat', gotMsg);

  //handle messages here
  function gotMsg(msg){
    msg.received = true;
    displayMsg(msg);
  }
   
  //publish message
  $scope.sendMsg = function(text){
    var msg = {username: $riffle.user.username(), msg: text}
    $riffle.publish('exisChat', msg);
    $scope.input.msg = '';
    displayMsg(msg);
  }

  //display our msg
  function displayMsg(msg){
    $scope.msgs.push(msg);
    $ionicScrollDelegate.scrollBottom();
  }
});
