(function( self ){

	var THREE = require("./three.js");

	module.exports = function( addons ){

		if( addons instanceof Array ){

			for( var addonIndex = 0, length = addons.length; addonIndex < length; addonIndex++ ){
				
				var addon = addons[addonIndex];
				
				if( addon instanceof Function ){

					addon(THREE);

				}
				else if( typeof addon === "string" ){

					require("./addons/" + addon + ".js")(THREE);

				}
				else {

					throw new Error("Invalid module type provided");

				};
				
			};

		};

		return THREE;

	};

})(this || {});
