require('dotenv').config()
const { promisify } = require("util")
let sensor = require("node-dht-sensor");
const request = promisify(require('request'))
const { CronJob } = require('cron');
const { TOKEN, URL } = process.env






new CronJob('* * * * * *', async function () {
    console.log('You will see this message every  5 seconds');

    try {
        console.log('sssss')


        sensor.read(11, 25, async function (err, temperature, humidity) {
            if (!err) {
                console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
                const { body } = await request(`${URL}/plant/data/${TOKEN}`, {
                    method: "POST",
                    json: {
                        temperature,
                        airHumidity: humidity,
                        groundHumidity: humidity
                    }
                });

                console.log(body)

            } else {
                console.log('error')
                console.log(err)
            }

        });

    } catch (e) {
        console.log('error')
        console.log(e)
    }




}, null, true, 'America/Sao_Paulo');


