// IIFE: "Immediately Invoked Function Expression"

/**
 * use .append() instead for all the console.log().
 * and for the best practice I do think it is good to add a '$' in front of all the JQuery variables
 */

(function($) {
  //this is a DOCUMENT READY (SHORTHAND) PROPER
  $(function() {
    let lastPage = '';
    $('#quote-submission-form').on('submit', postQuote);
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();

      lastPage = document.URL;

      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          const $title = data[0].title.rendered;
          const $content = data[0].content.rendered;
          const $quoteSource = data[0]._qod_quote_source;
          const $quoteSourceUrl = data[0]._qod_quote_source_url;
          $('.entry-content').html($content);
          $('.entry-meta .entry-title').html('&mdash; ' + $title + ', ');
          $('.entry-meta .source').html(
            `<a href='${$quoteSourceUrl}'>${$quoteSource}</a>`
          );
          /**
                   * for the ",":
                   * 
                  $(".entry-content").html($content);
                  $(".entry-meta .entry-title").html("&mdash; " + $title);
                  if ($quoteSource && $quoteSourceUrl) {
                      $(".entry-meta .source").html(`, <a href='${$quoteSourceUrl}'>${$quoteSource}</a>`);
                  } else if ($quoteSource) {
                      $(".entry-meta .source").html(`, ${$quoteSource}`);
                  }
                  else {
                      $(".entry-meta .source").html("");
                  }
                  */

          history.pushState(null, null, data[0].slug);
          //updates the DOM with the request
        })
        .fail(function() {
          /**
           * TODO change the console.log to .append()
           */
          $this.append('Sorry, there was an error. Please try again.');
        });

      $(window).on('popstate', function() {
        window.location.replace(lastPage);
      });
    }); //END OF ON-CLICK

    //START _POST METHOD
    function postQuote(event) {
      event.preventDefault();

      const quoteAuthor = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteSourceUrl = $('#quote-source-url').val();

      //ensure field is not empty - - then sort a way to run .ajax if the fields are all filled in, he gave a sample of putting the ajax entire section below in a function and then calling that function if the forms are successfully submitted.
      //ie, call postAjax() here, and then wrap that (like this: "function postAjax(){" ) below. There's a pic on my phone of this sample.
      /**
       * To filter if the user entered anything in author and content area
       */
      if (quoteAuthor !== '' && quoteContent !== '') {
        postAjax();
      } else {
        $('.field-required').html('');
        $('#quote-submission-form').append(
          '<p class= "field-required">Please fill out all the required areas</p>'
        );
        /**
         * TODO you need to add a .append(), something like:
         * $(".field-required").html(""); //this is to empty the line try without it and click submit twice.
         * $("#quote-submission-form").append('<p class= "field-required">Please fill out all the required areas</p>');
         */
      }

      //forms cannot be left blank or alert pops up
      // const entryForm = document.getElementsByClassName('input-form');
      // entryForm.addEventListener('submit', function(event) {
      //   event.preventDefault();
      //   const entryInput = document.getElementsByClassName('input-form').val();
      //   if (entryInput !== '') {
      //     postAjax();
      //   } else {
      //     alert('Please fill in all boxes, enter "null" if no data.');
      //   }
      // });

      function postAjax() {
        /**
         * event.preventDefault();
         * here you donnt have any event it is not an click event or somthing
         * it is just a normal function that can be used to call the ajax method in your click event above
         * so it says you do not need any event.preventDefault().
         */
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
            //TODO - use the form input .val() for the tite, content, etc, also use an if statement to make sure all fields aren't left empty or give a popup 'must be filled out' kind of thing
            title: quoteAuthor,
            content: quoteContent,
            _qod_quote_source: quoteSource,
            _qod_quote_source_url: quoteSourceUrl,
            status: 'pending'
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-NONCE', api_vars.wpapi_nonce);
          }
        })

          .done(function() {
            $('#quote-submission-form').slideUp(500);
          })
          function showSuccess() {
            document.getElementsByClassName('submit-success-message').style.display =
              'block';
          }
          $('#submit-button').on('click', showSuccess());
          .fail(function() {
            console.log('try harder next time');
          });
      } //END OF postAjax function

      /**
       * this it end of the postQuote function
       */
    }
  
  }); //END OF DOCUMENT READY
})(jQuery);
