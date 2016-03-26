'use strict';

// Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
// https://github.com/request/request/issues/418
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const request = require('request');

module.exports = function EMTMadrid(idClient, passKey, lang) {
  let _idClient = idClient;
  let _passKey = passKey;
  let _lang = lang || 'ES';
  const _baseURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/';

  function _doRequest(path, form) {
    return new Promise((resolve, reject) => {
      form.idClient = _idClient;
      form.passKey = _passKey;
      const url = _baseURL + path;
      const requestData = {url, form};
      const requestCallback = function (error, response, body) {
        if (error) {
          reject(new Error(error));
        }
        resolve(body);
      };
      request.post(requestData, requestCallback);
    });
  }

  this._setIdClient = function (idClient) {
    _idClient = idClient;
  };

  this._setPassKey = function (passKey) {
    _passKey = passKey;
  };

  this._setLang = function (lang) {
    _lang = lang;
  };

  this._setCredentials = function (idClient, passKey) {
    this._setIdClient(idClient);
    this._setPassKey(passKey);
  };

  this.busGetCalendar = function (params) {
    const path = 'bus/GetCalendar.php';
    const data = {
      SelectDateBegin: params.startDate, // Mandatory
      SelectDateEnd: params.endDate // Mandatory
    };
    return _doRequest(path, data);
  };
  this.busGetGroups = function (params) {
    const path = 'bus/GetGroups.php';
    const data = {
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
  this.busGetListLines = function (params) {
    const path = 'bus/GetListLines.php';
    const data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetNodesLines = function (params) {
    const path = 'bus/GetNodesLines.php';
    const data = {
      Nodes: params.stops
    };
    return _doRequest(path, data);
  };
  this.busGetRouteLines = function (params) {
    const path = 'bus/GetRouteLines.php';
    const data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetRouteLinesRoute = function (params) {
    const path = 'bus/GetRouteLinesRoute.php';
    const data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetTimesLines = function (params) {
    const path = 'bus/GetTimesLines.php';
    const data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetTimeTableLines = function (params) {
    const path = 'bus/GetTimeTableLines.php';
    const data = {
      SelectDate: params.date,
      Lines: params.line
    };
    return _doRequest(path, data);
  };
  this.geoGetStreet = function (params) {
    const path = 'geo/GetStreet.php';
    const data = {
      description: params.description,
      streetNumber: params.streetNumber,
      Radius: params.radius
    };
    return _doRequest(path, data);
  };

  this.geoGetStopsFromStop = function (params) {
    const path = 'geo/GetStopsFromStop.php';
    const data = {
      idStop: params.idStop,
      Radius: params.radius,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };

  this.geoGetArriveStop = function (params) {
    const path = 'geo/GetArriveStop.php';
    const data = {
      idStop: params.idStop,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };

  this.geoGetStopsFromXY = function (params) {
    const path = 'geo/GetStopsFromXY.php';
    const data = {
      latitude: params.latitude,
      longitude: params.longitude,
      Radius: params.radius,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };

  this.geoGetGroups = function (params) {
    const path = 'geo/GetGroups.php';
    const data = {
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetInfoLine = function (params) {
    const path = 'geo/GetInfoLine.php';
    const data = {
      fecha: params.date,
      line: params.line,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
  this.GetInfoLineExtend = function (params) {
    const path = 'geo/GetInfoLineExtend.php';
    const data = {
      fecha: params.date,
      line: params.line,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetPointsOfInterest = function (params) {
    const path = 'geo/GetPointsOfInterest.php';
    const data = {
      latitude: params.lat,
      longitude: params.lng,
      tipos: params.typesPOI,
      Radius: params.radius,
      moreInfo: params.moreInfo,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetPointsOfInterestTypes = function (params) {
    const path = 'geo/GetPointsOfInterestTypes.php';
    const data = {
      moreInfo: params.moreInfo,
      cultureInfo: params.lang || _lang
    };
    return _doRequest(path, data);
  };
};
