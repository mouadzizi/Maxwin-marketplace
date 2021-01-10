const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase)

exports.sendNotification = functions.firestore.document('chats/{docId}').onWrite(async (event, context) => {
    const data = event.after.data()
    var messages = []
    messages.push({
        "to": data.contact.expoPushNotif,
        "title":"New message From "+data.sender,
        "body": data.lastMessage,
        "android": {
            "sound": true
          },
    })

    await Promise.all(messages)

    await fetch('https://exp.host/--/api/v2/push/send', {
        method:'POST',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            'Accept-encoding': 'gzip, deflate'
        },
        body:JSON.stringify(messages)
        })
})
