'use strict';

function configSave(currentConfig, activeWidgets){
	console.log('inside configSave');
	//load config from server
	//check if exist, if so update
	//save

	var deferred = $.Deferred();

	configLoad().then(function(response){
		for(var a = response.length -1; a > -1; a--){
			if(response[a].name === currentConfig.name){
				response.splice(a,1);
				break;
			}
		}

		var config =  {
            name: currentConfig.name,
            globalFilter: currentConfig.globalFilter,
            hostspec: currentConfig.hostspec,
            host: currentConfig.host,
            activeWidgets: activeWidgets
        };
		response.push(config);
		var configString = angular.toJson(response);
		localStorage.setItem('vector-config', configString);

		deferred.resolve();
	});
	
	return deferred.promise();
}

function configDelete(configName){
	console.log('inside configDelete');
	var deferred = $.Deferred();

	configLoad().then(function(response){
		for(var a = response.length -1; a > -1; a--){
			if(response[a].name === configName){
				response.splice(a,1);
				break;
			}
		}

		var configString = angular.toJson(response);
		localStorage.setItem('vector-config', configString);

		deferred.resolve();
	});
	
	return deferred.promise();


/*            var existingConfig = vm.loadConfig() || [];
            console.log(existingConfig);
            console.log('before delete existingConfig:',existingConfig);
            
            if (existingConfig.length < 1){
                return;
            }
            var configArr = [];
            for(var a=0; a< existingConfig.length; a++){
                if (existingConfig[a].name !== configName){
                    configArr.push(existingConfig[a]);
                }
            }
            localStorage.removeItem('vector-config');
            var configString = angular.toJson(configArr);
            localStorage.setItem('vector-config', configString);
            
            vm.configs=vm.loadConfig() || [];
            console.log('after delete existingConfig:',vm.configs);*/


}

function configLoad(){
	//simulate API call
	var deferred = $.Deferred();
	setTimeout(function(){
		deferred.resolve(angular.fromJson(localStorage.getItem('vector-config')));
	},200);
	
	return deferred.promise();

	//return $.when(angular.fromJson(localStorage.getItem('vector-config')));
}