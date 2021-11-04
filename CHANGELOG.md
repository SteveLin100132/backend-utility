# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] 2021-11-04

### Update

#### Consumer

- ElasticSearch 查詢排程執行器，允許不設定 `type`

## [1.0.3] 2021-10-22

### Added

#### Consumer

- 建立動態主題 MQTT 資料解析策略

## [1.0.2] 2021-10-22

### Added

#### Consumer

- 建立動態主題 MQTT 資料生產者轉接器

## [1.0.1] 2021-10-22

### Changed

#### Consumer

- MQTT Consumer 轉接器提供多 Topic 訂閱

## [1.0.0] 2021-10-22

### Added

- Logger
  - 建立抽象日誌轉接器，提供客製日誌功能
  - 建立 Log4js 日誌轉接器
- CRON
  - 建立抽象排程執行器，提供客製設定排程工作
  - 建立 ElasticSearch 查詢排程執行器
  - 建立 HTTP(Axios) GET 查詢排程執行器
- Consumer
  - 建立 Consumer 抽象類別，提供客製 Consumer 轉接器
  - 建立 Kafka Consumer 轉接器
  - 建立 MQTT Consumer 轉接器
  - 建立 CRON Consumer 轉接器
  - 建立複合式 Consumer 轉接器，可插入多個轉接器，介接多個數據來源
  - 建立 Consumer 資料解析策略
    - 建立 Kafka Confluent Avro 資料解析策略
    - 建立 Kafka JSON 資料解析策略
    - 建立 MQTT JSON 資料解析策略
    - 建立 ElasticSearch Hits 資料解析策略
    - 建立 ElasticSearch 聚合資料解析策略
- Producer
  - 建立 Producer 抽象類別，提供客製 Producer 轉接器
  - 建立 Kafka Producer 轉接器
  - 建立 HTTP(Axios) Post 轉接器
  - 建立 MQTT Producer 轉接器
- Template
  - 建立基礎作業流程範本
