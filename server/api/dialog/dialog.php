<?php

use Interop\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Shared\Config as Config;


class DialogController
{
  protected $ci;

  public function __construct(ContainerInterface $ci)
  {
    $this->ci = $ci;
  }

  public function dialogs(Request $request, Response $response)
  {

    $GET_ALL_DIALOGS_QUERY = 'SELECT * FROM dialogs ORDER BY dialogs.id DESC';

    try {
      $dbh  = new PDO(
        Config::DB_CONNECTION_STRING,
        Config::DB_USER,
        Config::DB_PASSWORD
      );

      $dbh->exec("SET NAMES utf8");

      $sth = $dbh->prepare($GET_ALL_DIALOGS_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute();
      $result = $sth -> fetchAll(PDO::FETCH_ASSOC);

      foreach ($result as &$dialog) {
        $GET_LAST_MESSAGE_IN_DIALOG = "SELECT dialogs.id, messages.message, users.firstName, users.lastName FROM dialogs
              INNER JOIN messages ON dialogs.id = messages.dialog
              INNER JOIN users ON users.id = messages.user
            WHERE dialogs.id = :id AND messages.id=(SELECT MAX(id) FROM messages WHERE messages.dialog = :id);";
        $sth = $dbh->prepare($GET_LAST_MESSAGE_IN_DIALOG, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute([':id' => $dialog['id']]);
        $dialog['lastMessage'] = $sth -> fetch(PDO::FETCH_ASSOC);

      }


      return $response->withJson($result);

    } catch (PDOException $e) {
      return $response->withJson($e);
    }
  }

  public function dialog(Request $request, Response $response)
  {
    $id = $request->getAttribute('id');
    $GET_DIALOG_QUERY = "SELECT dialogs.title, dialogs.avatar FROM dialogs  WHERE dialogs.id = :id";
    $GET_MESSAGES_BY_DIALOG_ID = "SELECT users.firstName, users.lastName, users.email, messages.message, messages.createdDatetime FROM messages INNER JOIN users ON messages.user = users.id WHERE messages.dialog = $id ORDER BY messages.id ASC";


    try {
      $dbh  = new PDO(
        Config::DB_CONNECTION_STRING,
        Config::DB_USER,
        Config::DB_PASSWORD
      );

      $dbh->exec("SET NAMES utf8");

      $sth = $dbh->prepare($GET_DIALOG_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute([':id' => $id]);
      $result = $sth -> fetch(PDO::FETCH_ASSOC);

      $sth = $dbh->prepare($GET_MESSAGES_BY_DIALOG_ID, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute([':id' => $id]);
      $result['messages'] = $sth -> fetchAll(PDO::FETCH_ASSOC);

      return $response->withJson($result);

    } catch (PDOException $e) {
      return $response->write('Подключение не удалось: ' . $e->getMessage());
    }

  }
}