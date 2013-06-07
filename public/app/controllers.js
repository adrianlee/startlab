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
    $scope.currentUser = Parse.User.current();
    $rootScope.name = Parse.User.current().toJSON().name;
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

  $scope.logout = function () {
    $scope.isLoggedIn = false;
    Parse.User.logOut();
    $rootScope.$emit('logout');
    $location.path('/');
  }

  if (!Parse.User.current()) {
    $rootScope.currentUser = null;
  } else {
    $rootScope.currentUser = Parse.User.current().toJSON();
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

  $(function(){
    $('.panel-learn').hover(function () {
      $(this).find(".learn_buttons").show();
    });
    $('.learn_buttons').hide();
  });


  var Classes = Parse.Object.extend("Classes");
  var query = new Parse.Query(Classes);

  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " courses.");

      $('#learn_count').html(results.length);

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

  var Classes = Parse.Object.extend("Classes");
  var query = new Parse.Query(Classes);

  query.equalTo("teacher", currentUser);

  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " courses.");

      $('#learn_count').html(results.length);

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

  var query2 = new Parse.Query(Classes);

  console.log("asd");
  console.log(currentUser.toJSON().registered);

  query2.containedIn("objectId", currentUser.toJSON().registered);

  query2.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " courses.");

      $('#learn_count').html(results.length);

      var jsonArray = [];

      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        jsonArray.push(results[i].toJSON());
      }

      $scope.classes2 = jsonArray;

      $scope.$digest();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

ClassCtrl.$inject = ['$scope', '$location'];

function ClassPageCtrl($scope, $location) {
  console.log("Class Page");
  // mixpanel.track("Teach");

  var this_class;

  var Classes = Parse.Object.extend("Classes");
  var query = new Parse.Query(Classes);

  console.log($location.path().split('/')[2]);

  query.equalTo("objectId", $location.path().split('/')[2]);

  query.find({
    success: function (result) {
      console.log(result);
      $scope.class = result[0].toJSON();
      this_class = result[0].toJSON();

      if ($scope.class) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("objectId", $scope.class.teacher.objectId);
        query.find({
          success: function(person) {
            console.log(person[0].toJSON());
            $scope.teacher = person[0].toJSON();

            if (currentUser.toJSON().objectId == person[0].toJSON().objectId) {
              $('#registerbutton').addClass("disabled");
              $('#registerbutton').html("You're the teacher!");
            }

            $scope.profile_image = "http://www.gravatar.com/avatar/" + md5(person[0].toJSON().email.toLowerCase().trim()) + "?d=mm";

            if(!$scope.$$phase) {
              $scope.$digest();
            }
          }
        });
      }

      if(!$scope.$$phase) {
        $scope.$digest();
      }
    },
    error: function (result, error) {
      console.log(error);
    }
  });

  var currentUser = Parse.User.current();


  var omg = currentUser.toJSON().registered;

  console.log(omg);
  console.log(omg.indexOf("Qe7A84mA31"));

  if ($.inArray("Qe7A84mA31", omg) > -1) {
    $('#registerbutton').addClass("disabled");
    $('#registerbutton').html("Registered");
  }


  $scope.register = function () {
    var sure = confirm("Please confirm registration.");

    console.log(sure);

    if (sure) {
      $('#registerbutton').addClass("disabled");
      $('#registerbutton').html("Registered");

      var currentUser = Parse.User.current();

      var omg = currentUser.toJSON().registered;
      omg.push($location.path().split('/')[2]);
      console.log(omg);

      if (currentUser.toJSON().registered) {
        currentUser.set("registered", omg);
      } else {
        currentUser.set("registered", [$location.path().split('/')[2]]);
      }

      currentUser.save(null, {
        success: function (user) {
          console.log(user);
        },
        error: function (user, error) {
          console.log(error);
        }
      })

    }
  }
}
ClassPageCtrl.$inject = ['$scope', '$location'];

function ClassCreateCtrl($scope, $rootScope, $location) {
  var currentUser = Parse.User.current();
  var register_done = false;

  console.log(currentUser);

  if (!currentUser) {
    $location.path('/login');

    if(!$scope.$$phase) {
      $scope.$digest();
      $rootScope.$digest();
    }
  } else {
    if (!currentUser.toJSON().register2) {
      $location.path('/register2');

      if(!$scope.$$phase) {
        $scope.$digest();
        $rootScope.$digest();
      }
    }

  }

  console.log("Class Create");
  // mixpanel.track("Class Create");

  $scope.submit = function (newClass) {
    if (!$('#class_form').parsley('validate')) {
      return null;
    }

    var Classes = Parse.Object.extend("Classes");
    var classes = new Classes();

    newClass.teacher = Parse.User.current();
    newClass.teachername = Parse.User.current().toJSON().name;

    console.log(newClass);

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
    if (!$('#login-form').parsley('validate')) {
      return null;
    }

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
    if (!$('#register-form').parsley('validate')) {
      return null;
    }

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

        $location.path('/register2');

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
  $scope.submit = function (profile) {
    if (!$('#register2-form').parsley('validate')) {
      return null;
    }

    console.log(profile)

    var user = Parse.User.current();

    user.set("chinesename", profile.chinesename);
    user.set("englishname", profile.englishname);
    user.set("phone", profile.phone);
    user.set("age", profile.age);
    user.set("education", profile.education);
    user.set("register2", true);

    user.save(null, {
      success: function () {
        $location.path('/class/create');

        if(!$scope.$$phase) {
          $scope.$digest();
          $rootScope.$digest();
        }
      },
      error: function (obj, error) {
        alert(JSON.stringify(error));
      }
    })
  }

  $scope.skip = function () {
    console.log("skip");
    alert("Notice: You must fill out further information before registration or creation of a class.")

    $location.path('/class')
    $scope.$digest();
  }
}
Register2Ctrl.$inject = ['$scope', '$rootScope', '$location'];


function ProfileCtrl($scope, $rootScope, $location) {

}
ProfileCtrl.$inject = ['$scope', '$rootScope', '$location'];

function ContactCtrl($scope, $rootScope, $location) {

}
ContactCtrl.$inject = ['$scope', '$rootScope', '$location'];