<?php
/**
 * Created by PhpStorm.
 * User: bponomarenko
 * Date: 05.11.16
 * Time: 16:11
 */

namespace SPBSTU;

use Exception;
use PDO;
use Shared\Config as Config;


class WsRepository {
  static function sendMessageEvent($clients, $data, $userEmail) {
    $FIND_NEW_USER_EMAIL_QUERY = "SELECT id, firstName, lastName, email FROM users WHERE email LIKE :email";
    $INSERT_MESSAGE_TO_DB = "INSERT `messages` (user, createdDatetime, dialog, message) VALUES (:user, NOW(), :dialog, :message)";

    try {
      $dbh  = new PDO(
        Config::DB_CONNECTION_STRING,
        Config::DB_USER,
        Config::DB_PASSWORD
      );

      $dbh->exec("SET NAMES utf8");

      $sth = $dbh->prepare($FIND_NEW_USER_EMAIL_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':email' => $userEmail));
      $user = $sth -> fetch(PDO::FETCH_ASSOC);

      $sth = $dbh->prepare($INSERT_MESSAGE_TO_DB, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
      print_r([
        ':user' => $user['id'],
        ':dialog' => $data -> data -> dialog,
        ':message' => $data -> data -> message,
      ]);
      $sth->execute([
        ':user' => $user['id'],
        ':dialog' => $data -> data -> dialog,
        ':message' => $data -> data -> message
      ]);

      $result = [
        'user' => $user,
        'message' => $data -> data -> message,
        'createdDatetime' => date(DATE_ATOM),
        'event' => EventTypes::SEND_MESSAGE,
        'dialog' => $data -> data -> dialog
      ];

    } catch (Exception $e) {

    }

    foreach ($clients as $client) {
      // The sender is not the receiver, send to each client connected
      $client->send(json_encode($result), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
  }
  static function createDialogEvent($clients, $data, $userEmail) {
    $CREATE_DIALOG_QUERY = "INSERT `dialogs` (title, avatar) VALUES (:title, :avatar)";
    $title = $data -> data -> dialogName;

    try {
      $dbh  = new PDO(
        Config::DB_CONNECTION_STRING,
        Config::DB_USER,
        Config::DB_PASSWORD
      );

      $dbh->exec("SET NAMES utf8");

      $sth = $dbh->prepare($CREATE_DIALOG_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

      $sth->execute([
        ':title' => $title,
        ':avatar' => Config::IMAGE_PLACEHOLDER
      ]);

      $result = [
        'event' => EventTypes::CREATE_DIALOG,
        'dialog' => [
          'title' => $title,
          'avatar' => Config::IMAGE_PLACEHOLDER
        ]
      ];

    } catch (Exception $e) {

    }

    foreach ($clients as $client) {
      // The sender is not the receiver, send to each client connected
      $client->send(json_encode($result), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

  }
  static function typingMessageEvent($clients, $data, $userEmail) {

  }
}