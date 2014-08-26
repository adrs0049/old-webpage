(function (window, document, undefined) {

  'use strict';

  /**
   * Twitter follow
   */
  (function (d,s,id) {
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)){
      js=d.createElement(s);
      js.id=id;
      js.src='//platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js,fjs);
    }
  })(document,'script','twitter-wjs');

  /**
   * Facebook like
   */
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_GB/all.js#xfbml=1&appId=252993844735607';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  (function(doc,s) {
    var js, fjs = doc.getElementsByTagName(s)[0];
    var frag = doc.createDocumentFragment();
    var add = function (url, id) {
      if (doc.getElementById(id)) {
        return;
      }
      js = doc.createElement(s);
      js.src = url;
      if (id) {
        js.id = id;
      }
      frag.appendChild(js);
    };
    add('http://connect.facebook.net/en_US/all.js#xfbml=1','facebook-jssdk');
    add('http://platform.twitter.com/widgets.js');
    add('https://apis.google.com/js/plusone.js');
    fjs.parentNode.insertBefore(frag, fjs);
  })(document,'script');

})(this, document);
