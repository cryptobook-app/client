$.ajax({
	    		data: {'key': MeAPI, 'secret': MeSEC},
			    url: '{REMOVED}',
			    method: 'post',
			    dataType: 'json',
			    success: function(msg) {

					$('#results2').empty();
			    var obj = (msg);
					var MyValue = 0;
					var btc_balance;
			      for (var i = 0, len = obj.length; i < len; i++) {
					  
					  
					  if(obj[i].length == 3){
					  	try {
								TheImage = 'https://www.cryptocompare.com' + (me[obj[i][0]]['ImageUrl']);
							    
							    $('#results2').append('<li class="list-group-item"><div class="row" onclick=""><div class="col-xs-2"><img src="'+TheImage+'" class="img img-responsive" /><center><small style="font-size: 10px;">'+(obj[i][0])+'</small></center></div><div class="col-xs-5"><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][1]).toFixed(8)+' '+(obj[i][0])+' <br/></small></div><div class="col-xs-5" id=""><small style="font-size: 10px;" id="btcPrice"><strong></strong><span></span></small><br/><small style="font-size: 10px;" id="'+(obj[i][0])+'"></small></div></div></li>');

						} catch(err) {
							
						    $('#results2').append('<li class="list-group-item"><div class="row" onclick=""><div class="col-xs-2"><center><small style="font-size: 10px;">'+(obj[i][0])+'</small></center></div><div class="col-xs-5"><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][1]).toFixed(8)+' '+(obj[i][0])+' <br/></small></div><div class="col-xs-5" id=""><small style="font-size: 10px;" id="btcPrice"><strong></strong></small><br/><small style="font-size: 10px;" id="'+(obj[i][0])+'"></small></div></div></li>');
						}
					  		
					  	
						$.ajax({
						 	  url: 'https://api.coinmarketcap.com/v1/ticker/',
						    dataType: 'json',
						    success: function (data) {
						       
						      var Price_USD;
						     	for (var i = 0; i < data.length; i++) {
								    
								    if (data[i]['symbol'] == 'BTC')  {
									  console.log(data[i]);
									  $('#btcPrice').text('$' + data[i]['price_usd'] + ' USD');
									  $('#btc').text(data[i]['percent_change_1h']);
									  
									  $.ajax({
									    url: 'https://coinmarketcap-nexuist.rhcloud.com/api/btc',
									    dataType: 'json',
									    success: function (data) {
										    if(data['change'] < 0 ){
									        	var MyArrow1 = 'ion-arrow-down-b';
									        	var MyColor1 = 'red';
									        } else {
									        	var MyArrow1 = 'ion-arrow-up-b';
									        	var MyColor1 = 'green';
									        }
										    $('#BTC').html('<small style="font-size: 10px;"> <span class="'+MyArrow1+'" style="color:'+MyColor1+'"> '+data['change']+'% </span></small>');
										      var my_sym = data['symbol'];
										    
										    
										},
									    error: function () {}
									});

									}

								}
						    },
						    error: function () {
						    	alert('API Error: coinmarketcap');
						    }
						});
            
					  } else {
					  	if(obj[i][1] == 0){
						  	console.log('ZERO Balance');
						} else {
						  	
					  		btc_balance = (parseFloat(obj[i][1]) * parseFloat(obj[i][6])).toFixed(8);
					  		MyValue = MyValue + parseFloat(btc_balance);
					  		var MyChange = (obj[i][9] - (obj[i][6]));
							var myChange2 = parseFloat(MyChange).toFixed(8);
							var FullNamer;
							try {
								TheImage = 'https://www.cryptocompare.com' + (me[obj[i][10]]['ImageUrl']);
							    
							    $('#results2').append('<li class="list-group-item"><div class="row" onclick="LoadDetails(&#39;'+(obj[i][10])+'&#39;);"><div class="col-xs-2"><img src="'+TheImage+'" class="img img-responsive" /><center><small style="font-size: 10px;">'+(obj[i][10])+'</small></center></div><div class="col-xs-5"><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][1]).toFixed(8)+' '+(obj[i][10])+' <br/>$'+(BIGPRICE * btc_balance).toFixed(2)+'</small></div><div class="col-xs-5" id=""><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][6]).toFixed(8)+'<br/><span id="'+(obj[i][10])+'"></span></small></div></div></li>');

							} catch(err) {
								
							    $('#results2').append('<li class="list-group-item"><div class="row" onclick="LoadDetails(&#39;'+(obj[i][10])+'&#39;);"><div class="col-xs-2"><center><small style="font-size: 10px;">'+(obj[i][10])+'</small></center></div><div class="col-xs-5"><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][1]).toFixed(8)+' '+(obj[i][10])+' <br/>$'+(BIGPRICE * btc_balance).toFixed(2)+'</small></div><div class="col-xs-5" id=""><small style="font-size: 10px;"><strong></strong>'+parseFloat(obj[i][6]).toFixed(8)+'<br/><span id="'+(obj[i][10])+'"></span></small></div></div></li>');
							}
					  		
					  		
					  		$.ajax({
							    url: 'https://coinmarketcap-nexuist.rhcloud.com/api/' + (obj[i][10]),
							    dataType: 'json',
							    success: function (data) {
								    if(data['change'] < 0 ){
							        	var MyArrow1 = 'ion-arrow-down-b';
							        	var MyColor1 = 'red';
							        } else {
							        	var MyArrow1 = 'ion-arrow-up-b';
							        	var MyColor1 = 'green';
							        }
								    $('#' + (data['symbol'].toUpperCase())).append('<small style="font-size: 10px;"> <span class="'+MyArrow1+'" style="color:'+MyColor1+'"> '+data['change']+'% </span></small>');
								      var my_sym = data['symbol'];
								      
								      $.ajax({
									    url: 'https://min-api.cryptocompare.com/data/histominute?fsym='+my_sym.toUpperCase()+'&tsym=BTC&limit=30&aggregate=1',
									    dataType: 'json',
									    success: function (data) {
									        //console.log(data);
									        myArray = [];
									        for (var i = 0, len = data['Data'].length; i < len; i++) {

									        	myArray.push(data['Data'][i]['open']);

									        }
							        		
									    },
									    error: function () {
									    	console.log('erer');
									    }
									});
								},
							    error: function () {}
							});

						}

					  }
					  
					}
					
					$('#myFolioValue').html(MyValue.toFixed(8) + ' BTC');
					$('#myFolioValue').append(' - $' +( BIGPRICE * MyValue).toFixed(2) + '');
					
			    }
	    	});
