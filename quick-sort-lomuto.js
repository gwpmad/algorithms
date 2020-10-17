/*
  Quicksort is at its fastest as fast as mergesort. However, it maintains greater efficiency that mergesort with different inputs, so is
  probably preferable.

  Here we use the Lomuto partition scheme, where pivot is last element: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  This is not the fastest of the quicksorts but is one of the easiest to understand.
*/

// Incredibly useful explanation of Lomuto partition function, step by step: https://gisttree.com/news/understanding-lomutos-partitioning-scheme/
const partition = (arr, lo, hi) => {
  /* Sorts so that the elements at lo through i-1 (inclusive) are less than the pivot,
    and the elements at i through j (inclusive) are equal to or greater than the pivot */
  const pivot = arr[hi];
  let i = lo;
  console.log('pivot', pivot)
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      /* Swap element at i with element at j. If i and j are the same, it means every element
      so far has been lower than the pivot element, so we leave the element where it is (swap in place). */
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++
    }
  }
  
  /* 
    i has continually adjusted itself to try to mark the place where the 2nd 'half' of the array begins.
    The value at i itself and all the values after should now be greater than or equal to the pivot.
    So now we swap the value at i with the value at hi (pivot value), to put the pivot value in front of all the values lower than it,
    and behind the value at i (which could be higher than the pivot value).
  */
  [arr[i], arr[hi]] = [arr[hi], arr[i]]
  return i;
};

const quickSort = (arr, lo, hi) => {
  if (lo < hi) {
      const p = partition(arr, lo, hi);
      /*
        We've put the numbers below the pivot before it, and the numbers gte after it. So now we need to organise those two separate sets
        of numbers independently of the pivot itself. The key is that we know the pivot itself is at the right final index in the array.
      */
      quickSort(arr, lo, p - 1);
      quickSort(arr, p + 1, hi);
  }
};

const arr = [4, 3, 31, 1, 2, 25, 10, 11];
quickSort(arr, 0, arr.length - 1);
console.log('sorted array', arr)