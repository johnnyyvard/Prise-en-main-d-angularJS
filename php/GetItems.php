<?php

try {
	$items = file_get_contents('../items.json');
	if ($items) {
		echo $items;
		http_response_code(200);
	} else {
		echo 'Unable to find items.';
		http_response_code(400);
	}
} catch (Exception $exc) {
	echo 'Error : '.$exc->getMessage();
	http_response_code(400);
}

?>