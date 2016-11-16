<?php
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use SPBSTU\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
  new HttpServer(
    new WsServer(
      new Chat()
    )
  ),
  5000
);

$server->run();