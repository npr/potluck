;(function($){
    $(function() {

        /**
        $("#inputTags").select2({
            tags:["npr", "world", "news"],
            tokenSeparators: [",", ";", " "]});
        */

        $(".select2").select2();
        $(".datepicker").datepicker();

        // Display a nice character limit indicator for the caption field
        var characterLimit = 250; //default value
        if (typeof potluck_submission_msg_char_limit !== 'undefined') { characterLimit =  potluck_submission_msg_char_limit; }
        characteCounterLimiter(characterLimit);

    });

    /**
     * Uses code by Ed Rackham:
     * http://edrackham.com/javascript/how-to-create-a-textarea-character-counter-limiter-using-jquery/
     *
     * @param characterLimit
     */
    function characteCounterLimiter(characterLimit) {

        $('#remainingCharacters0').html(characterLimit);

        $('#inputCaption0').bind('keyup', function(){
            var charactersUsed = $(this).val().length;

            if(charactersUsed > characterLimit){
                charactersUsed = characterLimit;
                $(this).val($(this).val().substr(0, characterLimit));
                $(this).scrollTop($(this)[0].scrollHeight);
            }

            var charactersRemaining = characterLimit - charactersUsed;

            $('#remainingCharacters0').html(charactersRemaining);
        });
    }
})(jQuery);