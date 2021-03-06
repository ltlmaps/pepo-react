import PepoApi from './PepoApi';
import deepGet from 'lodash/get';

const VCErrors = {
  AlreadyFetchingError: 'AlreadyFetchingError',
  NoMoreRecords: 'NoMoreRecords',
  InvalidApiResponse: 'InvalidApiResponse'
};

let idCnt = 1;

let defaultOptions = {
  removeDuplicate: true
};

class FetchServices {
  constructor(url, params, id = 'fcomp_' + String(idCnt++), options = {}) {
    this.id = id;
    this.url = url;
    this.extraParams = params;
    this.options = Object.assign({}, defaultOptions, options);
    this.initVals();
  }

  initVals() {
    //NOTE: If adding removing vals from here, update cloneWithData method.
    this.isFetching = false;
    this.hasNextPage = true;
    this.nextPagePayload = null;
    this.results = [];
    this.meta = null;
    this.resultMap = {};

    const seedData = this.options.seedData;
    if ( seedData && seedData.length > 0) {
      this.processResults( seedData );
    }
  }

  getUrlParams() {
    let params = {};
    if (this.extraParams) {
      Object.assign(params, this.extraParams);
    }
    if (this.nextPagePayload) {
      Object.assign(params, this.nextPagePayload);
    }
    return params;
  }

  fetch() {
    if (this.isFetching) {
      return Promise.reject({
        code_error: VCErrors.AlreadyFetchingError
      });
    }

    if (!this.hasNextPage) {
      return Promise.reject({
        code_error: VCErrors.NoMoreRecords
      });
    }

    this.isFetching = true;
    let api = new PepoApi(this.url);

    return api
      .get(this.getUrlParams())
      .then((response) => {
        if (!response || !response.success || !response.data) {
          return Promise.reject(response);
        }
        setTimeout(() => {
          this.isFetching = false;
        }, 100);
        return this.dataReceived(response);
      })
      .catch((err) => {
        this.isFetching = false;
        return Promise.reject(err);
      });
  }

  dataReceived(response) {
    let data = response.data;
    let meta = data.meta;
    this.nextPagePayload = meta ? meta.next_page_payload : null;
    this.meta = meta;
    this.hasNextPage = this.nextPagePayload ? true : false;
    let dataToAppend = this.processData(response);
    this.isFetching = false;
    return dataToAppend;
  }

  processData(response) {
    let data = response.data;
    let resultType = data.result_type;
    if (!resultType || !data[resultType]) {
      response.code_error = VCErrors.InvalidApiResponse;
      // Invalid response.
      throw response;
    }
    let results = data[resultType];
    if (!(results instanceof Array)) {
      response.code_error = VCErrors.InvalidApiResponse;
      // Invalid response.
      throw response;
    }
    return this.processResults( results, response );
  }

  processResults(results, response) {
    let cleanedUpList = [];
    let cnt = 0,
      len = results.length;
    for (; cnt < len; cnt++) {
      let result = results[cnt];
      let resultId = result.id;

      // Format Data.
      result = this.formatResult(result, response);
      if (!result) {
        // Some wrong entry.
        continue;
      }
      let existingResult = this.resultMap[resultId];
      // Update existing result if available.
      if (existingResult && this.options.removeDuplicate) {
        Object.assign(existingResult, result);
        continue;
      }

      // Add new result.
      this.resultMap[resultId] = result;
      this.results.push(result);
      cleanedUpList.push(result);
    }
    return cleanedUpList;
  }

  refresh() {
    this.initVals();
    return this.fetch();
  }

  formatResult(result, response) {
    return result;
  }

  getAllResults() {
    return this.results;
  }

  getIDList(key = 'id') {
    return this.results.map((item) => deepGet(item, key));
  }

  getMeta(){
    return this.meta;
  }

  clone() {
    let Constructor = this.constructor;
    return new Constructor(this.url, this.extraParams, this.id, this.options);
  }

  cloneWithData() {
    let Constructor = this.constructor;
    let newInstance = new Constructor(this.url, this.extraParams, this.id);
    const seedData = this.result;

    newInstance.processResults( this.results || []);
    newInstance.isFetching = false;
    newInstance.hasNextPage = this.hasNextPage;
    newInstance.nextPagePayload = this.nextPagePayload;
    newInstance.meta = Object.assign({}, this.meta);
    console.log("newInstance.results.length", newInstance.results.length);
    return newInstance;
  }

  cloneInstance(){
    return  Object.assign( Object.create( Object.getPrototypeOf(this)), this);
  }
}

export { FetchServices, VCErrors };
