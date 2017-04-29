function getResponseFromServer () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {

      var d = ['have', 'they', 'electron' , 'concentration'];

      var terms = d.map(function (word) { return generateMockTerm(word)});
      hightLightTerms(terms);
      resolve(terms);
    }, 200);

  });
}

var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {

    $scope.terms = [];
    $scope.getUGC = function () {
      return $scope.terms[0] ? $scope.terms[0].ugc : [];
    };

    $scope.getDescriptions = function () {
      return $scope.terms[0] ? $scope.terms[0].info : [];
    };

    $scope.getTitle = function () {
      return $scope.terms[0] ? $scope.terms[0].term : '';
    }

    // find the content, post to server and highlight it
    var content = getPageContent();
    console.warn("Page content rate x: " , content.length);

    getResponseFromServer(content).then(function (terms) {
      $scope.terms = terms;
      $scope.$apply();
    }).catch(error => {
      console.error("Error" , error);
    })
    
    // jquery events for clicking on page
    watchHighlight();

});


 


function watchHighlight () {

  $('body').on('click' , '.hightlight-box' , function (e) {
    e.preventDefault();
    var x = e.clientX;
    var y = e.clientY;
    $('.tab-layout').css('left' , x).css('top' , y).fadeIn();
  });

  $(window).scroll(function () {
    $('.tab-layout').fadeOut();
  });

  $(window).resize(function () {
    $('.tab-layout').fadeOut();
  })
}


 