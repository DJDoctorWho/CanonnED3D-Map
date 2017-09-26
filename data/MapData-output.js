var canonnEd3d_all = {

	//Define Categories
	systemsData: {
		"categories": {
			"Points of Interest - POI": {
				"100": {
					"name": "System",
					"color": "F7F7F7"
				},
				"101": {
					"name": "MegaShips",
					"color": "f4f142"
				}
			},
			"Barnacles - (BN)": {
				"200": {
					"name": "Barnacle",
					"color": "44f441"
				}
				// Disabled until output shows status
				/*			"200": {
				"name": "Ripe",
				"color": "F7F7F7"
				},
				"201": {
				"name": "Dead",
				"color": "F7F7F7"
				} */
			},
			"Brain Trees - (BT)": {
				"300": {
					"name": "Brain Tree",
					"color": "41e5f4"
				}
			},
			"Guardian Ruins - (GR)": {
				"400": {
					"name": "Alpha",
					"color": "f44141"
				},
				"401": {
					"name": "Beta",
					"color": "f4b241"
				},
				"402": {
					"name": "Gamma",
					"color": "f441d0"
				}
			},
			"Thargoid Structures - (TS)": {
				"500": {
					"name": "Active",
					"color": "4152f4"
				},
				"501": {
					"name": "Inactive",
					"color": "9d41f4"
				}
			},
			"Error Sites": {
				"600": {
					"name": "Invalid Data Information",
					"color": "150187"
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
			}, {
				"name": "Col 173 Sector LJ-F C12-0 (The Cete)",
				"coords": {
					"x": "1202.125",
					"y": "-213.40625",
					"z": "-165.5625"
				},
				"cat": [
					"101"
				]
			},
		]
	},

	// Lets get data from CSV Files
	formatBN: function (data) {
		//Here you format BN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var bnSite = {};
				bnSite["name"] = data[i].system;

				//Ripe or Dead Status not enabled yet, pending CSV fixes
				bnSite["cat"] = [200];
				bnSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				this.systemsData.systems.push(bnSite);
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
				this.systemsData.systems.push(btSite);
			}

		}

	},

	formatTS: function (data) {
		//Here you format TS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var tsSite = {};
				tsSite["name"] = data[i].system;

				//Check if Site is Active or Inactive, set Category to match
				if (data[i].active.toString().toLowerCase() == "y") {
					tsSite["cat"] = [500];
				} else {
					tsSite["cat"] = [501];
				}
				tsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				this.systemsData.systems.push(tsSite);
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
					grSite["cat"] = [400];
				} else if (data[i].type.toString() == "Beta") {
					grSite["cat"] = [401];
				} else if (data[i].type.toString() == "Gamma") {
					grSite["cat"] = [402];
				} else {
					grSite["cat"] = [600];
				}
				grSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				this.systemsData.systems.push(grSite);
			}

		}

	},

	parseData: function (url, callBack, resolvePromise) {
		Papa.parse(url, {
			download: true,
			header: true,
			complete: function (results) {

				console.log(results); // This is probably your data
				console.log(results.data); // This is probably undefined
				callBack(results.data);

				// after we called the callback
				// (which is synchronous, so we know it's safe here)
				// we can resolve the promise

				resolvePromise();
			}
		});
	},

	init: function () {

		var p1 = new Promise(function (resolve, reject) {
				parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGOwaRT8ESad9j0GAQ7tMMNj8ObxipFW8fop3eaZ-HoCVo_k9dQsHVvs1oFvARrY5SC6o4uDAWKQA/pub?gid=290263950&single=true&output=csv", formatBN, resolve);
			});

		var p2 = new Promise(function (resolve, reject) {
				parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRdEQQByWyU8MlzfJw9SzEsaM9c_zDV_RJ49Fiox842EEELrUHpMPexLYhjqNB8SOzB564jJ_oLdBx2/pub?gid=0&single=true&output=csv", formatBT, resolve);
			});

		var p3 = new Promise(function (resolve, reject) {
				parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-rhi1p4BU7AlOSj7_78Kvk5Ox6vb39vzzlWU3yI-dqlaLxk-CFLWvAFKc-J7WhomFiQ_u0P7Stxz/pub?gid=0&single=true&output=csv", formatTS, resolve);
			});

		var p4 = new Promise(function (resolve, reject) {
				parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vTSvkdtHr0SbM4dYOCsDalp1hRilWt2I5Hz1l2OIgbfR8Hs-lOCat_ZUyhyBnuv9R9rXz9vnhaYif2-/pub?gid=0&single=true&output=csv", formatGR, resolve);
			});

		Promise.all([p1, p2, p3, p4]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: this.systemsData,
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
