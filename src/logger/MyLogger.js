/**
 * Created by Administrator on 2017/7/6 0006.
 */



function defineLogLevel(value, name) {
  return { value: value, name: name };
};


export  default  class MyLogger {

     constructor() {
            //初始设置level
            this.level = MyLogger.DEBUG;
            //分模块的MAP
            this.logHash = new Map();
            //设置模块
            this.logOwner = "main";
            //console http方式
            this.logOutput = ["console"];
            //设置过滤模块
            this.moduleFlag = [];
        }

    setLevel(newLevel) {
           this.level = newLevel;
       }

      getLevelfunction () {

          return this.level;
      }

    enabledFor (lvl) {

          return lvl.value >= this.level.value;
       }

     debug (messgage) {
        this.invoke(MyLogger.DEBUG, messgage);
       }

    info (messgage) {
        this.invoke(MyLogger.INFO, messgage);
      }

    warn (messgage) {
        this.invoke(MyLogger.WARN, messgage);
      }

    error (messgage) {
        this.invoke(MyLogger.ERROR, messgage);
      }

    log (messgage) {
      this.invoke(MyLogger.LOG, messgage);
    }

    invoke(context ,messages)
    {
      if (this.enabledFor(context)) {

        var hdlr = console.log;
        if (context === MyLogger.WARN && console.warn) {
          hdlr = console.warn;
        } else if (context ===MyLogger.ERROR && console.error) {
          hdlr = console.error;
        } else if (context ===MyLogger.INFO && console.info) {
          hdlr = console.info;
        } else if (context ===MyLogger.DEBUG && console.debug) {
          hdlr = console.debug;
        } else if (context ===MyLogger.LOG && console.debug) {
          hdlr = console.log;
        }


        this.invokeConsoleMethod(hdlr, messages);
      }

    }

  getMoudle(type)
  {
    if(!this.logHash.has(type))
    {
      let log = new MyLogger();
      log.logOwner = type;
      log.moduleFlag = this.moduleFlag;
      log.level = this.level;
      this.logHash.set(type,log);


    }
    return this.logHash.get(type);
  }


   invokeConsoleMethod(hdlr, messages) {

     if(this.logOutput.includes("console"))
     {
       if(this.logOwner != "main")
       {
         let flag = false;
         if(this.moduleFlag.length == 0)
         {
            flag = true;
         }
         else
         {
           if(this.moduleFlag.includes(this.logOwner))
           {
             flag = true;
           }
         }
         if(flag)
         {
           let moduleStr = "[" + this.logOwner + "]";
           Function.prototype.apply.call(hdlr, console, [moduleStr,messages]);
         }

       }
       else
       {
         Function.prototype.apply.call(hdlr, console, [messages]);
       }
     }
     if(this.logOutput.includes("http"))
     {
       //这里写http方式
     }

   }

}

MyLogger.DEBUG = defineLogLevel(1, 'DEBUG');
MyLogger.INFO = defineLogLevel(2, 'INFO');
MyLogger.LOG = defineLogLevel(3.5, 'LOG');
MyLogger.TIME = defineLogLevel(3, 'TIME');
MyLogger.WARN = defineLogLevel(4, 'WARN');
MyLogger.ERROR = defineLogLevel(8, 'ERROR');
MyLogger.OFF = defineLogLevel(99, 'OFF');
