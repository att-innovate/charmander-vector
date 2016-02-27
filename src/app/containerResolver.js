'use strict';
function containerResolver(id, hostProperties){
	var deferred = $.Deferred();
	$.get('http://' + 'wedge-fb-1'+ ':' + '3000' +'/service?id='+id)
	.success(function(response){
	    deferred.resolve(response.result);
	})
	.error(function(){
	        deferred.resolve(id.substring(0,12));
	});
	return deferred.promise();
}