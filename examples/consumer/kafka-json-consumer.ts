/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： Kafka JSON 資料消費者範例
 * @CREATE Friday, 22nd October 2021 8:40:23 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConsumerGroup } from 'kafka-node';
import { mergeMap } from 'rxjs/operators';
import {
  generateKafkaConsumerOptions,
  JsonConsumeStrategy,
  KafkaConsumerAdapter,
} from 'wistroni40-backend-utility';

// 初始化 Kafka Consumer
const host = 'localhost:9092';
const topic = 'your.topic';
const options = generateKafkaConsumerOptions(host);
const consumer = new ConsumerGroup(options, topic);

// Kafka 轉接器
const consumerAdapter = new KafkaConsumerAdapter(consumer);

// Kafka JSON 解析策略
const strategy = new JsonConsumeStrategy();

// 訂閱資料
consumerAdapter
  .consume()
  .pipe(mergeMap(res => strategy.resolve(res)))
  .subscribe(res => console.log(JSON.stringify(res)));
