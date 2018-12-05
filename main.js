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
          var name = record.fields['Name'];
          var rating = record.fields['Rating'];
          var picture = record.fields['Pictures'];
          html.push(listView(id, name, rating, picture));
        });
        $('body').append(html);
      }
    );
  }
  
  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/appRa1TgH8nyNUx7A/Table%201?api_key=keyBku9XiueVTMzdo`,
      function(record){
        var html = [];
        var Trail Name = record.fields['trailname'];
        var Photo = record.fields['photo'];
        var Difficulty = record.fields['difficulty'];
        var Start = record.fields['start'];
        var Finish = record.fields['finish'];
        html.push(detailView(name, address, rating, picture, cost, type ));
        $('body').append(html);
      }
    );
  }
  
  var listView = function(trailname, photo, difficulty, start, finish) {
    return `
      <h2><a href="index.html?id=${id}">${name}</a></h2>
      <p>${rating}</p>
      ${picture ? `<img src="${picture[0].url}">` : ``}
    `;
  }
  
  var detailView = function(trailname, photo, difficulty, start, finish) {
    return `
      <h2>${name}</h2>
      <p>${trailname}</p>
      <p>${photo}</p>
      <p>${difficulty}</p>
      <p>${start}</p>
      <p>${finish}</p>
      ${picture ? `<img src="${picture[0].url}">` : ``}
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }
  