import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

/** 返回信息体 */
interface Response<T> {
  data: T;
}

/** 全局-响应成功-返回消息格式转换拦截器 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<any>):  Observable<Response<T>> {
    return next.handle().pipe(
      // 需要rxjs做转换的操作
      map(data => ({
        errorCode: 0,
        message: 'ok',
        data
      }))
    )
  }
}
