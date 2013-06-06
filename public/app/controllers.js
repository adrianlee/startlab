'use strict';

/* Controllers */


function MainCtrl($scope, $rootScope, $location) {
  if (Parse.User.current()) {
    $scope.isLoggedIn = true;
  } else {
    $scope.isLoggedIn = false;
  }

  $rootScope.$on('login', function() {
    $scope.isLoggedIn = true;
    $rootScope.currentUser = Parse.User.current();
    $scope.$digest();
    $rootScope.$digest();
  });

  $rootScope.$on('logout', function() {
    $scope.isLoggedIn = false;
    $rootScope.currentUser = Parse.User.current();
    $scope.$digest();
    $rootScope.$digest();
  });


  $rootScope.isLoggedIn = function() {
    $rootScope.currentUser = Parse.User.current();
    return !!Parse.User.current();
  };

  $rootScope.currentUser = Parse.User.current().toJSON();

  $scope.logout = function () {
    $scope.isLoggedIn = false;
    Parse.User.logOut();
    $rootScope.$emit('logout');
    $location.path('/');
  }

  if(!$scope.$$phase) {
    $scope.$digest();
    $rootScope.$digest();
  }
}
MainCtrl.$inject = ['$scope', '$rootScope', '$location'];

function HomeCtrl($scope, $rootScope) {

}
HomeCtrl.$inject = ['$scope', '$rootScope'];

function LearnCtrl($scope, $location) {
  console.log("Learn");
  // mixpanel.track("Learn");

  // console.log($location.path());

  var Classes = Parse.Object.extend("Classes");
  var query = new Parse.Query(Classes);

  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " courses.");

      var jsonArray = [];

      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        jsonArray.push(results[i].toJSON());
      }

      $scope.classes = jsonArray;

      $scope.$digest();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
LearnCtrl.$inject = ['$scope', '$location'];

function TeachCtrl() {
  console.log("Teach");
  // mixpanel.track("Teach");
}
TeachCtrl.$inject = [];

function ClassCtrl($scope, $location) {
  console.log("Class");
  // mixpanel.track("Teach");

  var currentUser = Parse.User.current();
  if (currentUser) {
    console.log("logged in");
    $scope.currentUser = currentUser.toJSON();
  } else {
    console.log("not logged in");
    $location.path('/login');
  }

  if(!$scope.$$phase) {
    $scope.$digest();
  }
}

ClassCtrl.$inject = ['$scope', '$location'];

function ClassPageCtrl($scope, $location) {
  console.log("Class Page");
  // mixpanel.track("Teach");

  var Classes = Parse.Object.extend("Classes");
  var query = new Parse.Query(Classes);

  console.log($location.path().split('/')[2]);

  query.equalTo("objectId", $location.path().split('/')[2]);

  query.find({
    success: function (result) {
      console.log(result);
      $scope.class = result[0].toJSON() ;

      if(!$scope.$$phase) {
        $scope.$digest();
      }
    },
    error: function (result, error) {
      console.log(error);
    }
  });

}
ClassPageCtrl.$inject = ['$scope', '$location'];

function ClassCreateCtrl($scope, $rootScope, $location) {
  console.log("Class Create");
  // mixpanel.track("Class Create");

  $scope.submit = function (newClass) {
    var Classes = Parse.Object.extend("Classes");
    var classes = new Classes();

    classes.save(newClass, {
      success: function (savedClass) {
        console.log("class saved")

        $location.path('/class');

        if(!$scope.$$phase) {
          $scope.$digest();
          $rootScope.$digest();
        }
      },
      error: function (savedClass, error) {
        console.log(error);
      }
    });
  }
}
ClassCreateCtrl.$inject = ['$scope', '$rootScope', '$location'];

function LoginCtrl($scope, $rootScope, $location) {
  console.log("Login");
  // console.log($location.path());
  // mixpanel.track("Login");

  $scope.submit = function (login_user) {
    console.log("submitted stuff");
    console.log(login_user);

    Parse.User.logIn(login_user.email, login_user.password, {
      success: function(user) {
        $rootScope.currentUser = Parse.User.current();
        $rootScope.isLoggedIn = true;

        $rootScope.$emit('login');

        // Do stuff after successful login.
        $location.path('/class');

        if(!$scope.$$phase) {
          $scope.$digest();
          $rootScope.$digest();
        }
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log(JSON.stringify(error));
        alert("Wrong username or password");
      }
    });
  }
}
LoginCtrl.$inject = ['$scope', '$rootScope', '$location'];

function RegisterCtrl($scope, $rootScope, $location) {
  console.log("Register");
  // console.log($location.path());
  // mixpanel.track("Login");

  $scope.submit = function (newUser) {
    console.log("submitted stuff");
    console.log(newUser);

    var user = new Parse.User();
    user.set("name", newUser.name);
    user.set("username", newUser.email);
    user.set("password", newUser.password);
    user.set("email", newUser.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.

        $rootScope.$emit('login');

        $location.path('/learn');

        if(!$scope.$$phase) {
          $scope.$digest();
          $rootScope.$digest();
        }
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
}
RegisterCtrl.$inject = ['$scope', '$rootScope', '$location'];

function Register2Ctrl($scope, $rootScope, $location) {

}
Register2Ctrl.$inject = ['$scope', '$rootScope', '$location'];