importScripts('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', '../config/config_snake.js', '../indexedDB/index.js');

addEventListener('message', async function (e) {
  // console.log(e.data);
  const { datetime } = e.data;
  const startTime = new Date();
  for (let i = 12; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    try {
      const buffer = await readInYueluMountainCrowdDb(datetime + '-' + hour);
    } catch (err) {
      console.log(`${err}，开始写入indexedDB`);
      await requestCrowdInHour(datetime, hour);
    }
  }
  console.log(`耗时${(new Date() - startTime) / 1000}s`);
  // postMessage(e.data);
  close();
});

async function requestCrowdInHour(datetime, hour, isRender = false) {
  try {
    const res = await axios.get(configOptions.people.dataUrl, {
      params: {
        dateTime: datetime,
        hour: hour
      }
    });

    // console.log(res);
    if (res.data.code == '200') {
      //热力图生成成功
      // console.log(res);
      let heatData = res.data.data;

      let heatGeoJson = {
        type: 'FeatureCollection',
        features: []
      };

      heatData.forEach(element => {
        //构建单个要素
        let feature = {
          geometry: {
            coordinates: undefined,
            type: 'Point'
          },
          tpye: 'Feature',
          properties: {
            count: undefined
          }
        };
        feature.geometry.coordinates = [parseFloat(element.lng), parseFloat(element.lat)];
        feature.properties.count = parseInt(element.count);
        heatGeoJson.features.push(feature);
      });

      // console.log(heatGeoJson, new Date() - startTime);
      addToYueluMountainCrowdDb({ time: datetime + '-' + hour, data: heatGeoJson });
      if (isRender) {
        this._generateHeatMapByHour(heatGeoJson);
        step.autoPlay(this.pauseTime !== '23');
      }
    } else {
      // alert(res.data.msg + ',该时间暂无人流量数据');
      // clearInterval(interval);
      // this.playInfo = '播放';
      console.log(`${datetime} ${hour}点暂无人流量数据`);
    }
  } catch (err) {
    console.error(err);
  }
}
