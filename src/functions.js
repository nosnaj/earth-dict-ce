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
  let names = ["Ali" , "James", "Gladys" , "Janson", "Joel", "Weilip"];
  let roles = ["Meteorlogist" , "Chemist" , "Programmer", "Scientist"];

  const lorem = 'Maecenas eget sem venenatis, tristique tortor vel, pharetra augue. Mauris ornare nec diam sit amet rhoncus. Aenean interdum justo elit, non malesuada lorem venenatis vitae. Curabitur nec neque sollicitudin, euismod turpis dignissim, finibus lectus. In hac habitasse platea dictumst. Aenean sit amet consequat justo. Integer eu enim nulla.  Sed ante lectus, tincidunt et convallis at, pretium et purus. Donec molestie porttitor tincidunt. Maecenas sollicitudin nulla in euismod tincidunt. Pellentesque turpis erat, consequat id lorem nec, tempor commodo turpis.'.split(' ');

  return  _.times(count , function () {
      return {
      "id": 2,
      "user_name": _.sample(names),
      "user_role": _.sample(roles),
      "key": "Subsidence",
      "description": "Dummy Data. No crowdsourced content available yet",
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


function highLightTerm (term = {term:'' , info: []}) {
  //console.warn(">>" , term.term);
  let regex = new RegExp("( " + term.term + "[ |\.])" , 'ig');
  let replacement = " <a  class='highlight-box' data-term='"+term.term+"'>$1</a> ";

  $('p,span').each(function () {
    let html = $(this).html();
    $(this).html(html.replace(regex, replacement));
  })

}

function highLightTerms (terms) {
  terms.forEach(function (term) {
    // console.warn("> Term" , term);
    highLightTerm(term);
  });

}


function generateMockTerm (term = "have") {

  return {
    "term": term,
    "info": mockDescription(),
    "ugc": mockUGC(2)
  }
}
