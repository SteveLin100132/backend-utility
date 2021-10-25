"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttDynamicTopicProducerStrategy = void 0;
/**
 * MQTT 動態主題資料解析策略
 */
class MqttDynamicTopicProducerStrategy {
    /**
     * @param _topic 要訂閱的主題
     */
    constructor(_topic) {
        this._topic = _topic;
    }
    /**
     * 解析資料
     *
     * @method public
     * @return 回傳解析後的資料
     */
    resolve(source) {
        return __awaiter(this, void 0, void 0, function* () {
            return { topic: this._topic, message: JSON.stringify(source) };
        });
    }
}
exports.MqttDynamicTopicProducerStrategy = MqttDynamicTopicProducerStrategy;
