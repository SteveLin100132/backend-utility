"use strict";
/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： 抽象基礎流程範本
 * @CREATE Friday, 22nd October 2021 8:58:01 am
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
exports.BasicTemplate = void 0;
const operators_1 = require("rxjs/operators");
const logger_1 = require("../logger");
/**
 * 抽象基礎流程範本
 */
class BasicTemplate {
    /**
     * @param id 流程 ID
     */
    constructor(id = 'PROCESS') {
        this.id = id;
        /**
         * 日誌
         */
        this.logger = new logger_1.Log4js(this.id);
    }
    /**
     * 取得流程 ID
     *
     * @method public
     * @return 回傳流程 ID
     */
    getId() {
        return this.id;
    }
    /**
     * 執行流程
     *
     * @method public
     * @return 回傳流程執行結果
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.consumer();
            const producer = yield this.producer();
            return consumer.consume().pipe(
            // 解析消費後的資料
            (0, operators_1.mergeMap)(message => this.resolve(message)), 
            // 排除沒有資料的情況
            (0, operators_1.filter)(message => message !== undefined && message !== null), 
            // 打包發送數據
            (0, operators_1.mergeMap)(message => this.payload(message)), 
            // 排除沒有資料的情況
            (0, operators_1.filter)(message => message !== undefined && message !== null), 
            // 發送數據
            (0, operators_1.tap)(payload => producer.publish(payload)));
        });
    }
}
exports.BasicTemplate = BasicTemplate;
