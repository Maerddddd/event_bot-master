// BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=
// U933cc0e91e577c936856fac8f5612798

const functions = require('firebase-functions');
const request = require('request-promise');

const cors = require('cors')({origin: true});

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=`
};
    
exports.LineBot = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let userId, msg ;
        console.log(req.body)
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        try{
            if(req.body.description == 'submit register'){
                userId = req.body.to
                msg = req.body.msg
            }else{
                userId = req.body.events[0].source.userId
                msg =  req.body.events[0].message.text
            }
        
            console.log(userId,msg)
            return request({method: `POST`,uri: `${LINE_MESSAGING_API}/push`,headers: LINE_HEADER,
                body: JSON.stringify({
                    to: userId,
                    messages: [ { type: `text`, text: msg } ]
                })
            })
            .then( ()  =>  res.json({}))
            .catch((error) => res.json({ message : error.message }))
        }catch(err){
            return res.status(200).json()
        }
    

    })

});
