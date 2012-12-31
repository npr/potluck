;(function($){
    $(function() {

        $(".select2").select2();
        $(".datepicker").datepicker();

        // Display a nice character limit indicator for the short message field
        var characterLimit = 250; //default value
        if (typeof potluck_submission_msg_char_limit !== 'undefined') { characterLimit =  potluck_submission_msg_char_limit; }
        characteCounterLimiter(characterLimit);

    });

    function characteCounterLimiter(characterLimit) {

        $('#remainingCharacters').html(characterLimit);

        $('#inputMessage').bind('keyup', function(){
            var charactersUsed = $(this).val().length;

            if(charactersUsed > characterLimit){
                charactersUsed = characterLimit;
                $(this).val($(this).val().substr(0, characterLimit));
                $(this).scrollTop($(this)[0].scrollHeight);
            }

            var charactersRemaining = characterLimit - charactersUsed;

            $('#remainingCharacters').html(charactersRemaining);
        });
    }
})(jQuery);