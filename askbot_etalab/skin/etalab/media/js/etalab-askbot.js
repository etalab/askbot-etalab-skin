/**
 * Some specific askbot behavior override.
 */
(function($) {

    "use strict";

    $(function() {

        // Dropdown answer forms transformed into link need to be submited
        $('a.postable').click(function() {
            var $a = $(this);

            $('<form/>', {method: 'post', action: $a.attr('href')})
                .append($('<input/>', {name: $a.data('field-name'), value: $a.data('field-value')}))
                .append($('<input/>', {name: 'csrfmiddlewaretoken', value: $.cookie('_csrf')}))
                .submit();

            return false;
        });

        // Form help messages as popover on info sign
        $('.form-help').popover({
            placement: 'top',
            trigger: 'hover',
            html: true
        });

        $('select.form-control').selectpicker();

    });

}(window.jQuery));
