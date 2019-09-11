function create(Con, ...args) {
  let obj = Object.create(Con.prototype);
  // or
  // let obj = new Object();
  // Object.setPrototypeOf(obj, Con.prototype);

  let res = Con.apply(obj, args);

  return res instanceof Object ? res : obj;
}



function Hehe(a, b) {
  this.a = a;
  this.b = b;
}

Hehe.prototype.toto = function () {
  return `${this.a} - ${this.b}`;
}

var he1 = create(Hehe, 1, 2);
console.log(he1.toto());
console.log(Object.getPrototypeOf(he1));

var he2 = new Hehe(1, 2);
console.log(he2.toto());
console.log(Object.getPrototypeOf(he2));
