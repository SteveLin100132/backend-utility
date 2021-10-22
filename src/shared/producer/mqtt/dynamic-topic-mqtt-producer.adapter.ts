/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： 動態主題 MQTT 資料生產者轉接器
 * @CREATE Friday, 22nd October 2021 4:32:02 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Client, IClientPublishOptions } from 'mqtt';
import { MqttDynamicTopicMessage } from 'src/shared';
import { ProducerAdapter, PublishCallback } from '../../../core';

/**
 * 動態主題 MQTT 資料生產者轉接器
 */
export class DynamicTopicMqttProducerAdapter extends ProducerAdapter<
  Client,
  MqttDynamicTopicMessage
> {
  /**
   * @param producer      資料生產者
   * @param publishedOpts 上拋配置
   */
  constructor(
    protected producer: Client,
    protected publishedOpts?: IClientPublishOptions,
  ) {
    super(producer);
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param message 資料
   * @param cb      上拋回呼
   */
  public publish(message: MqttDynamicTopicMessage, cb?: PublishCallback): void {
    const topic = message.topic;
    const payload = message.message;
    const options = this.publishedOpts;
    if (options) {
      this.producer.publish(topic, payload, options, (error, packet) => {
        if (cb) {
          cb(error, packet);
        }
      });
    } else {
      this.producer.publish(topic, payload, (error, packet) => {
        if (cb) {
          cb(error, packet);
        }
      });
    }
  }
}
