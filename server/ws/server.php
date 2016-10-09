<?php

use Chat\Chat;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(new HttpServer(new WsServer(new Chat)), 5000);

$server->run();
