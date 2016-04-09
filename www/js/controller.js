angular.module('exisChat.controller', [])

.controller('HomeCtrl', 
	function($scope, $riffle, $ionicScrollDelegate, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {

  $scope.msgs = [];

  //Login anonymously to Exis (requires Auth appliance level 0)
  $riffle.login(); 

	$scope.show = function() {
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner><br>Getting GPS Location...'
		});
	};
	$scope.hide = function(){
		$ionicLoading.hide();
	};

	function geoSuccess(position){
		console.log(position);
    var msg = {username: $riffle.user.username(), msg: "https://maps.google.com/maps?q="}
		msg.msg += String(position.coords.latitude) + ',' + String(position.coords.longitude);
    $riffle.publish('geoEvent', msg);
		$scope.hide();
    displayMsg(msg);
	}
	function geoError(err){
		console.log(err);
	}
  //subscribe to the chat channel
  $riffle.subscribe('geoEvent', $riffle.want(geoEvent, {username: String, msg: String}));

  //handle messages here
  function geoEvent(msg){
    msg.received = true;
    displayMsg(msg);
  }
   
  //publish message
  $scope.sendMsg = function(){
		$scope.show();
		$ionicPlatform.ready(function(){
			$cordovaGeolocation.getCurrentPosition({timeout: 5000}).then(geoSuccess, geoError);
		});

  }

  //display our msg
  function displayMsg(msg){
    $scope.msgs.push(msg);
    $ionicScrollDelegate.scrollBottom();
  }
});
