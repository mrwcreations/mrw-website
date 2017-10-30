<?php
require('mail/sendmail.php');
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("America/Chicago");
$curl = curl_init();
$ini_array = parse_ini_file("keys.ini");

$name = $_POST["name"];
$meeting_description = $_POST["meeting_description"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$apikey = $ini_array["key"];

$postFields = 'name='.$name.'&email='.$email.'&phone='.$phone.'&description='.$meeting_description;
$postFields = str_replace(' ', '%20', $postFields);
$postFields = str_replace('+', '%2B', $postFields);
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://mrwcreations-472e.restdb.io/rest/contact-form",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $postFields,
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/x-www-form-urlencoded",
    "postman-token: 00ef02ec-e7ef-628c-77c4-755dcf2d4f0b",
    "x-apikey: ".$apikey
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
error_log($response);
error_log($_SERVER['HTTP_HOST']);

curl_close($curl);

$ini_array = parse_ini_file('app.email.configuration.ini');
$username=$ini_array['username'];
$password=$ini_array['password'];


$email_body = file_get_contents("../mailer/contact/content.html");
$subject = "Thank you for contacting us, ".$name;
$email_body = str_replace("{NAME}", $name, $email_body);
$email_body = str_replace("{LINK}", "http://".$_SERVER['HTTP_HOST']."/mailer/contact", $email_body);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo sendEmail($email, $username, $email_body, $subject, $username, $password, true);
}