var canonnEd3d_gy = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems - POI",
					"color": "FF9D00"
				}
			},
			"Geysers - (GY)": {
				"800": {
					"name": "Geyser",
					"color": "99ccff"
				}
			}
		},
		"systems": [{
			"name": "Sol",
			"coords": {
				"x": "0",
				"y": "0",
				"z": "0"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Merope",
			"coords": {
				"x": "-78.59375",
				"y": "-149.625",
				"z": "-340.53125"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "HIP 22460",
			"coords": {
				"x": "-41.3125",
				"y": "-58.96875",
				"z": "-354.78125"
			},
			"cat": [
				"100"
			]
		}]
	},

	formatGY: function (data) {

		//Here you format GY JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gySite = {};
				gySite["name"] = data[i].system;
				gySite["cat"] = [800];
				gySite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_gy.systemsData.systems.push(gySite);
			}

		}

	},

	parseData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {

				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				resolvePromise();
			}
		});
	},

	init: function () {

		//GY Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_gy.parseData("data/csvCache/gyDataCache.csv", canonnEd3d_gy.formatGY, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_gy.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [20, 500],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};