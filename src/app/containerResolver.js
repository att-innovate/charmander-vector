'use strict';
function containerResolver(id, hostProperties){
	var deferred = $.Deferred();
	var torc = false;
	var url = 'http://' + hostProperties.host + ':' + '31300' +'/getid/'+id;
	if (torc){
		url = 'http://' + 'wedge-fb-1'+ ':' + '3000' +'/service?id='+id;
	}
	
	$.get(url)
	.success(function(response){
		var result = response.result || response;
	    deferred.resolve(result);
	})
	.error(function(){
	        deferred.resolve(id.substring(0,12));
	});
	return deferred.promise();
}