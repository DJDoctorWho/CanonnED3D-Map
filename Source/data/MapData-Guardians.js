var canonnEd3d_guardians = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems",
					"color": "FF9D00"
				}
			},
			"Brain Trees - (BT)": {
				"300": {
					"name": "Brain Tree",
					"color": "ff66cc"
				}
			},
			"Guardian Ruins - (GR)": {
				"700": {
					"name": "Alpha",
					"color": "ff0000"
				},
				"701": {
					"name": "Beta",
					"color": "0066ff"
				},
				"702": {
					"name": "Gamma",
					"color": "00ff00"
				},
				"703": {
					"name": "Unknown",
					"color": "800000"
				}
			},
			"Guardian Structures - (GS)": {
				"704": {
					"name": "Lacrosse",
					"color": "2EFEC8"
				},
				"705": {
					"name": "Crossroads",
					"color": "0080FF"
				},
				"706": {
					"name": "Fistbump",
					"color": "4000FF"
				},
				"707": {
					"name": "Hammerbot",
					"color": "BF00FF"
				},
				"708": {
					"name": "Bear",
					"color": "FF00FF"
				},
				"709": {
					"name": "Bowl",
					"color": "DF0174"
				},
				"710": {
					"name": "Turtle",
					"color": "0404B4"
				},
				"711": {
					"name": "Robolobster",
					"color": "9AFE2E"
				},
				"712": {
					"name": "Squid",
					"color": "D0F5A9"
				},
				"713": {
					"name": "Stickyhand",
					"color": "D7DF01"
				},
				"714": {
					"name": "Unknown",
					"color": "800000"
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
			"name": "Gamma Velorum",
			"coords": {
				"x": "1099.21875",
				"y": "-146.6875",
				"z": "-133.59375"
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
		}, {
			"name": "Colonia",
			"coords": {
				"x": "-9530.5",
				"y": "-910.28125",
				"z": "19808.125"
			},
			"cat": [
				"100"
			]
		}, {
			"name": "Canonnia",
			"coords": {
				"x": "-9522.9375",
				"y": "-894.0625",
				"z": "19791.875"
			},
			"cat": [
				"100"
			]
		}]
	},

	// Lets get data from CSV Files

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
				canonnEd3d_guardians.systemsData.systems.push(btSite);
			}

		}

	},

	formatGR: function (data) {
		//Here you format GR JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var grSite = {};
				grSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Alpha") {
					grSite["cat"] = [700];
				} else if (data[i].type.toString() == "Beta") {
					grSite["cat"] = [701];
				} else if (data[i].type.toString() == "Gamma") {
					grSite["cat"] = [702];
				} else {
					grSite["cat"] = [703];
				}
				grSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_guardians.systemsData.systems.push(grSite);
			}

		}

	},

	formatGS: function (data) {
		//Here you format GS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gsSite = {};
				gsSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Lacrosse") {
					gsSite["cat"] = [704];
				} else if (data[i].type.toString() == "Crossroads") {
					gsSite["cat"] = [705];
				} else if (data[i].type.toString() == "Fistbump") {
					gsSite["cat"] = [706];
				} else if (data[i].type.toString() == "Hammerbot") {
					gsSite["cat"] = [707];
				} else if (data[i].type.toString() == "Bear") {
					gsSite["cat"] = [708];
				} else if (data[i].type.toString() == "Bowl") {
					gsSite["cat"] = [709];
				} else if (data[i].type.toString() == "Turtle") {
					gsSite["cat"] = [710];
				} else if (data[i].type.toString() == "Robolobster") {
					gsSite["cat"] = [711];
				} else if (data[i].type.toString() == "Squid") {
					gsSite["cat"] = [712];
				} else if (data[i].type.toString() == "Stickyhand") {
					gsSite["cat"] = [713];
				} else {
					gsSite["cat"] = [714];
				}
				gsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_guardians.systemsData.systems.push(gsSite);
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

		//BT Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_guardians.parseData("data/csvCache/btDataCache.csv", canonnEd3d_guardians.formatBT, resolve);
		});

		//GR Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_guardians.parseData("data/csvCache/grDataCache.csv", canonnEd3d_guardians.formatGR, resolve);
		});

		//GS Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_guardians.parseData("data/csvCache/gsDataCache.csv", canonnEd3d_guardians.formatGS, resolve);
		});

		Promise.all([p1, p2, p3]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_guardians.systemsData,
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