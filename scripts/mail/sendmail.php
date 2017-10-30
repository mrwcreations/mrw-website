<?php
require 'PHPMailerAutoload.php';
// header("Access-Control-Allow-Origin: *");

function sendEmail($toAddress, $fromAddress, $content, $subject, $user, $pass, $output){
	try{
		$mail = new PHPMailer(true); // create a new object
		$mail->IsSMTP(); // enable SMTP
		$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
		$mail->do_debug = 0;
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
		$mail->Host = "smtp.zoho.com";
		$mail->Port = 465; // or 587    
		$mail->IsHTML(true);
		$mail->Username = "$user";
		$mail->Password = "$pass";
		$mail->SetFrom($fromAddress, 'MRW Creations');
		$mail->AddReplyTo('info@mrwcreations.com', 'MRW Creations');
		$mail->AddCC('info@mrwcreations.com', 'MRW Creations');
		$mail->Subject = $subject;
		$mail->Body = $content;
		$mail->AddAddress($toAddress);

		if(!$mail->Send() && $output) {
			return '{"status": false, "message": "'.$output.'"}';
		} else if($output) {
			return '{"status": true, "message": "Successful"}';
		}	
	}
	catch(phpmailerException $e){
		echo $e->errorMessage();
	}
	catch(Exception $e){
		echo $e->getMessage();
	}
}
?>
