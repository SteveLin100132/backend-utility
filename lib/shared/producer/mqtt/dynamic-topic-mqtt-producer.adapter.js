"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicTopicMqttProducerAdapter = void 0;
const core_1 = require("../../../core");
/**
 * 動態主題 MQTT 資料生產者轉接器
 */
class DynamicTopicMqttProducerAdapter extends core_1.ProducerAdapter {
    /**
     * @param producer      資料生產者
     * @param publishedOpts 上拋配置
     */
    constructor(producer, publishedOpts) {
        super(producer);
        this.producer = producer;
        this.publishedOpts = publishedOpts;
    }
    /**
     * 上拋資料
     *
     * @method public
     * @param message 資料
     * @param cb      上拋回呼
     */
    publish(message, cb) {
        const topic = message.topic;
        const payload = message.message;
        const options = this.publishedOpts;
        if (options) {
            this.producer.publish(topic, payload, options, (error, packet) => {
                if (cb) {
                    cb(error, packet);
                }
            });
        }
        else {
            this.producer.publish(topic, payload, (error, packet) => {
                if (cb) {
                    cb(error, packet);
                }
            });
        }
    }
}
exports.DynamicTopicMqttProducerAdapter = DynamicTopicMqttProducerAdapter;
