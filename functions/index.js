// BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=
// U933cc0e91e577c936856fac8f5612798


// const functions = require('firebase-functions');
// const request = require('request-promise');

// const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
// const LINE_HEADER = {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=`
// };

// exports.LineBot = functions.https.onRequest((req, res) => {
//   if (req.body.events[0].message.type !== 'text') {
//     return;
//   }
//   reply(req.body);
//   return res.status(200).send(req.method)
// });

// const reply = (bodyResponse) => {
//   return request({
//     method: `POST`,
//     uri: `${LINE_MESSAGING_API}/reply`,
//     headers: LINE_HEADER,
//     body: JSON.stringify({
//       replyToken: bodyResponse.events[0].replyToken,
//       messages: [
//         {
//           type: `text`,
//           text: bodyResponse.events[0].message.text
//         }
// 	  ]
//     })
//   });
// };

// const functions = require('firebase-functions');
// const request = require('request-promise');

// const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
// const LINE_HEADER = {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=`
// };

// exports.LineBot = functions.https.onRequest((req, res) => {
//   return request({
//     method: `GET`,
//     uri: `https://api.openweathermap.org/data/2.5/weather?units=metric&type=accurate&zip=10330,th&appid=98f0b338100fb455c54433f0bc54057c`,
//     json: true
//   }).then((response) => {
//     const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
//     return push(res, message);
//   }).catch((error) => {
//     return res.status(500).send(error);
//   });
// });

// const push = (res, msg) => {
//   return request({
//     method: `POST`,
//     uri: `${LINE_MESSAGING_API}/push`,
//     headers: LINE_HEADER,
//     body: JSON.stringify({
//       to: `U933cc0e91e577c936856fac8f5612798`,
//       messages: [
//         {
//           type: `text`,
//           text: msg
//         }
//       ]
//     })
//   }).then(() => {
//     return res.status(200).send(`Done`);
//   }).catch((error) => {
//     return Promise.reject(error);
//   });
// }
