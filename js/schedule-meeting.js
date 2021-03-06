$(".contact-form").on('change', function(){
	if($('input[name=meeting-option]:checked', '.contact-form').val() === "meeting-phone"){
		$('.phone').show();
		$('.email').show();
		$('.address').hide();
	} else if($('input[name=meeting-option]:checked', '.contact-form').val() === "meeting-person"){
		$('.address').show();
		$('.phone').hide();
		$('.email').show();
	}
});
$('.form_datetime').datetimepicker({
    //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: false,
	minuteStep: 30,
	startView: 2,
	forceParse: 0,
    showMeridian: 0,
    startDate: '+0d',
    daysOfWeekDisabled: [0]
});
var autocomplete = new google.maps.places.Autocomplete($("#input-address")[0], {}	);

google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
});	

function onRecaptcha(){
	grecaptcha.execute();
	$("form").on('submit', onSubmit(event));
}
$("form").on('submit', onSubmit(event));
$(".submit").on('click', onSubmit(event));

function onSubmit(e){
	// e.preventDefault();
	var phone = "+1 (123) 456-7890", email="noemail@provided.com", address="No address provided";
	var meeting_time, meeting_description;
	if($(".meeting-phone").is(":checked")){
		phone = $("#input-phone").val() ? $("#input-phone").val() : phone;
	}
	else if($(".meeting-person").is(":checked")){
		address = $("#input-address").val();
		if(address.length === 0){
			$(".address #error").show();
		}else {
			$(".address #error").hide();
		}
	}
	email = $("#input-email").val();
	if(email.length === 0){
		$(".email #error").show();
		return false;
	}else{
		$(".email #error").hide();
	}
	meeting_time = $("#dtp_input1").val(); 
	name = $("#meeting-name").val();
	meeting_description = $("textarea#meeting-description").val();
	if(validate(phone, meeting_time, email, address, name)){
		$("input[type=submit]").attr("disabled", "disabled");
		$(".submit").html("Submitting...");
		$.post(
			"https://www.amitnandanp.com/scripts/form_submit.php",
			{
				name: name,
				meeting_time: meeting_time,
				meeting_description: meeting_description,	
				email: email,
				phone: phone,
				address: address,
				captcha_response: grecaptcha.getResponse()
			},
			function(data){
				data = JSON.parse(data);
				$("input[type=submit]").removeAttr("disabled");
				$(".submit").html("Submit");
				if(data.message === "Successful"){
					$(".client_name").html(name);
					$(".form-submit-successful").show();
					$("#myModal").modal('show');
					$(".contact-form").find("input textarea").val("");
				}else{
					$("#myModal").modal('show');
					$(".form-submit-failure").html(data.message);
					$(".form-submit-failure").fadeIn(1000);
				}

			}
		);
    }
}
function validate(phone, meeting_time, email, address, name){
	var email_regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
	var phone_regex  = /^(\+)1{1}(\ \()[0-9]{3}(\) )[0-9]{3}(-)[0-9]{4}?$/;
	var validator_status = true;
	if(phone.length > 0){
		if(!phone_regex.test(phone)){
    		$(".phone #error").show();
    		$(".phone input").addClass("is-invalid");
    		validator_status = false;
    	}
	} else{
		$(".phone #error").hide();
	}
	if(meeting_time.length === 0){
		$(".datetime #error").show();
		validator_status = false;
	} else{
		$(".datetime #error").hide();
	}
	if(email.length > 0){
		if(!email_regex.test(email)){
			$(".email #error").show();
			validator_status = false;
		} else{
			$(".email #error").hide();
		}
	} else{
		$(".email #error").hide();
	}
	if(name.length === 0){
		$(".name #error").show();
		validator_status = false;
	} else{
		$(".name #error").hide();
	}
	if(!grecaptcha.getResponse()){
		$(".captcha #error").show();
	} else{
		$(".captcha #error").hide();
	}
	return validator_status;
}