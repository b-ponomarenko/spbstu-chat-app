<?php

require 'config.php';

use Interop\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class DialogController
{
  protected $ci;

  public function __construct(ContainerInterface $ci)
  {
    $this->ci = $ci;
  }

  public function dialogs(Request $request, Response $response)
  {

    $GET_ALL_DIALOGS_QUERY = 'SELECT * FROM dialogs';

    try {
      $dbh  = new PDO(
        DB_CONNECTION_STRING,
        DB_USER,
        DB_PASSWORD
      );

      $sth = $dbh->prepare($GET_ALL_DIALOGS_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute();
      $result = $sth -> fetchAll(PDO::FETCH_ASSOC);

      return $response->withJson($result);

    } catch (PDOException $e) {
      return $response->withJson($e);
    }
  }

  public function dialog(Request $request, Response $response)
  {
    $id = $request->getAttribute('id');
    $query = "SELECT Dialogs.dialogName, Dialogs.dialogPicture, Messages.message FROM Dialogs INNER JOIN Messages ON Dialogs.id = Messages.dialog WHERE Dialogs.id = $id";


    try {
      $dbh  = new PDO(
        DB_CONNECTION_STRING,
        DB_USER,
        DB_PASSWORD
      );

      $array = array();

      foreach ($dbh->query($query) as $row)
      {
        array_push($array, array(
          'dialogName' => $row[0],
          'dialogPicture' => $row[1],
          'message' => $row[2]
        ));
      }

      return $response->withJson($array);

    } catch (PDOException $e) {
      return $response->write('Подключение не удалось: ' . $e->getMessage());
    }

  }
}