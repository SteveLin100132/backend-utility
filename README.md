# backend-utility

# Install

```
npm i backend-utility --save
```

# Table of Contents

- [Feature](#feature)
- [Consumer API](#consumer-api)
- [Template API](#template-api)

# Feature

- Logger
  - 提供抽象日誌轉接器，提供客製日誌功能
  - 提供 Log4js 日誌轉接器
- CRON
  - 提供抽象排程執行器，提供客製設定排程工作
  - 提供 ElasticSearch 查詢排程執行器
  - 提供 HTTP(Axios) GET 查詢排程執行器
- Consumer
  - 提供 Consumer 抽象類別，提供客製 Consumer 轉接器
  - 提供 Kafka Consumer 轉接器
  - 提供 MQTT Consumer 轉接器
  - 提供 CRON Consumer 轉接器
  - 提供複合式 Consumer 轉接器，可插入多個轉接器，介接多個數據來源
  - 提供 Consumer 資料解析策略
    - 提供 Kafka Confluent Avro 資料解析策略
    - 提供 Kafka JSON 資料解析策略
    - 提供 MQTT JSON 資料解析策略
    - 提供 ElasticSearch Hits 資料解析策略
    - 提供 ElasticSearch 聚合資料解析策略
- Producer
  - 提供 Producer 抽象類別，提供客製 Producer 轉接器
  - 提供 Kafka Producer 轉接器
  - 提供 HTTP(Axios) Post 轉接器
  - 提供 MQTT Producer 轉接器
  - 提供動態主題 MQTT Producer 轉接器
  - 提供帶有重拋機制的 Producer 轉接器
- Template
  - 提供基礎作業流程範本

# Example

- [MQTT Consumer 範例](https://github.com/SteveLin100132/wistroni40-backend-utility/blob/master/examples/consumer/mqtt-consumer.ts)
- [Kafka JSON Consumer 範例](https://github.com/SteveLin100132/wistroni40-backend-utility/blob/master/examples/consumer/kafka-json-consumer.ts)

# Consumer API

Consumer 物件作為介接報警獲取所需的資料來源，目前提供以下轉接器，若所需要的
Consumer 不包含在以下，可實作 `ConsumerAdapter`

- Kafka: 支持 `kafka-node` 套件的轉接器，該套件使用方式可參閱
  https://www.npmjs.com/package/kafka-node
- MQTT: 支持 `mqtt` 套件的轉接器，該套件使用方式可參閱
  https://www.npmjs.com/package/mqtt
- CRON: 支持使用排程定期呼叫資料，可作為 Batch 或轉換為 Streaming 的方式使用，目
  前提供以下幾種 datasource 進行串接
  - ElasticSearch: 支持 `elasticsearch` 套件的執行器，該套件使用方式可參閱
    https://www.npmjs.com/package/elasticsearch

## Custom Consumer Adapter

若無匹配的轉接器，可透過以下方式自行客製，以 MQTT 為例

```typescript
import { MqttClient } from 'mqtt';
import { IPublishPacket } from 'mqtt-packet';
import { Observable } from 'rxjs';
import { ConsumerAdapter } from 'wistroni40-backend-utility';

export class MqttConsumerAdapter extends ConsumerAdapter<
  MqttClient,
  IPublishPacket
> {
  /**
   * @param consumer 資料消費者
   * @param topic    要訂閱的主題
   */
  constructor(protected consumer: MqttClient, protected topic: string) {
    super(consumer);
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<IPublishPacket> {
    return new Observable(sub => {
      this.consumer.on('connect', () => this.consumer.subscribe(this.topic));
      this.consumer.on('message', (topic, payload, packet) => sub.next(packet));
    });
  }
}
```

# Template API

Template 提供工作流程範本，僅需繼承該範本並實作其中的方法，即可透過調用
`execute()` 方法進行數據處理

```typescript
export class MyDataFlowService extends BasicTemplate<S, R, P> {
  public consumer(): Promise<Consumer<S>> {
    return; /** 回傳對應的 Consumer */
  }

  public resolve(message: S): Promise<R> {
    return; /** 回傳資料解析後的結果 */
  }

  public payload(message: R): Promise<P> {
    return; /** 回傳上拋資料的格式 */
  }

  public producer(): Promise<Producer<P>> {
    return; /** 回傳對應的 Producer */
  }
}

const myDataFlow = new MyDataFlowService('my-service');
myDataFlow.execute().subscribe(result => /** TODO */)
```
