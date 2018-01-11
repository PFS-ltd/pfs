app.factory('$pageArray', function($firebaseArray) {
    return function(ref, field) {
      // create a Paginate reference
      var pageRef = new Firebase.util.Paginate(ref, field, {maxCacheSize: 250});
      // generate a synchronized array using the special page ref
      var list = $firebaseArray(pageRef);
      // store the "page" scope on the synchronized array for easy access
      list.page = pageRef.page;
  
      // when the page count loads, update local scope vars
      pageRef.page.onPageCount(function(currentPageCount, couldHaveMore) {
        list.pageCount = currentPageCount;
        list.couldHaveMore = couldHaveMore;
      });
  
      // when the current page is changed, update local scope vars
      pageRef.page.onPageChange(function(currentPageNumber) {
        list.currentPageNumber = currentPageNumber;
      });
  
      // load the first page
      pageRef.page.next();
  
      return list;
    }
  });