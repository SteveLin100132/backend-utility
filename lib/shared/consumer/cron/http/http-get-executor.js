"use strict";
/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： HTTP 查詢排程執行器
 * @CREATE Friday, 22nd October 2021 8:18:47 am
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
exports.HttpGetExecutor = void 0;
const axios_1 = require("axios");
/**
 * HTTP 查詢排程執行器
 */
class HttpGetExecutor {
    /**
     * @param _url     HTTP 查詢路徑
     * @param _config  HTTP 查詢配置
     * @param _http    Axios HTTP 實例
     * @param _extract 是否將資料從回傳結果提取出
     */
    constructor(_url, _config, _http = axios_1.default, _extract = true) {
        this._url = _url;
        this._config = _config;
        this._http = _http;
        this._extract = _extract;
    }
    /**
     * 執行特定動作
     *
     * @method public
     * @return 回傳執行結果
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._extract) {
                return this._http.get(this._url, this._config).then(res => res.data);
            }
            else {
                return this._http.get(this._url, this._config);
            }
        });
    }
}
exports.HttpGetExecutor = HttpGetExecutor;
