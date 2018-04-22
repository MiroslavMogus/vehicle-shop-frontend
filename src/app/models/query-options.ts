export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
  }

  export class QueryOptions implements QueryBuilder {
    public page: number;
    public pageSize: number;
    public sortBy?: Object;
    public isSortAscending?: boolean;
    public filter?: number;

    constructor() {
      this.page = 1;
      this.pageSize = 10000;
    }

    toQueryMap() {
      const queryMap = new Map<string, string>();
      queryMap.set('page', `${this.page}`);
      queryMap.set('pageSize', `${this.pageSize}`);
      queryMap.set('sortBy', `${this.sortBy}`);
      queryMap.set('isSortAscending', `${this.isSortAscending}`);
      queryMap.set('vehiclemakeid', `${this.filter}`);

      return queryMap;
    }

    toQueryString() {
      let queryString = '';
      this.toQueryMap().forEach((value: string, key: string) => {
        queryString = queryString.concat(`${key}=${value}&`);
      });

      return queryString.substring(0, queryString.length - 1);
    }
  }
