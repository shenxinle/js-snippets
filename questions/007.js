// 深度优先
function traverse1(node) {
  let nodes = [];
  nodes.push(node);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      nodes = nodes.concat(traverse1(node.children[i]));
    }
  }
  return nodes;
}

// 深度优先2
function traverse2(node) {
  let stack = [];
  let nodes = [];
  stack.push(node);

  while(stack.length) {
    let node = stack.shift();
    nodes.push(node);

    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.unshift(node.children[i]);
      }
    }
  }

  return nodes;
}

// 广度优先
function traverse3 (node) {
  let nodes = [];
  let stack = [];
  stack.push(node);

  while(stack.length) {
    let node = stack.shift();
    nodes.push(node);

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        stack.push(node.children[i]);
      }
    }
  }

  return nodes;
}


var node = {
  value: 'a',
  children: [
    {
      value: 'a-b',
      children: [
        {
          value: 'a-b-c'
        }, {
          value: 'a-b-d',
          children: [
            {
              value: 'a-b-d-e'
            }
          ]
        }
      ]
    }, {
      value: 'a-c',
      children: [
        {
          value: 'a-c-d',
          children: [
            {
              value: 'a-c-d-e'
            }
          ]
        }
      ]
    }, {
      value: 'a-d',
      children: [
        {
          value: 'a-d-e',
          children: [
            {
              value: 'a-d-e-f'
            }
          ]
        }, {
          value: 'a-d-f'
        }
      ]
    }
  ]
}

const toValueString = (nodes) => {
  return nodes.map(node => node.value).join(' => ');
}
console.log(toValueString(traverse1(node)));
console.log(toValueString(traverse2(node)));
console.log(toValueString(traverse3(node)));
