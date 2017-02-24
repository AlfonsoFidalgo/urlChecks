const request = require('request');
const fs = require('fs');
var parse = require('csv-parse');

fs.readFile('input.csv', (err, data) => {
  parse(data, {columns: false, trim: true}, (err, rows) => {
    for (var i = 0; i < rows.length; i++){
      var url = rows[i].undefined;
      validateUrl(url);
    }
  });
});

function validateUrl(url) {
  request(url, (error, response, body) => {
    if (!error){
      var redirect = response.request.uri.href;
      redirect = redirect.toString() + ",\n";
      fs.writeFileSync('output.csv', url.toString() + ",", {'flag': 'a'});
      fs.writeFileSync('output.csv', response.statusCode.toString() + ",", {'flag': 'a'});
      fs.writeFileSync('output.csv', redirect, {'flag': 'a'});
    } else {
      fs.writeFileSync('output.csv', url.toString() + ",", {'flag': 'a'});
      fs.writeFileSync('output.csv', "Something wrong,\n", {'flag': 'a'});
      console.log("something wrong");
    }
  });
}
