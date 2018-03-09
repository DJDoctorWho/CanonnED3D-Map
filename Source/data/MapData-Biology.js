var canonnEd3d_biology = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems - POI",
					"color": "FF9D00"
				}
			},
			"Bark Mounds - (BM)": {
				"200": {
					"name": "Bark Mound",
					"color": "cdab7e"
				}
			},
			"Brain Trees - (BT)": {
				"300": {
					"name": "Brain Tree",
					"color": "ff66cc"
				}
			},
			"Fungal Gourds - (FG)": {
				"400": {
					"name": "Fungal Gourd",
					"color": "936c39"
				}
			},
			"Thargoid Barnacles - (TB)": {
				"1200": {
					"name": "Barnacle",
					"color": "009933"
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

	formatBM: function (data) {

		//Here you format BM JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var bmSite = {};
				bmSite["name"] = data[i].system;
				bmSite["cat"] = [200];
				bmSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_biology.systemsData.systems.push(bmSite);
			}

		}

	},

	formatBT: function (data) {

		//Here you format BT JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var btSite = {};
				btSite["name"] = data[i].system;
				btSite["cat"] = [300];
				btSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_biology.systemsData.systems.push(btSite);
			}

		}

	},

	formatFG: function (data) {

		//Here you format FG JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var fgSite = {};
				fgSite["name"] = data[i].system;
				fgSite["cat"] = [400];
				fgSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_biology.systemsData.systems.push(fgSite);
			}

		}

	},

	formatTB: function (data) {

		//Here you format TB JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tbSite = {};
				tbSite["name"] = data[i].system;
				tbSite["cat"] = [1200];
				tbSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_biology.systemsData.systems.push(tbSite);
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

		//BM Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_biology.parseData("data/csvCache/bmDataCache.csv", canonnEd3d_biology.formatBM, resolve);
		});

		//BT Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_biology.parseData("data/csvCache/btDataCache.csv", canonnEd3d_biology.formatBT, resolve);
		});

		//FG Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_biology.parseData("data/csvCache/fgDataCache.csv", canonnEd3d_biology.formatFG, resolve);
		});

		//TB Sites
		var p4 = new Promise(function (resolve, reject) {
			canonnEd3d_biology.parseData("data/csvCache/tbDataCache.csv", canonnEd3d_biology.formatTB, resolve);
		});

		Promise.all([p1, p2, p3, p4]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_biology.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [50, 10000],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};