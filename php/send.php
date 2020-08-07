<?php
/**
 * Created by vegas s.
 */

sleep(2);

$error = false;

if ($error) {
	$sapi_type = php_sapi_name();
	if (substr($sapi_type, 0, 3) == 'cgi') {
		header("Status: 404 Not Found");
	} else {
		header("HTTP/1.1 404 Not Found");
	}

	$result = [
		'errors' => $error,
		'msg' => 'Failed to send email'
	];
} else {
	$result = [
		'errors' => $error,
		'msg' => 'Your mail has bin sent'
	];
}

echo json_encode($result);