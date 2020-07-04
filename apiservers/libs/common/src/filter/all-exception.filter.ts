import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { ErrorTypeEnum, ErrorValueEnum } from "../error/error.enum";

/** 全局-异常过滤器<格式转换> */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException|Error|any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    // 取异常的message,status 
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // TODO
    // 根据自己的业务需求来做异常过滤
    // APIException 继承 HttpException
    // 加入自己的异常处理逻辑
    // 对于自定义异常,需要写入错误码
    // console.log('exception: ', exception)
    const errorCode = exception.response?.errorCode || ErrorTypeEnum.ERROR_TYPE_DEFAULT
    const message = exception.message || ErrorValueEnum.ERROR_TYPE_DEFAULT

    response
      .status(status)  // 状态码
      .json({
        message,                                        // 错误消息
        errorCode,                                      // 自定义的错误码
        request: `${request.method} ${request.path}`,   // 请求地址
        timestamp: new Date().toISOString(),            // 响应的时间戳
        statusCode: status                              // 状态码
      })
  }
}