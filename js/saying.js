$(function(){
  var setElm = $('#saying'),
  delaySpeed = 50,
  fadeSpeed = 0;
  
  setText = setElm.html();
  
  setElm.css({visibility:'visible'}).children().addBack().contents().each(function(){
                                                                          var elmThis = $(this);
                                                                          if (this.nodeType == 3) {
                                                                          var $this = $(this);
                                                                          $this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplitLoad">$&</span>'));
                                                                          }
                                                                          });
  $(window).load(function(){
                 splitLength = $('.textSplitLoad').length;
                 setElm.find('.textSplitLoad').each(function(i){
                                                    splitThis = $(this);
                                                    splitTxt = splitThis.text();
                                                    splitThis.delay(i*(delaySpeed)).css({display:'inline-block',opacity:'0'}).animate({opacity:'1'},fadeSpeed);
                                                    });
                 setTimeout(function(){
                            setElm.html(setText);
                            },splitLength*delaySpeed+fadeSpeed);
                 });
  });