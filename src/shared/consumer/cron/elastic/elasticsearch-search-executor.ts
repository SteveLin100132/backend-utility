/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch 查詢排程執行器
 * @CREATE Tuesday, 14th September 2021 6:52:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Client } from 'elasticsearch';
import { CronExecutor, ElasticBuilder } from '../../../../core';
import { ElasticAggsStrategy, ElasticHitsStrategy } from './../../../consumer';

/**
 * ElasticSearch 查詢排程執行器
 */
export class ElasticsearchSearchExecutor<T = any> implements CronExecutor<T[]> {
  /**
   * @param _client          ElasticSearch客戶端
   * @param _index           ElasticSearch Index
   * @param _type            ElasticSearch Type
   * @param _queryBuilder    查詢語句建構者
   * @param _resolveStrategy 資料解析策略
   */
  constructor(
    private _client: Client,
    private _index: string,
    private _type: string | undefined,
    private _queryBuilder: ElasticBuilder,
    private _resolveStrategy: 'hits' | 'aggs' = 'hits',
  ) {}

  /**
   * 執行特定動作
   *
   * @method public
   * @return 回傳執行結果
   */
  public async exec(): Promise<T[]> {
    // 建構查詢語句
    const query = this._queryBuilder.build().toJSON();

    // 取得查詢結果
    const result = await this._client.search({
      index: this._index,
      type: this._type,
      body: query,
    });
    return this._resolveStrategy === 'hits'
      ? new ElasticHitsStrategy<T>().resolve(result as any)
      : new ElasticAggsStrategy<T>().resolve(result as any);
  }
}
