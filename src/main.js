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
// document.body.innerHTML += body;


function getResponseFromServer (content , $http) {
 


  // console.log("Terms: " , terms);
  var criteria = {
    body: content
  };
  
  return new Promise(function (resolve ,reject) {
    
    $.post('https://acsmp3b92j.execute-api.ap-southeast-1.amazonaws.com/prod', criteria , function (data) {
      hightLightTerms(data);
      
      // mocking ugc
      data = data.map(function (term) {
        term.ugc = mockUGC(_.random(4,10));
        return term;
      });

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

  $scope.initial = function () {

    // find the content, post to server and highlight it
    var content = getPageContent();
    console.warn("Page content rate x: " , content.length);
    if (content.length == 0) return;
    getResponseFromServer(content, $http).then(function (terms) {
      $scope.terms = terms;
      $scope.$apply();
    }).catch(error => {
      console.error("Error" , error);
    })
    
    // jquery events for clicking on page
    watchHighlight();
  }
 
    
  $scope.initial();


  
}]);


 
function watchHighlight () {

  $('body').on('click' , '.hightlight-box' , function (e) {
    e.preventDefault();
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var width = $('.tab-layout').width();
    var height = $('.tab-layout').width();
    

    var x = e.clientX;
    var y = e.clientY;


    var xx = x;
    var yy = y;

    if (x + width + 10 > w) {
      xx = w - width - 90;
    }
    if (y + height + 10 > h) {
      yy = y - height - 10;
    }


    console.log("Click:" , x, y)
    $('.tab-layout').css('left' , xx).css('top' , yy).fadeIn();
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



