<?php

    if (isset($_POST['nickname']) && isset($_POST['finaltime']) && isset($_POST['finaltimeformatted'])) {
        $json = file_get_contents('leaderboard.json', true);
        if(empty($json)){
            $jsonObject = json_encode(array('nickname' => [$jsonObject]));
            file_put_contents('leaderboard.json', $jsonObject);
        }else{
            $data = json_decode($json,true);
            unset($json);
            $data[] = array('nickname' => $_POST['nickname'], 'finaltime' => $_POST['finaltime'], 'finaltimeformatted' => $_POST['finaltimeformatted']);
            $result=json_encode($data, JSON_PRETTY_PRINT);
            file_put_contents('leaderboard.json', $result);
            unset($result);
        }
    }
    else {
        echo "fuck!";
    }

?>