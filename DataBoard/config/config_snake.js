/**
 * @author Snake8859@CSUFT 2020
 * 基础配置文件
 */

var configOptions = {
  localroot: getPathRootJump(),
  remoteroot: 'http://www.snake8859.top/DataBoard/',
  projectId: 'DataBoard',
  mapbox: {
    mapboxToken: 'pk.eyJ1Ijoiamlhb3l1ZSIsImEiOiJjazlzNjB6eXcxMjI0M3J0cml3M3J5a3B1In0.wQZvwKyZ_x1CpvBp_gKWDQ',
    styleId: 'mapbox://styles/jiaoyue/ck9sha5jj24ex1io9nbv18k0n',
    home: {
      center: [62.0031, 26.9787],
      zoom: 2
    },
    yls: {
      center: [112.9373, 28.1887],
      zoom: 13.632
    },
    hzSubway: {
      center: [120.213, 30.2168],
      zoom: 10.923
    }
  },
  //local
  // "geojson": {
  //     "world": getPathRootJump() + "example/countriesNEW.geo.json",
  //     "countryFolder": getPathRootJump() + "/example/world/",
  //     "china": getPathRootJump() + "example/chinaNEW.geo.json",
  //     'yls': getPathRootJump() + "example/yls_wgs84.json",
  //     'hz': getPathRootJump() + "example/hz_line_wgs84.json"
  // },
  // "people": {
  //     "dataUrl": "http://localhost:8865/map/generateHeatDataByTime",
  //     "allDataUrl": "http://localhost:8865/map/generateHeatDataByDate",
  //     "geojsonDataUrl": "http://localhost:8865/map/generateHeatDataGeoJsonByTime",
  //     "geojsonAllDataUrl": "http://localhost:8865/map/generateHeatDataGeoJsonByDate",
  //     "officialDataUrl": "https://heat.qq.com/api/getHeatDataByTime.php",
  //     "officialAllDataUrl": "https://heat.qq.com/api/getHeatDataByDate.php"
  // },
  // "subway": {
  //     "dataUrl": "../example/subwayDemoData.json"
  // },

  //remote
  // "geojson": {
  //     "world": "http://www.snake8859.top/DataBoard/example/countriesNEW.geo.json",
  //     "countryFolder": "http://www.snake8859.top/DataBoard/example/world/",
  //     "china": "http://www.snake8859.top/DataBoard/example/chinaNEW.geo.json",
  //     'yls': "http://www.snake8859.top/DataBoard/example/yls_wgs84.json",
  //     'hz': "http://www.snake8859.top/DataBoard/example/hz_line_wgs84.json"
  // },
  geojson: {
    world: 'http://127.0.0.1:5500/DataBoard/example/countriesNEW.geo.json',
    countryFolder: 'http://127.0.0.1:5500/DataBoard/example/world/',
    china: 'http://127.0.0.1:5500/DataBoard/example/chinaNEW.geo.json',
    yls: 'http://127.0.0.1:5500/DataBoard/example/yls_wgs84.json',
    hz: 'http://127.0.0.1:5500/DataBoard/example/hz_line_wgs84.json'
  },
  people: {
    dataUrl: 'http://49.233.42.217:8865/map/generateHeatDataByTime',
    allDataUrl: 'http://49.233.42.217:8865/map/generateHeatDataByDate',
    geojsonDataUrl: 'http://49.233.42.217:8865/map/generateHeatDataGeoJsonByTime',
    geojsonAllDataUrl: 'http://49.233.42.217:8865/map/generateHeatDataGeoJsonByDate',
    officialDataUrl: 'https://heat.qq.com/api/getHeatDataByTime.php',
    officialAllDataUrl: 'https://heat.qq.com/api/getHeatDataByDate.php'
  },
  subway: {
    dataUrl: 'http://www.snake8859.top/DataBoard/example/subwayDemoData.json'
  },

  // "COVID": {
  //     "overAllData": "https://lab.isaaclin.cn/nCoV/api/overall?latest=true",
  //     "worldAreaData": "https://lab.isaaclin.cn/nCoV/api/area?latest=true",
  //     "chinaAreaData": "https://lab.isaaclin.cn/nCoV/api/area?countryEng=China&latest=true",
  //     "newsData": "https://lab.isaaclin.cn/nCoV/api/news?page=1&num=10",
  //     "rumorData": "https://lab.isaaclin.cn/nCoV/api/rumors?page=1&num=10"
  // },

  //local
  // "MyService": {
  //     "overAllData": "http://127.0.0.1:8866/covid-19/overall",
  //     "chinaAreaData": "http://127.0.0.1:8866/covid-19/province",
  //     "worldAreaData": "http://127.0.0.1:8866/covid-19/abroad",
  //     "newsData": "http://127.0.0.1:8866/covid-19/news",
  //     "rumorData": "http://127.0.0.1:8866/covid-19/rumor"
  // }

  //remote
  MyService: {
    overAllData: 'http://49.233.42.217:8866/covid-19/overall',
    chinaAreaData: 'http://49.233.42.217:8866/covid-19/province',
    worldAreaData: 'http://49.233.42.217:8866/covid-19/abroad',
    newsData: 'http://49.233.42.217:8866/covid-19/news',
    rumorData: 'http://49.233.42.217:8866/covid-19/rumor'
  }
};

function getPathRootJump() {
  var pathName = window.location.pathname.substring(1);
  // console.log(window.location);
  var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
  var path_root = window.location.protocol + '//' + window.location.host + '/' + webName + '/';
  return path_root;
}
