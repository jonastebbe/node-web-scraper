var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	url = 'http://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=kühlschrank';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var json = [];

			$('#tiles tr').each(function(){
				$(this).find('td').each (function() {

					var name = $(this).find('.info .offer-title').text().trim();
					var priceRange = $(this).find('.cta .link-composed-2 .price').text().trim();

					if (name !== '') {
						json.push({name : name, priceRange : priceRange});
					}
				});
		    })
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
