var body = `

<div  ng-app="dictionaryList" ng-controller="myCtrl" >
  <div class='tab-layout'>
    <div class='vertical-scrollable'>
      <div class='header-1' data-meta-dic='title'>{{ getTitle() }}</div>
      <section>
        <div data-meta-dic='description' ng-repeat='info in getDescriptions()'>
          <p class='wide-spacing' ng-bind-html='info.description'>
          </p>
          <p class='source-name extra-wide-spacing'>Trusted Source: {{info.source}}</p>
        </div>
      </section>

      <div class='header-2'>Helpful Illustration</div>
      <section>
        <img class='helpful-illustration-doe' ng-if="getImage() === ''" src='https://ekoservis-praha.eu/static/images/noimg.jpg'></img>
        <img class='helpful-illustration-doe' ng-if="getImage() !== ''" ng-src='{{ getImage() }}' onerror="this.src='https://ekoservis-praha.eu/static/images/noimg.jpg'"></img>
      </section>

      <div class='header-2'>Crowdsourced Definitions/Comments</div>
      <section>
          <section class='ugc-content-box' ng-repeat="ugc in getUGC()">
            <div class='contributor'>
              <div>
                {{ugc.user_name}} <span class='ugc-role'>&bull; {{ugc.user_role}}</span>
              </div>
              <div class='likes'>
                <span class='like-item'>
                  <a>
                    <img style='width: 15px; height: 15px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQdFzUDZG5t/AAAAEF0RVh0Q29tbWVudABDUkVBVE9SOiBnZC1qcGVnIHYxLjAgKHVzaW5nIElKRyBKUEVHIHY4MCksIHF1YWxpdHkgPSA5MAp9VNrdAAACgUlEQVQ4y6WVTUsyURTHzzhq4PhCkQpBiabgLtxJhCKmm2jVKvwAbkQZXNfSjSKCblu4iL6Bi0rEhSC4EhEqF67Gt5BSx/FltPssbo+PZuo89d+dM//7u5zDOXcACdDDw4NGo6EoyuVyPT4+rrLBRlC1WoVF3d3d/ZAVi8UAgKZphNDt7S3G/ZB1eXlJEMT9/T0OrVYrABQKhWWnCDYpn8+TJGk0GnFoNpsBoNVqLTs3sOLxeLVa1Wg0er0eZxiGAQCKor5xr6kulUphz/PzM84Mh0OcGQwG/9Gver2OjyWTyVnS7/cDwMnJSaVSKRaLpVKJYZh1rI+Pj36/f3BwAABXV1ezfL/f1+l0X8pSKBTX19fYQCCEeJ5Pp9ODwQB/lkql4XA4m83abLZsNjs71ul0fD4fx3GzzGg0SqfTw+EwGo3SNA0IIYvFstxHvV4vZCWenp5IkjQYDBzHQa1Wk8vl85TDw8NIJMLzvBAWx3EGg2F3d/ft7Q0YhlEoFPOs8/NzJFitVksul+t0OpZlN8/qel1cXLAs63a7KYr6LctutwPA0dHR5rnfKJIkAWA8Hn/uxI/71ev1MOvl5UXQbq8Rz/PT6XRnZ8dkMv22xna7jUd/4Z0QiUS5XC4QCAgHIYSCwSAAeDyeBZZarT4+PnY4HAAgkUgE4kqlkkwm83q9n/Hr66tSqZx3iMXivb09r9dbLpdZll3V+PF4rFKptre3O53Ov3cikUisunl/f//s7Ozm5qbZbM6D3t/fnU4nAJyenn7z5vB/NZlMGo1GKBSyWCwqlWoeLZVKt7a2CILAoVarHY1Ggv4d0+m03W5nMhmPx/OlDxKJhKbpbrc77/8DnSxjSlY8/6gAAAAASUVORK5CYII=' >
                  </a>
                </span>
                <a>
                  <span class="upvote-count like-item">
                    {{ugc.upvote_count}}
                  </span>
                </a>
              </div>
            </div>
            <div data-meta-dic='description'>{{ugc.description}}</div>
          </section>
      </section>
    </div>
    <div class='add-entry'>
      <a class='btn-add-entry' href='http://ec2-13-229-89-43.ap-southeast-1.compute.amazonaws.com/entry/new?key={{getTitle()}}'>
        Add definition/comment
      </a>
    </div>
  </div>
</div>



`;
document.body.innerHTML += body;


function getResponseFromServer (content , $http) {
  var criteria = {
    body: content
  };

  return new Promise(function (resolve ,reject) {

    $.post('https://acsmp3b92j.execute-api.ap-southeast-1.amazonaws.com/prod', criteria , function (data) {
      highLightTerms(data);

      // mocking ugc
      var ugc = mockUGC(_.random(2,5)); // Using same ugc term
      data = data.map(function (term) {
        term.ugc = ugc;
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
      highLightTerms(terms);
      resolve(terms);
    }, 200);

  });
}

var app = angular.module("dictionaryList", ['ngSanitize']);
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

  $scope.getImage = function() {
    var keyword = $scope.getTitle();
    for(var i = 0; i < $scope.terms.length; i++) {
      var term = $scope.terms[i];
      if(term.term == keyword) {
        return term.info[0].image;
      }
    }
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

  $('body').on('click' , '.highlight-box' , function (e) {
    e.preventDefault();
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var width = $('.tab-layout').width();
    var height = $('.tab-layout').height();


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

  $(window).scroll(function(e) {
      $('.vertical-scrollable').is(':visible') && fadeOutDiv();
  });

  // $(window).resize(function () {
  //   $('.vertical-scrollable').is(':visible') && fadeOutDiv();
  // })

  $(window).click(function (e) {
    if(e.target.className !== 'highlight-box') {
      fadeOutDiv();
    }
  });

  $('.vertical-scrollable').scroll(function (e) {
    e.stopPropagation();
  })

  $('.vertical-scrollable').click(function (e) {
    e.stopPropagation();
  })
}

function fadeOutDiv() {
  $('.tab-layout').fadeOut();
}
