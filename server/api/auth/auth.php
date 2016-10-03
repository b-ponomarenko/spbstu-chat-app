<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Interop\Container\ContainerInterface;

class AuthController
{
  protected $ci;

  public function __construct(ContainerInterface $ci)
  {
    $this->ci = $ci;
  }

  public function login(Request $request, Response $response)
  {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
  }

  public function signUp(Request $request, Response $response)
  {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
  }
}