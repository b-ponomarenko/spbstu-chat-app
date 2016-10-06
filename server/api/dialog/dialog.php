<?php

require 'config.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Interop\Container\ContainerInterface;



class DialogController
{
  protected $ci;

  public function __construct(ContainerInterface $ci)
  {
    $this->ci = $ci;
  }

  public function dialogs(Request $request, Response $response)
  {

    $query = 'SELECT Dialogs.dialogName, Dialogs.dialogPicture, Messages.message FROM Dialogs INNER JOIN Messages ON Dialogs.id = Messages.dialog';

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