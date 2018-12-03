var CronJob = require('cron').CronJob;
new CronJob('* * * * * *',function(){
    console.log('hahahahahahaha');
}, null, true,'Africa/Lagos');