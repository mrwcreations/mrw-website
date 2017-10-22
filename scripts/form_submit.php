<?php

$curl = curl_init();
$ini_array = parse_ini_file("keys.ini");

$name = $_POST["name"];
$meeting_time = $_POST["meeting_time"];
$meeting_description = $_POST["meeting_description"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$address = $_POST["address"];
$apikey = $ini_array["key"];

$postFields = 'name-or-org-name='.$name.'&email='.$email.'&phone='.$phone.'&meeting-datetime='.$meeting_time.'&address='.$address.'&product-description='.$meeting_description;
$postFields = str_replace(' ', '%20', $postFields);
$postFields = str_replace('+', '%2B', $postFields);
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://mrwcreations-472e.restdb.io/rest/meeting-details",
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

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo "Successful";
}