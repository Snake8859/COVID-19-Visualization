const request = indexedDB.open('yueluMountainCrowdDb');
let db = null;

request.onerror = function (e) {
  console.error('indexedDB打开失败');
};

request.onsuccess = function (e) {
  db = request.result;
  console.log('indexedDB打开成功');
};

request.onupgradeneeded = function (e) {
  db = e.target.result;
  let objectStore = null;
  if (!db.objectStoreNames.contains('crowdInHour')) {
    objectStore = db.createObjectStore('crowdInHour', { keyPath: 'time' });
  }
};

function addToYueluMountainCrowdDb(options) {
  const { time, data } = options;
  const request = db.transaction(['crowdInHour'], 'readwrite').objectStore('crowdInHour').add({ time, data });

  request.onsuccess = function (e) {
    console.log('数据写入成功');
  };

  request.onerror = function (e) {
    console.log('数据写入失败');
  };
}

function readInYueluMountainCrowdDb(time) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['crowdInHour']);
    const objectStore = transaction.objectStore('crowdInHour');
    const request = objectStore.get(time);

    request.onerror = function (e) {
      reject('获取数据失败');
    };

    request.onsuccess = function (e) {
      if (request.result) {
        resolve(request.result.data);
      } else {
        reject('获取数据失败');
      }
    };
  });
}
