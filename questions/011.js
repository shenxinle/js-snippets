var subject = {
  observers: [],
  attach(observer) {
    this.observers.push(observer);
  },
  notify(...data) {
    this.observers.forEach(observer => {
      observer.update(...data)
    })
  }
}
var observer = {
  update(...data) {
    console.log(...data);
  }
}



var publisher = {
  publish(...data) {
    pubsub.publish(...data);
  }
}
var pubsub = {
  subs: [],
  subscribe(sub) {
    this.subs.push(sub);
  },
  publish(...data) {
    this.subs.forEach(sub => {
      sub.update(...data);
    })
  }
}
var subscriber = {
  subscribe() {
    pubsub.subscribe(this);
  },
  update(...data) {
    console.log(...data);
  }
}
