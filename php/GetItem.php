<?php

$itemId = isset($_REQUEST['id']) ? $_REQUEST['id'] : false;
$thisItem = false;

if ($itemId) {
	try {
		$items = file_get_contents('../items.json');
		if ($items) {
			$items = json_decode($items);
			foreach ($items as $item) {
				if ($item->id == $itemId) {
					$thisItem = $item;
				}
			}
			if ($items) {
				echo json_encode($thisItem);
				http_response_code(200);
			} else {
				echo 'Unable to find item.';
				http_response_code(400);
			}
		} else {
			echo 'Unable to find items.';
			http_response_code(400);
		}
	} catch (Exception $exc) {
		echo 'Error : '.$exc->getMessage();
		http_response_code(400);
	}
} else {
	echo '{}';
	http_response_code(200);
}

?>