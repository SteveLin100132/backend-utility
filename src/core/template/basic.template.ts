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

import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Consumer } from '../consumer';
import { Log4js, LoggerAdapter } from '../logger';
import { Producer } from '../producer';

/**
 * 抽象基礎流程範本
 */
export abstract class BasicTemplate<S = any, R = any, P = any> {
  /**
   * 日誌
   */
  protected logger: LoggerAdapter = new Log4js(this.id);

  /**
   * @param id 流程 ID
   */
  constructor(protected id = 'PROCESS') {}

  /**
   * 取得資料消費者
   *
   * @method public
   * @return 回傳資料消費者
   */
  public abstract consumer(): Promise<Consumer<S>>;

  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public abstract resolve(message: S): Promise<R>;

  /**
   * 打包發送數據
   *
   * @method public
   * @param message 消費資料
   * @return 回傳打包後的數據
   */
  public abstract payload(message: R): Promise<P>;

  /**
   * 取得資料生產者
   *
   * @method public
   * @return 回傳資料生產者
   */
  public abstract producer(): Promise<Producer<P>>;

  /**
   * 執行流程
   *
   * @method public
   * @return 回傳流程執行結果
   */
  public async execute(): Promise<Observable<any>> {
    const consumer = await this.consumer();
    const producer = await this.producer();
    return consumer.consume().pipe(
      // 解析消費後的資料
      mergeMap(message => this.resolve(message)),
      // 打包發送數據
      mergeMap(message => this.payload(message)),
      // 發送數據
      tap(payload => producer.publish(payload)),
    );
  }
}
