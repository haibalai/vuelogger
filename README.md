# vuelogger代码结构



#### 1. 功能说明：

vuelogger用于js 日志


#### 使用方式

* 安装 vuelogger

```
 npm install vuelogger --save

```

* 导入方式

```
 import vuelogger from 'vuelogger'
 
```

* 使用
* 建议主工程要new一个自己的logger 当分包模块也需要logger 也需要new一个
loggger不做成单例模式。

```
 let MyLogger = vuelogger.MyLogger;
 var log  = new MyLogger();
 log.setLevel(vuelogger.LoggerType.WARN)
 log.debug("hello world");
 
```

#### API说明：
 1. 功能说明：
---
#### 
 * logger 等级，分为 DEBUG，INFO，WARN，ERROR，OFF
 默认设置DEBUG等级，
  * 如果要设置 warn等级 debug和info不可见
 所有都不可见可以设置off等级

```
 log.setLevel(vuelogger.LoggerType.WARN)

```

#### 
 * 等级调用方式分为 debug，info，warn，error四个接口

```
log.debug("hello world");
log.info("hello world");
log.error("hello world");
log.warn("hello world");

```
---
#### 

 * 可以设置log的type形式，http方式（接入数据没写）
 预设值console方式

```
//只打印
log.logOutput = ["console"];
//打印并输出到后台
log.logOutput = ["console","http"];

```
 * 可以设置模块方式
 * 如果做A模块 可以统一加模块名 这样输出的日志就代表从A模块出来的
 
 ```
  //输出 【AAA】 6666
  log.getMoudle("AAA").debug("66666");
  
 ```
 
  * 可以设置过滤模块
  * 如果多个模块联合调试，比如A，B，C模块 只想看A ，B模块的日志
  
  
  ```
   log.moduleFlag = ["A","B"];
   //输出 【A】 AAA
   log.getMoudle("A").debug("AAA");
   //输出 【B】 BBB
   log.getMoudle("B").debug("BBB");
   //不输出
   log.getMoudle("C").debug("CCC");
   
  ```
