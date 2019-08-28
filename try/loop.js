// 结果：
// process 1
// process 3
// setTimeout 1
// setTimeout 2
// setTimeout 3
// process 2
// process 4
// setTimeout 4
// setTimeout 5
const nodeLoop = () => {
  process.nextTick(() => {
    console.log('process 1');
  });

  setTimeout(() => {
    console.log('setTimeout 1');
    process.nextTick(() => {
      console.log('process 2');
      setTimeout(() => {
        console.log('setTimeout 4');
      });
    });
  });

  setTimeout(() => {
    console.log('setTimeout 2');
    process.nextTick(() => {
      console.log('process 4');
      setTimeout(() => {
        console.log('setTimeout 5');
      });
    });
  });

  setTimeout(() => {
    console.log('setTimeout 3');
  });

  process.nextTick(() => {
    console.log('process 3');
  });
};

// node 结果同 nodeLoop
// 浏览器结果：
// process 1
// process 3
// setTimeout 1
// process 2
// setTimeout 2
// process 4
// setTimeout 3
// setTimeout 4
// setTimeout 5
const browserLoop = () => {
  Promise.resolve().then(() => {
    console.log('process 1');
  });

  setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve().then(() => {
      console.log('process 2');
      setTimeout(() => {
        console.log('setTimeout 4');
      });
    });
  });

  setTimeout(() => {
    console.log('setTimeout 2');
    Promise.resolve().then(() => {
      console.log('process 4');
      setTimeout(() => {
        console.log('setTimeout 5');
      });
    });
  });

  setTimeout(() => {
    console.log('setTimeout 3');
  });

  Promise.resolve().then(() => {
    console.log('process 3');
  });
};

// nodeLoop();
browserLoop();
