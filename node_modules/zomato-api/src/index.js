const endpoints = require('./endponts');
const { values } = require('./default');
const axios = require('axios');
const cache = require('memory-cache');
const cloneDeep = require('lodash.clonedeep');

class Zomato {
  constructor(config) {
    endpoints.forEach(endpoint => {
      this[endpoint[0]] = (opts, cb) => {
        return getJson(config, endpoint[1], opts, cb);
      };
    });
  }
}

const getJson = (config, endpoint, opts, cb) => {
  if (opts == null) {
    opts = {};
  }
  let cacheKey = cloneDeep(opts);
  cacheKey.endpont = endpoint;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult !== null) {
    return new Promise((resolve, reject) => {
      if (cb) {
        cb(cachedResult, false);
      }
      resolve(cachedResult);
    });
  } else {
    const zomatoApi = axios.create({
      baseUrl: `${values.protocol}${values.hostName}${values.versionPath}`,
      timeout: values.timeout,
      headers: {
        'user-key': config.userKey
      }
    });
    const url = `${values.protocol}${values.hostName}${
      values.versionPath
    }${endpoint}`;

    return zomatoApi
      .get(url, {
        params: opts
      })
      .then(response => {
        if (response) {
          if (
            response.statusCode !== undefined &&
            response.statusCode !== 200
          ) {
            if (!cb) {
              throw response;
            } else {
              cb('error', response);
            }
          } else {
            response = response.data;
            if (values.cacheLimit > 0) {
              cache.put(cacheKey, response, values.cacheLimit);
            }

            if (cb) {
              cb(response, false);
            } else {
              return response;
            }
          }
        }
      })
      .catch(error => {
        if (!cb) {
          throw error;
        } else {
          cb('error', error);
        }
      });
  }
};

module.exports = Zomato;
