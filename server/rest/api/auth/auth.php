<?php

use Firebase\JWT\JWT;
use Interop\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class AuthController
{
  protected $ci;

  public function __construct(ContainerInterface $ci)
  {
    $this->ci = $ci;
  }

  public function login(Request $request, Response $response)
  {
    $user = $request -> getParsedBody();
    $FIND_USER_QUERY = "SELECT users.email, users.password FROM users WHERE email LIKE :email";

    try {
      $dbh  = new PDO(
        DB_CONNECTION_STRING,
        DB_USER,
        DB_PASSWORD
      );

      $sth = $dbh->prepare($FIND_USER_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':email' => $user['email']));
      $result = $sth -> fetch(PDO::FETCH_ASSOC);

      if ( !$result ) {
        return $response->withJson([
          'title' => 'An error occurred',
          'message' => 'Email address not found!'
        ], 400);
      }

      if ( $result['password'] == md5($user['password']) ) {
        $token = $this -> _generateToken($user);
        return $response->withJson([ 'token' => $token ]);
      }

      return $response->withJson([
        'title' => 'An error occurred',
        'message' => 'Incorrect password!'
      ], 400);


    } catch (PDOException $e) {
      $response->getBody()->withJson($e);
    }

  }

  public function signUp(Request $request, Response $response)
  {
    $user = $request -> getParsedBody();
    $FIND_NEW_USER_EMAIL_QUERY = "SELECT users.email FROM users WHERE email LIKE :email";

    try {
      $dbh  = new PDO(
        DB_CONNECTION_STRING,
        DB_USER,
        DB_PASSWORD
      );

      $dbh->exec("SET NAMES utf8");

      $sth = $dbh->prepare($FIND_NEW_USER_EMAIL_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $sth->execute(array(':email' => $user['email']));
      $result = $sth -> fetch(PDO::FETCH_ASSOC);

      if ( !$result ) {
        $this -> _addNewUser($dbh, $user);
        $token = $this -> _generateToken($user);
        return $response->withJson($this -> _addNewUser($dbh, $user));
      }

      return $response->withJson([
        'title' => 'An error occurred',
        'message' => 'This email address is already in use by another account.'
      ], 400);

    } catch (PDOException $e) {
      $response->getBody()->withJson($e);
    }

    return $response;
  }

  private function _generateToken($user) {

    $token = array(
      'tokenId' => base64_encode(mcrypt_create_iv(32)),
      'iat' => time(),
      'nbf'  => time(),
      'exp'  => time() + 7200,
      'data' => [
        'email' => $user['email']
      ]
    );

    return JWT::encode($token, JWT_SECRET_KEY);
  }

  private function _addNewUser(&$dbh, $user) {
    $ADD_USER_TO_DB_QUERY = "INSERT `users` (email, firstName, lastName, role, password) VALUES (:email, :firstName, :lastName, :role, MD5(:password));
    ";
    $sth = $dbh->prepare($ADD_USER_TO_DB_QUERY, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([
      ':email' => $user['email'],
      ':firstName' => $user['firstName'],
      ':lastName' => $user['lastName'],
      ':role' => USER_ROLE,
      ':password' => $user['password'],
    ]);
    return $sth -> fetch(PDO::FETCH_ASSOC);
  }

}