/*
  A priority queue is a queue which uses a user-defined function to decide on the priority of its members, i.e. which ones will be
  'popped' from the queue first.

  They often use a binary heap, often a min heap where each node has two children, both lower than it so everything in each node's
  subtree is lower than itself.

  Below is a JavaScript implementation, mostly for illustrative purposes. It's from https://stackoverflow.com/a/42919752/6453088
  It uses an array-based binary heap (where the root is at index 0, and the children of a node at index i are at indices 2i + 1
  and 2i + 2, respectively).

  This implementation has a comparator that defaults to simple > or < checks. However quite often in a priority queue you would
  store objects with a value and a priority e.g. { name: 'John', priority 5 }

  A big use of the priority queue is in AI, in the A* search algorithm, which finds the shortest path between two vertices of a
  weighted graph.
*/

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1; // parent = binary heap node with two children. Returns parent of a node e.g. parent(3) and parent(4) both return 1 as they are the children of 1
const left = i => (i << 1) + 1; // returns the left hand child of a parent e.g. left(1) returns 3
const right = i => (i + 1) << 1; // returns the right hand child of a parent e.g. right(1) returns 4

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
