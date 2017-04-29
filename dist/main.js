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
  let roles = ["Meteorlogist" , "Chimist" , "Programmer", "Scientist"]
  return  _.times(count , function () {
      return {
      "id": 2,
      "user_name": _.sample(names),
      "user_role": _.sample(roles),
      "key": "Subsidence",
      "description": "this is just a test2",
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
  console.warn(">>" , term.term);
  let regex = new RegExp("(" + term.term + ")" , 'ig');
  let replacement = "<a  class='hightlight-box'>[ $1 ]</a>";

  $('p,span').each(function () {
    let html = $(this).html();
    $(this).html(html.replace(regex, replacement));
  })
  
}

function hightLightTerms (terms) {
  terms.forEach(function (term) {
    console.warn("> Term" , term);
    hightLightTerm(term);
  });

}


function generateMockTerm () {
  
  return {
    "term": "Arrhenius",
    "info": mockDescription(),
    "ugc": mockUGC(2)
  }
}
 

var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {

    var terms = [ generateMockTerm() ];
    $scope.getUGC = function () {
      return terms[0].ugc;
    };

    $scope.getDescriptions = function () {
      return terms[0].info;
    };

    $scope.getTitle = function () {
      return terms[0].term;
    }

    var content = getPageContent();
    setTimeout(function () {
      hightLightTerms(terms)
    }, 200);
    console.warn("Page content rate x: " , content.length);

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




 