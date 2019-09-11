typeof Object.prototype === 'object';
typeof Function.prototype === 'function';
Object.prototype.__proto__ === null;
Function.prototype.__proto__ === Object.prototype;
Object.__proto__ === Function.prototype;
Function.__proto__ === Function.prototype;
