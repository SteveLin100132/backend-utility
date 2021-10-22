/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料消費者範例
 * @CREATE Friday, 22nd October 2021 8:11:47 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as mqtt from 'mqtt';
import { mergeMap } from 'rxjs/operators';
import {
  MqttConsumerAdapter,
  MqttPayloadStrategy,
} from 'wistroni40-backend-utility';

// 初始化 MQTT
const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'your/topic/#';
const consumer = new MqttConsumerAdapter(client, topic);

// MQTR Payload 解析策略
const strategy = new MqttPayloadStrategy();

// 訂閱資料
consumer
  .consume()
  .pipe(mergeMap(res => strategy.resolve(res)))
  .subscribe(res => console.log(res));
