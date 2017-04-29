var body = `


<div  ng-app="myShoppingList" ng-controller="myCtrl" >
  <div class='tab-layout'>
    <h1 data-meta-dic='title'>{{ getTitle() }}</h1>
      <section>
        <p data-meta-dic='description' ng-repeat='info in getDescriptions()'>
          {{info.description}} <span class='source-name'>{{info.source}}</span>
        </p>

      </section>
      
      <section class='vertical-scrollable'>
        <section class='ugc-content-box' ng-repeat="ugc in getUGC()">
          <h2>{{ugc.user_name}} <span class='ugc-role'>&bull; {{ugc.user_role}}</span></h2>
          {{ugc.description}}

          <div class='likes'>
            <span class="upvote-count like-item">
              {{ugc.upvote_count}}
            </span>
            <span class='like-item'>
              <i class='glyphicon glyphicon-thumbs-up'></i>
            </span>
            
          </div>
        </section>      
    </section>
  </div>

</div>


`;
document.body.innerHTML += body;


function getResponseFromServer (content , $http) {
 


  // console.log("Terms: " , terms);
  var criteria = {
    body: content
  };
  
  return new Promise(function (resolve ,reject) {
    
    $.post('https://acsmp3b92j.execute-api.ap-southeast-1.amazonaws.com/prod', criteria , function (data) {
      hightLightTerms(data);
      resolve(data);
    });
  });
   
}


function getResponseFromServerMock () {
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
app.controller("myCtrl", ['$scope' , '$http' , function($scope, $http) {

  $scope.terms = [];
  $scope.index = 0;

  $scope.focusDefinition = function (termKey) {

    $scope.terms.map(function (term, index) {
      if (term.term == termKey) {
        $scope.index = index;
      }
    });
    console.log($scope.index);
    
    $scope.$apply();
  }


  
  $scope.getUGC = function () {
    return $scope.terms[$scope.index] ? $scope.terms[$scope.index].ugc : [];
  };

  $scope.getDescriptions = function () {
    return $scope.terms[$scope.index] ? $scope.terms[$scope.index].info : [];
  };

  $scope.getTitle = function () {
    return $scope.terms[$scope.index] ? $scope.terms[$scope.index].term : '';
  }

  // find the content, post to server and highlight it
  var content = getPageContent();
  console.warn("Page content rate x: " , content.length);

  getResponseFromServer(content, $http).then(function (terms) {
    $scope.terms = terms;
    $scope.$apply();
  }).catch(error => {
    console.error("Error" , error);
  })
  
  // jquery events for clicking on page
  watchHighlight();

}]);


 
function watchHighlight () {

  $('body').on('click' , '.hightlight-box' , function (e) {
    e.preventDefault();
    
    var x = e.clientX;
    var y = e.clientY;
    $('.tab-layout').css('left' , x).css('top' , y).fadeIn();
    var scope = angular.element($('div[ng-controller="myCtrl"]')).scope();
    scope.focusDefinition($(this).attr('data-term'));
    // console.log("> scope" , scope);

  });

  $(window).scroll(function () {
    $('.tab-layout').fadeOut();
  });

  $(window).resize(function () {
    $('.tab-layout').fadeOut();
  })
}



