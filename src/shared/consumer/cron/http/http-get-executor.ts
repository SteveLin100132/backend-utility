/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： HTTP 查詢排程執行器
 * @CREATE Friday, 22nd October 2021 8:18:47 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CronExecutor } from './../../../../core';

/**
 * HTTP 查詢排程執行器
 */
export class HttpGetExecutor<D = any>
  implements CronExecutor<AxiosResponse<D>>
{
  /**
   * @param _url    HTTP 查詢路徑
   * @param _config HTTP 查詢配置
   * @param _http   Axios HTTP 實例
   */
  constructor(
    private _url: string,
    private _config?: AxiosRequestConfig,
    private _http: AxiosInstance = axios,
  ) {}

  /**
   * 執行特定動作
   *
   * @method public
   * @return 回傳執行結果
   */
  public async exec(): Promise<AxiosResponse<D>> {
    return this._http.get(this._url, this._config);
  }
}
