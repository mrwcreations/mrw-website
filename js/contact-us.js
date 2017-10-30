$(".submit").on('click', function(e){
	e.preventDefault();
	var phone = "+1 (123) 456-7890", email="noemail@provided.com", address="No address provided";
	var meeting_time = "adfsadf", meeting_description;
		phone = $("#input-phone").val();
		email = $("#input-email").val();
		if(email.length === 0){
			$(".email #error").show();
			return false;
		}else{
			$(".email #error").hide();
		}
	name = $("#meeting-name").val();
	meeting_description = $("textarea#meeting-description").val();
	if(validate(phone, meeting_time, email, address, name)){
		$.post(
			"https://www.amitnandanp.com/scripts/contact_us.php",
			{
				name: name,
				meeting_description: meeting_description,	
				email: email,
				phone: phone
			},
			function(data){
				data = JSON.parse(data);
				if(data.message === "Successful"){
					$(".client_name").html(name);
					$(".form-submit-successful").show();
					$("#myModal").modal('show');
					$(".contact-form").find("input textarea").val("");
				}else{
					$("#myModal").modal('show');
					$(".form-submit-failure").fadeIn(1000);
				}

			}
		);
    }
});
function validate(phone, meeting_time, email, address, name){
	var email_regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
	var phone_regex  = /^(\+)1{1}(\ \()[0-9]{3}(\) )[0-9]{3}(-)[0-9]{4}?$/;
	var validator_status = true;
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