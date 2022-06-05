const select_event = {
  "U933cc0e91e577c936856fac8f5612798": {
    "-N3UYQFJLApFw1v87ZAe": {
      "date_stamp": "2022-06-04T17:36:56.006Z",
      "time_stamp": "2022-06-04T17:36:56.006Z"
    },
    "-N3X9nQQJZoHVtAYrT9Z": {
      "date_stamp": "2022-06-04T17:36:16.703Z",
      "time_stamp": "2022-06-04T17:36:16.703Z"
    }
  }
}

const events = {
  "-N3UYQFJLApFw1v87ZAe": {
    "certificate": "Have certificate",
    "date": "2022-03-15",
    "description": "yyyyyyyyyyyyyyyyyyyyy",
    "end_time_select": "14:00",
    "food_type": "อาหารกลางวันและอาหารว่าง",
    "id": "-N3UYQFJLApFw1v87ZAe",
    "image": "https://cdn.pixabay.com/photo/2016/03/27/20/54/wedding-reception-1284245_960_720.jpg",
    "member_slot": "40",
    "organizer": "yyyyyyyyyyyyyyyyyyyyyy",
    "start_time_select": "9:00",
    "title": "yyyyyyyyyyyyyyyyyyy"
  },
  "-N3UYtkX67Jg4dNSIn8W": {
    "certificate": "No certificate",
    "date": "2022-04-05",
    "description": "aaaaaaaaaaaaaaaa",
    "end_time_select": "14:00",
    "food_type": "อาหารกลางวันและอาหารว่าง",
    "id": "-N3UYtkX67Jg4dNSIn8W",
    "image": "https://p-u.popcdn.net/blogs/covers/000/000/118/cover/EVP_Cover094.png?1544690270",
    "member_slot": "50",
    "organizer": "aaaaaaaaaaaaaaaaaaaaaaa",
    "start_time_select": "11:00",
    "title": "aaaaaaaaaaaaaaaaaaa"
  },
  "-N3VHh7x0VNpFF8c_An-": {
    "certificate": "Have certificate",
    "date": "2022-05-02",
    "description": "wwwwwwww",
    "end_time_select": "12:00",
    "food_type": "อาหารว่าง",
    "image": "",
    "member_slot": "60",
    "organizer": "wwwwwwww",
    "start_time_select": "8:00",
    "title": "wwwwwwwww"
  },
  "-N3X9nQQJZoHVtAYrT9Z": {
    "certificate": "Have certificate",
    "date": "2022-06-01",
    "description": "bbbbbbbbbbbbb",
    "end_time_select": "13:00",
    "food_type": "อาหารกลางวันและอาหารว่าง",
    "image": "",
    "member_slot": "40",
    "organizer": "bbbbbbbbbbbbbbb",
    "start_time_select": "10:00",
    "title": "bbbbbbbbbbbbb"
  },
  "-N3euquNFKBx8ZT1KB_Q": {
    "certificate": "No certificate",
    "date": "2022-06-02",
    "description": "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",
    "end_time_select": "14:00",
    "food_type": "อาหารกลางวัน",
    "image": "",
    "member_slot": "40",
    "organizer": "uuuuuuuuuuuu",
    "start_time_select": "8:00",
    "title": "uuuuuuuuuuuu"
  },
  "-N3ezU9MnOvjzkIUh3Ib": {
    "certificate": "No certificate",
    "date": "2022-04-10",
    "description": "cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    "end_time_select": "14:00",
    "food_type": "",
    "image": "",
    "member_slot": "60",
    "organizer": "ccccc",
    "start_time_select": "10:00",
    "title": "ccccccc"
  }
}

const entries_select_event = Object.entries(select_event)

const entries_results =  Object.entries(events).map(([id , value]) => {
  return [id,{
    ...value,
    members : entries_select_event
        .filter(([userId, info]) => Object.entries(info).some(([seID,seValue]) => seID == id))
        .map(([userId, info]) => ({userId : userId, ...info}))
    }]
})

const results = Object.fromEntries(entries_results)

console.log(results)    





// methods: {
//   async initialize () {
//     let events = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
//     let select_event = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/select_events.json`)
//     const entries_select_event = Object.entries(select_event.data)

//     const entries_results =  Object.entries(events.data).map(([id , value]) => {
//       return [id,{
//         ...value,
//         members : entries_select_event
//             .filter(([userId, info]) => Object.entries(info).some(([seID,seValue]) => seID == id))
//             .map(([userId, info]) => ({userId : userId, ...info}))
//         }]
//     })
//     this.event_data = entries_results.map(([key,value]) => ({id: key , ...value }))
//     console.log(this.event_data);

//     // let member = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
//     // this.event_data =  Object.entries(res.data).map(([key,value]) => ({id: key , ...value }))
//   },
