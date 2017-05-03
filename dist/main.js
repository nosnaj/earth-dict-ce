function getPageContent () {
  var bodyWithText = '';
  var paragraphs = document.getElementsByTagName('p');
  for (var i = 0; i < paragraphs.length; i++)
  {
    bodyWithText = bodyWithText + ' ' + paragraphs[i].innerHTML;
  }
  var tempDivForCleaningTags = document.createElement("div");
  tempDivForCleaningTags.innerHTML = bodyWithText;
  bodyWithText = tempDivForCleaningTags.textContent || tempDivForCleaningTags.innerText || '';
  return bodyWithText;

}

function mockUGC (count) {
  let names = ["Ali" , "James", "Gladys" , "Janosn", "Joel", "Weilip"];  
  let roles = ["Meteorlogist" , "Chimist" , "Programmer", "Scientist"];

  const lorem = 'Maecenas eget sem venenatis, tristique tortor vel, pharetra augue. Mauris ornare nec diam sit amet rhoncus. Aenean interdum justo elit, non malesuada lorem venenatis vitae. Curabitur nec neque sollicitudin, euismod turpis dignissim, finibus lectus. In hac habitasse platea dictumst. Aenean sit amet consequat justo. Integer eu enim nulla.  Sed ante lectus, tincidunt et convallis at, pretium et purus. Donec molestie porttitor tincidunt. Maecenas sollicitudin nulla in euismod tincidunt. Pellentesque turpis erat, consequat id lorem nec, tempor commodo turpis.'.split(' ');

  return  _.times(count , function () {
      return {
      "id": 2,
      "user_name": _.sample(names),
      "user_role": _.sample(roles),
      "key": "Subsidence",
      "description": _.times(_.random(2,6) , function () { return _.sample(lorem)}).join(' '),
      "image": null,
      "source": "Wiki",
      "upvote_count": _.random(1,15)
    };
  });

  
}

function mockDescription (key) {
  
  const lorem = 'Maecenas eget sem venenatis, tristique tortor vel, pharetra augue. Mauris ornare nec diam sit amet rhoncus. Aenean interdum justo elit, non malesuada lorem venenatis vitae. Curabitur nec neque sollicitudin, euismod turpis dignissim, finibus lectus. In hac habitasse platea dictumst. Aenean sit amet consequat justo. Integer eu enim nulla. Morbi commodo elit sit amet odio efficitur lobortis. Phasellus sollicitudin elementum commodo. Etiam dignissim enim turpis, ut laoreet nunc consectetur at. Pellentesque hendrerit, augue in ornare sodales, ante magna gravida magna, sed euismod elit dolor in ligula. Nullam feugiat felis vitae nisi ultrices molestie. Sed ante lectus, tincidunt et convallis at, pretium et purus. Donec molestie porttitor tincidunt. Maecenas sollicitudin nulla in euismod tincidunt. Pellentesque turpis erat, consequat id lorem nec, tempor commodo turpis.'.split(' ');

  return _.times(2, function () {
    return  {
      "key": key,
      "description": _.times(_.random(15,30) , function () { return _.sample(lorem); }).join(' '),
      "image": "http://geology.com/a/sinkhole.jpg",
      "source": "Geology.com"
    };
  });
}


function hightLightTerm (term = {term:'' , info: []}) {
  //console.warn(">>" , term.term);
  let regex = new RegExp("( " + term.term + "[ |\.])" , 'ig');
  let replacement = " <a  class='hightlight-box' data-term='"+term.term+"'>[ $1 ]</a> ";

  $('p,span').each(function () {
    let html = $(this).html();
    $(this).html(html.replace(regex, replacement));
  })
  
}

function hightLightTerms (terms) {
  terms.forEach(function (term) {
    // console.warn("> Term" , term);
    hightLightTerm(term);
  });

}


function generateMockTerm (term = "have") {
  
  return {
    "term": term,
    "info": mockDescription(),
    "ugc": mockUGC(2)
  }
}
;
var body = `


<div  ng-app="myShoppingList" ng-controller="myCtrl" >
  <div class='tab-layout vertical-scrollable' onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';">
    <div class='header-1' data-meta-dic='title'>{{ getTitle() }}</div>
      <section>
        <div data-meta-dic='description' ng-repeat='info in getDescriptions()'>
          <p class='wide-spacing'>
            {{info.description}}
          </p>
          <p class='source-name'>source: {{info.source}}</p>
        </div>

      </section>

      <div class='header-2'>Other definition(s)</div>
      <section>
        <section class='ugc-content-box' ng-repeat="ugc in getUGC()">
          <div class='contributor'>{{ugc.user_name}} <span class='ugc-role'>&bull; {{ugc.user_role}}</span></div>
          <div data-meta-dic='description'>{{ugc.description}}</div>

          <div class='likes'>
            <span class='like-item'>
              <img style='width: 15px; height: 15px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQdFzUDZG5t/AAAAEF0RVh0Q29tbWVudABDUkVBVE9SOiBnZC1qcGVnIHYxLjAgKHVzaW5nIElKRyBKUEVHIHY4MCksIHF1YWxpdHkgPSA5MAp9VNrdAAACgUlEQVQ4y6WVTUsyURTHzzhq4PhCkQpBiabgLtxJhCKmm2jVKvwAbkQZXNfSjSKCblu4iL6Bi0rEhSC4EhEqF67Gt5BSx/FltPssbo+PZuo89d+dM//7u5zDOXcACdDDw4NGo6EoyuVyPT4+rrLBRlC1WoVF3d3d/ZAVi8UAgKZphNDt7S3G/ZB1eXlJEMT9/T0OrVYrABQKhWWnCDYpn8+TJGk0GnFoNpsBoNVqLTs3sOLxeLVa1Wg0er0eZxiGAQCKor5xr6kulUphz/PzM84Mh0OcGQwG/9Gver2OjyWTyVnS7/cDwMnJSaVSKRaLpVKJYZh1rI+Pj36/f3BwAABXV1ezfL/f1+l0X8pSKBTX19fYQCCEeJ5Pp9ODwQB/lkql4XA4m83abLZsNjs71ul0fD4fx3GzzGg0SqfTw+EwGo3SNA0IIYvFstxHvV4vZCWenp5IkjQYDBzHQa1Wk8vl85TDw8NIJMLzvBAWx3EGg2F3d/ft7Q0YhlEoFPOs8/NzJFitVksul+t0OpZlN8/qel1cXLAs63a7KYr6LctutwPA0dHR5rnfKJIkAWA8Hn/uxI/71ev1MOvl5UXQbq8Rz/PT6XRnZ8dkMv22xna7jUd/4Z0QiUS5XC4QCAgHIYSCwSAAeDyeBZZarT4+PnY4HAAgkUgE4kqlkkwm83q9n/Hr66tSqZx3iMXivb09r9dbLpdZll3V+PF4rFKptre3O53Ov3cikUisunl/f//s7Ozm5qbZbM6D3t/fnU4nAJyenn7z5vB/NZlMGo1GKBSyWCwqlWoeLZVKt7a2CILAoVarHY1Ggv4d0+m03W5nMhmPx/OlDxKJhKbpbrc77/8DnSxjSlY8/6gAAAAASUVORK5CYII=' >
            </span>
            <span class="upvote-count like-item">
              {{ugc.upvote_count}}
            </span>
          </div>
        </section>
    </section>
    <a href='http://35.154.208.228/entry/new?key={{getTitle()}}' style='padding:5px 30px; background:blue; color:white; display:inline-block;'>
      Add entry
    </a>
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

  $(window).scroll(function (e) {
    $('.tab-layout').fadeOut();
  });

  // $(window).resize(function () {
  //   $('.tab-layout').fadeOut();
  // })

  $(window).click(function (e) {
    if(e.target.tagName !== 'A') {
      $('.tab-layout').fadeOut();
    }
  });
}
