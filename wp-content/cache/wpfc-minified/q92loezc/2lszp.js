// source --> https://www.slmcel.org.uk/wp-content/plugins/give-fee-recovery/assets/js/give-fee-recovery-public.min.js?ver=1.6.1 
var give_global_vars,Give_Fee_Recovery;jQuery.noConflict(),function(e){Give_Fee_Recovery={init:function(){e(".give-form-wrap").each(function(){var a=e(this).find(".give-form"),i=a.find(".give-fee-disable").val(),n=!!parseInt(i),t=a.find("input.give-gateway:radio:checked").val(),o=a.find('input[name="give-amount"]').val();e(this).find(".give-fee-message").hide(),n&&e(this).find(".give-fee-message").show(),n&&Give_Fee_Recovery.give_fee_update(a,!0,o,t)})},give_fee_update:function(e,a,i,n){var t=e.find(".give-final-total-amount"),o=e.find(".give-fee-message-label-text"),f=e.find(".fee-break-down-message"),v=f.data("breakdowntext"),d=e.find(".give_fee_mode_checkbox").val(),_=Give.form.fn.getInfo("decimal_separator",e),r=give_fee_unformat_amount(i,_),g=JSON.parse(e.find('input[name="give-fee-recovery-settings"]').val());if(e.has(".give_fee_mode_checkbox").length>=1&&0!==d&&"undefined"!==d&&(a=e.find(".give_fee_mode_checkbox").is(":checked")),0===e.find(".give-fee-message").length)return!1;t.show(),f.hide();var u=g.fee_recovery,m=g.fee_data.all_gateways,s=0,l=0,c=!0,p=!0,h=!1,y=0;if(u){m?(s=g.fee_data.all_gateways.base_amount,l=g.fee_data.all_gateways.percentage,c=g.fee_data.all_gateways.is_break_down,p=g.fee_data.all_gateways.give_fee_status,h=g.fee_data.all_gateways.give_fee_disable):jQuery.each(g.fee_data,function(e,a){n===e&&(s=a.base_amount,l=a.percentage,c=a.is_break_down,p=a.give_fee_status,h=a.give_fee_disable)}),y=give_fee_calculate(l,give_fee_unformat_amount(s,_),give_fee_unformat_amount(i,_),h),a&&(r+=y);var b=v.replace("{amount}",give_fee_format_amount(give_fee_unformat_amount(i,_),e)),w=b.replace("{fee_amount}",give_fee_format_amount(y,e));h?(e.find(".give-fee-recovery-donors-choice").hide(),e.find(".fee-coverage-required").hide()):(e.parent().hasClass("mfp-content")||e.find(".give-fee-recovery-donors-choice").show(),e.find(".fee-coverage-required").show()),p?(e.find('input[name="give-fee-status"]').remove(),e.prepend('<input type="hidden" name="give-fee-status" value="enabled"/>')):(e.find('input[name="give-fee-status"]').remove(),e.prepend('<input type="hidden" name="give-fee-status" value="disabled"/>')),a&&c&&"undefined"!=typeof v&&(f.show(),e.find('input[name="give-payment-mode"]').remove(),e.prepend('<input type="hidden" name="give-payment-mode" value="'+n+'"/>'),f.text(w));var k=e.find(".give-fee-message-label").data("feemessage"),x=k.replace("{fee_amount}",give_fee_format_amount(y,e));o.text(x);var G;G="undefined"!=typeof give_global_vars?give_global_vars.number_decimals:give_vars.currency_decimals,1>=parseInt(G)&&(G=2),setTimeout(function(){t.text(give_fee_format_amount(r,e)).attr("data-total",Give.fn.formatCurrency(r,{precision:G},e))},0),e.find('input[name="give-fee-mode-enable"]').remove(),e.prepend('<input type="hidden" name="give-fee-mode-enable" value="'+a+'"/>'),e.find('input[name="give-fee-amount"]').remove(),e.prepend('<input type="hidden" name="give-fee-amount" value="'+give_fee_unformat_amount(give_fee_format_amount(y,e),_)+'"/>')}else e.find('input[name="give-fee-status"]').remove(),e.prepend('<input type="hidden" name="give-fee-status" value="disabled"/>')}},e(function(){var a=e("body");a.on("change",".give_fee_mode_checkbox",function(){var a=e(this).closest("form.give-form"),i=e(this).is(":checked"),n=a.find("input.give-gateway:radio:checked").val(),t=a.find('input[name="give-amount"]').val();Give_Fee_Recovery.give_fee_update(a,i,t,n)}).change(),a.on("give_donation_value_updated blur",".give-donation-amount .give-text-input",function(a,i,n){i||(i=e(this).closest("form.give-form"));var t=i.find("input.give-gateway:radio:checked").val(),o="undefined"==typeof n?i.find('input[name="give-amount"]').val():n;Give_Fee_Recovery.give_fee_update(i,!0,o,t)}),e(document).on("give_gateway_loaded",function(a,i,n){var t=e(a.currentTarget.activeElement).closest("form.give-form");0===t.length&&(t=e("#"+n));var o=t.find('li.give-gateway-option-selected input[name="payment-mode"]').val(),f=t.find('input[name="give-amount"]').val();Give_Fee_Recovery.give_fee_update(t,!0,f,o)}),Give_Fee_Recovery.init()})}(jQuery);
// source --> https://www.slmcel.org.uk/wp-content/plugins/gravityforms.disabled/js/jquery.textareaCounter.plugin.js?ver=1.9.13 
/*
 * jQuery Textarea Characters Counter Plugin v 2.0
 * Examples and documentation at: http://roy-jin.appspot.com/jsp/textareaCounter.jsp
 * Copyright (c) 2010 Roy Jin
 * Version: 2.0 (11-JUN-2010)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.4.2 or later
 */
(function($){
	$.fn.textareaCount = function(options, fn) {
        var defaults = {
			maxCharacterSize: -1,
			originalStyle: 'originalTextareaInfo',
			warningStyle: 'warningTextareaInfo',
			warningNumber: 20,
			displayFormat: '#input characters | #words words'
		};

		var options = $.extend(defaults, options);

		var container = $(this);

		$("<div class='charleft'>&nbsp;</div>").insertAfter(container);


		//create charleft css
		var charLeftCss = {
			'width' : container.width()
		};

		var charLeftInfo = getNextCharLeftInformation(container);
		charLeftInfo.addClass(options.originalStyle);
		//charLeftInfo.css(charLeftCss);


		var numInput = 0;
		var maxCharacters = options.maxCharacterSize;
		var numLeft = 0;
		var numWords = 0;

		container.bind('keyup', function(event){limitTextAreaByCharacterCount();})
				 .bind('mouseover', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);})
				 .bind('paste', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);});

        limitTextAreaByCharacterCount();

		function limitTextAreaByCharacterCount(){
			charLeftInfo.html(countByCharacters());

			//function call back
			if(typeof fn != 'undefined'){
				fn.call(this, getInfo());
			}
			return true;
		}

		function countByCharacters(){
			var content = container.val();
			var contentLength = content.length;
			//Start Cut
			if(options.maxCharacterSize > 0){
				//If copied content is already more than maxCharacterSize, chop it to maxCharacterSize.
				if(contentLength >= options.maxCharacterSize) {
					content = content.substring(0, options.maxCharacterSize);
				}

				var newlineCount = getNewlineCount(content);

				// newlineCount new line character. For windows, it occupies 2 characters
				var systemmaxCharacterSize = options.maxCharacterSize - newlineCount;
				if (!isWin()){
					 systemmaxCharacterSize = options.maxCharacterSize
				}
				if(contentLength > systemmaxCharacterSize){
					//avoid scroll bar moving
					var originalScrollTopPosition = this.scrollTop;
					container.val(content.substring(0, systemmaxCharacterSize));
					this.scrollTop = originalScrollTopPosition;
				}
				charLeftInfo.removeClass(options.warningStyle);
				if(systemmaxCharacterSize - contentLength <= options.warningNumber){
					charLeftInfo.addClass(options.warningStyle);
				}

				numInput = container.val().length + newlineCount;
				if(!isWin()){
					numInput = container.val().length;
				}

				numWords = countWord(getCleanedWordString(container.val()));

				numLeft = maxCharacters - numInput;
			} else {
				//normal count, no cut
				var newlineCount = getNewlineCount(content);
				numInput = container.val().length + newlineCount;
				if(!isWin()){
					numInput = container.val().length;
				}
				numWords = countWord(getCleanedWordString(container.val()));
			}

			return formatDisplayInfo();
		}

		function formatDisplayInfo(){
			var format = options.displayFormat;
			format = format.replace('#input', numInput);
			format = format.replace('#words', numWords);
			//When maxCharacters <= 0, #max, #left cannot be substituted.
			if(maxCharacters > 0){
				format = format.replace('#max', maxCharacters);
				format = format.replace('#left', numLeft);
			}
			return format;
		}

		function getInfo(){
			var info = {
				input: numInput,
				max: maxCharacters,
				left: numLeft,
				words: numWords
			};
			return info;
		}

		function getNextCharLeftInformation(container){
				return container.next('.charleft');
		}

		function isWin(){
			var strOS = navigator.appVersion;
			if (strOS.toLowerCase().indexOf('win') != -1){
				return true;
			}
			return false;
		}

		function getNewlineCount(content){
			var newlineCount = 0;
			for(var i=0; i<content.length;i++){
				if(content.charAt(i) == '\n'){
					newlineCount++;
				}
			}
			return newlineCount;
		}

		function getCleanedWordString(content){
			var fullStr = content + " ";
			var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
			var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
			var non_alphanumerics_rExp = rExp = /[^A-Za-z0-9]+/gi;
			var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
			var splitString = cleanedStr.split(" ");
			return splitString;
		}

		function countWord(cleanedWordString){
			var word_count = cleanedWordString.length-1;
			return word_count;
		}
	};
})(jQuery);