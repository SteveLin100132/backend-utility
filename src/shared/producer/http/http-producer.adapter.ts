/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： HTTP 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 3:30:10 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ProducerAdapter, PublishCallback } from '../../../core';

/**
 * HTTP 資料生產者轉接器
 */
export class HttpProducerAdapter<D = any> extends ProducerAdapter<
  AxiosInstance,
  D
> {
  /**
   * @param _url     HTTP 查詢路徑
   * @param _config  HTTP 查詢配置
   * @param producer 資料生產者
   */
  constructor(
    private _url: string,
    private _config?: AxiosRequestConfig,
    protected producer: AxiosInstance = axios,
  ) {
    super(producer);
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param data 資料
   * @param cb   上拋回呼
   */
  public publish(data: D, cb?: PublishCallback): void {
    this.producer
      .post(this._url, data, this._config)
      .then(res => (cb ? cb(null, res) : null))
      .catch(err => (cb ? cb(err, null) : null));
  }
}
