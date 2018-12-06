function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function() {
$.getJSON('https://api.airtable.com/v0/appRa1TgH8nyNUx7A/Table%201?api_key=keyBku9XiueVTMzdo',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var id = record.id;
      var trailname = record.fields['Trail Name'];
      var photo = record.fields['Photo'];
      var difficulty = record.fields['Difficulty'];
      html.push(listView(id, trailname, photo, difficulty));
    });
    $('.list').append(html);
  }
);
}

var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=key2m8VgwGT2iztad`,
    function(record){
      var html = [];
      var trailname = record.fields['Trail Name'];
      var photo = record.fields['Photo'];
      var difficulty = record.fields['Difficulty'];
      var start = record.fields['Start'];
      var finish = record.fields['Finish'];
      var distance = record.fields['Distance'];
      html.push(detailView(trailname, photo, difficulty, start, finish, distance ));
      $('.detail').append(html);
    }
  );
}


var listView = function(id, trailname, photo, difficulty) {
    return ` 
    <div class="col-4">
    <h2><a href="index.html?id=${id}">${trailname}</h2>
    <p>${photo}</p>
    ${photo ? `<img src="${photo[0].url}">` : ``}
    <p>${difficulty}</p>
    </div>
`;}
var detailView=function(trailname, photo, difficulty, start, finish, distance,){
  return ` 
  <h2>${trailname}</h2>
  <p>${photo}</p>
  ${photo ? `<img src="${photo[0].url}">` : ``}
  <p>${difficulty}</p>
  <p>${start}</p>
  <p>${finish}</p>
  <p>${distance}</p>
`;}


var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}