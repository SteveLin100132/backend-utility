/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： MQTT 動態主題資料解析策略
 * @CREATE Friday, 22nd October 2021 5:18:40 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProducerResolveStrategy as Strategy } from './../../../core';
import { MqttDynamicTopicMessage } from './mqtt-dynamic-topic-message';

/**
 * MQTT 動態主題資料解析策略
 */
export class MqttDynamicTopicProducerStrategy<S = any>
  implements Strategy<S, MqttDynamicTopicMessage>
{
  /**
   * @param _topic 要訂閱的主題
   */
  constructor(private _topic: string) {}

  /**
   * 解析資料
   *
   * @method public
   * @return 回傳解析後的資料
   */
  public async resolve(source: S): Promise<MqttDynamicTopicMessage> {
    return { topic: this._topic, message: JSON.stringify(source) };
  }
}
