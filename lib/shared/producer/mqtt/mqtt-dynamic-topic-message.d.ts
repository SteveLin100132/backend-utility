/**
 * 專案名稱： wistroni40-backend-utility
 * 部門代號： MLD500
 * 檔案說明： MQTT 動態主題資料
 * @CREATE Friday, 22nd October 2021 4:34:46 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * MQTT 動態主題資料
 */
export interface MqttDynamicTopicMessage {
    /**
     * 要上拋的主題
     */
    topic: string;
    /**
     * 要上拋的訊息
     */
    message: string;
}
