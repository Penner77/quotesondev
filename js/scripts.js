// IIFE: "Immediately Invoked Function Expression"

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

          history.pushState(null, null, data[0].slug);
        })
        .fail(function() {
          alert('Sorry, there was an error. Please try again.');
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

      if (quoteAuthor !== '' && quoteContent !== '') {
        postAjax();
      } else {
        $('.field-required').html('');
        $('#quote-submission-form').append(
          '<p class= "field-required">Please fill out all the required areas</p>'
        );
      }

      function postAjax() {
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
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

            $('.submit-success-message').show('slow');
          })

          .fail(function() {
            alert('Sorry, something went wrong, try again');
          });
      } //END OF postAjax function

      /**
       * END OF POSTQUOTE FUNCTION
       *   */
    }
  }); //END OF DOCUMENT READY
})(jQuery);
