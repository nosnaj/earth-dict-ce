

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

// var x = new XMLHttpRequest();
// x.open('POST', 'http://35.154.208.228/terms', true);
// x.setRequestHeader("Content-Type", "application/json");
// x.send(JSON.stringify({body: bodyWithText}));
// // The Google image search API responds with JSON, so let Chrome parse it.
// x.responseType = 'json';
// x.onload = function() {
//   // Parse and process the response from Google Image Search.
//   var response = x.response;
//   if (!response || !response.responseData || !response.responseData.results ||
//       response.responseData.results.length === 0) {
//     errorCallback('No response from Google Image search!');
//     return;
//   }
//   var firstResult = response.responseData.results[0];
//   // Take the thumbnail instead of the full image to get an approximately
//   // consistent image size.
//   var imageUrl = firstResult.tbUrl;
//   var width = parseInt(firstResult.tbWidth);
//   var height = parseInt(firstResult.tbHeight);
//   console.assert(
//       typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//       'Unexpected respose from the Google Image Search API!');
//   callback(imageUrl, width, height);
// };
// x.onerror = function() {
//   errorCallback('Network error.');
// };
// x.send();


window.onload = function () {
  if (typeof jQuery) {
    var $ = jQuery;
    var content = getPageContent();
    $.post('http://35.154.208.228' , content , function (data) {
      console.warn(">>>> " , data);
    })

    console.error("Page content rate x: " , content.length);
  }

}


var responseFromTermsApi = [];
var arrayOfKeywords = [];

responseFromTermsApi.forEach(function (responseObject) {
  arrayOfKeywords.push(responseObject.key);
})

console.log(arrayOfKeywords);

highlightText(document.body);

function highlightText(element) {
  var nodes = element.childNodes;
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].nodeType === 3) {  // Node Type 3 is a text node
      var text = nodes[i].innerHTML;
      nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
    }
    else if (nodes[i].childNodes.length > 0) {
      highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
    }
  }
}

// var bodyHTML = document.body.innerHTML;
// arrayOfKeywords.forEach(function (keywordToHighlight) {
//   var index = bodyHTML.indexOf(keywordToHighlight);
//
//   if (index >= 0) {
//     bodyHTML = bodyHTML.substring(0, index) +
//     "<span style='background-color:yellow;'>" + bodyHTML.substring(index, index + keywordToHighlight.length) +
//     "</span>" + bodyHTML.substring(index + keywordToHighlight.length);
//   }
//   console.log(bodyHTML);
// })
