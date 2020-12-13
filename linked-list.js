/*
  Unlike an array, linked lists elements are not ordered by their physical placement in memory. Elements
  aren't stored in a particular memory location or index. Instead each element contains a pointer or link to
  the next.
*/

/*
  From Wikipedia:
  The principal benefit of a linked list over a conventional array is that the list elements can be easily
  inserted or removed without reallocation or reorganization of the entire structure because the data items
  need not be stored contiguously in memory or on disk, while restructuring an array at run-time is a much
  more expensive operation. Linked lists allow insertion and removal of nodes at any point in the list, and
  allow doing so with a constant number of operations by keeping the link previous to the link being added or
  removed in memory during list traversal.

  On the other hand, since simple linked lists by themselves do not allow random access to the data or any
  form of efficient indexing, many basic operations—such as obtaining the last node of the list, finding a
  node that contains a given datum, or locating the place where a new node should be inserted—may require iterating
  through most or all of the list elements. 

  Other disadvantages:
  - They use more memory than arrays because of the storage used by their pointers (i.e. the data pointing to next element).
  - Nodes in a linked list must be read in order from the beginning as linked lists are inherently sequential access.
  - Nodes are stored noncontiguously, greatly increasing the time periods required to access individual elements within the list, especially with a CPU cache.
  - Difficulties arise in linked lists when it comes to reverse traversing. For instance, singly-linked lists are cumbersome to navigate backward
  and while doubly linked lists are somewhat easier to read, memory is consumed in allocating space for a back-pointer.
*/

/*
  More clarity on deleting/inserting being a 'constant' operation:
  Insertion or deletion of an element at a specific point of a list, assuming that we have indexed a pointer to the node
  (before the one to be removed, or before the insertion point) already, is a constant-time operation (O(1), the fastest time, otherwise without
  this reference it is O(n)).
  Whereas insertion in a dynamic array at random locations will require moving half of the elements on average (so on average it is O(n/2)), and all the
  elements in the worst case.
*/

// Simple Javascript implementation: https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript/
// This implementation is more in depth and very useful for understanding the thinking behind linked lists https://dev.to/emmabostian/creating-linked-lists-with-javascript-391e

// Below is a mixture of the two implementations linked above plus my own additions.
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  clear() {
    this.head = null;
  }

  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  getFirst() {
    return this.head;
  }

  get(index) {
    if (index < 0 || index >= this.size()) {
      return null;
    }
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  push(data) {
    const newNode = new ListNode(data);
    const lastNode = this.getLast();
    if (lastNode) {
      lastNode.next = newNode;
    } else {
      this.head = newNode;
    }
  }

  insert(data, index) {
    if (index < 0 || index > this.size()) {
      throw new Error(
        "Cannot insert at an index outside the linked list bounds"
      );
    }
    const newNode = new ListNode(data);
    const currentNodeAtIndex = this.get(index);
    newNode.next = currentNodeAtIndex;

    const previousNode = this.get(index - 1);
    if (previousNode) {
      previousNode.next = newNode;
    } else {
      this.head = newNode;
    }
  }

  delete(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error(
        "Cannot delete at an index outside the linked list bounds"
      );
    }
    const currentNodeAtIndex = this.get(index);
    const previousNode = this.get(index - 1);
    if (previousNode) {
      previousNode.next = currentNodeAtIndex.next;
    } else {
      this.head = this.head.next;
    }
  }
}
