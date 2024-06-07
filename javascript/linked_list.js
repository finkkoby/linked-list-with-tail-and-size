class LinkedList {
  constructor(head = null, tail = null, size = 0) {
    this.head = this.checkNode(head);
    this.tail = tail;
    this.size = size;
    this.setTail();
  }

  setTail(boo = true) {
    if (this.head) {
      if (this.head.next) {
        let initialSize = 0
        this.iterate((node, count) => {
          if (!node.next) {
            initialSize = count + 1
          }
          return false
        })
        if (boo) {
          this.size = initialSize
        }
      } else {
        this.tail = this.head
        if (boo) {
          this.size = 1
        }
      }
    }
  }

  checkNode(node) {
    if (node) {
      if (node instanceof Node) {
        return node
      }
    } else {
      return null
    }
  }

  iterate(callback) {
    let count = 0;
    let temp = this.head;

    while (temp !== null) {
      const result = callback(temp, count);

      if (result === true) {
        return temp;
      }

      ++count;
      if (!temp.next) {
        this.tail = temp
      }
      temp = temp.next;
    }

    return this.head;
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate(node => console.log(node.value));
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let result = null;

    this.iterate(node => {
      if (node.value === target) {
        result = node;

        return true;
      }
    });

    return result;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head;
    this.head = node;
    this.setTail(false)
    this.size += 1;
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node
      return;
    }

    this.iterate(currNode => {
      if (currNode.next === null) {
        currNode.next = node;
        return true;
      }
    });
    this.tail = node
    this.size += 1
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    const oldHead = this.head;

    if (this.head !== null) {
      this.head = this.head.next;
    }
    if (!this.head) {
      this.tail = null
    }

    this.subtract()
    return oldHead;
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if (this.head === null || this.head.next === null) {
      return this.removeFirst();
    }

    let oldTail = null;

    this.iterate(node => {
      if (node.next.next === null) {
        oldTail = node.next;
        node.next = null;
        return true;
      }
    });
    this.setTail(false)
    this.subtract()
    return oldTail;
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
      return node;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        node.next = currNode.next.next;
        currNode.next = node;
        this.setTail(false)
        return true;
      }
    });
    return node;
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {

    if (idx === 0) {
      this.addFirst(node);
      return;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        const oldNext = currNode.next;
        currNode.next = node;
        node.next = oldNext;
        this.size += 1
        return true;
      }
    });

    if (idx === (this.size - 1)) {
      this.tail = node
    }
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst();
    }

    let oldNode = null;

    this.iterate((node, count) => {
      if (count === idx - 1) {
        oldNode = node.next;
        node.next = node.next.next;
        this.subtract()
        return true;
      }
    });
    if (idx === this.size) {
      this.setTail(false)
    }
    return oldNode;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  subtract() {
    if (this.size > 0) {
      this.size -= 1;
    }
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

if (require.main === module) {
  let head = new Node('one', new Node('two', new Node('three', new Node('four'))));
  let list = new LinkedList(head);
  let emptyList = new LinkedList();
  let oneItemList = new LinkedList(new Node('just one'));

}

module.exports = {
  Node, LinkedList
};
