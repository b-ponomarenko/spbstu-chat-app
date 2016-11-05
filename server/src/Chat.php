<?php
namespace SPBSTU;

use Firebase\JWT\JWT;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use Shared\Config as Config;

class Chat implements MessageComponentInterface
{
  protected $clients;

  public function __construct()
  {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn)
  {
    // Store the new connection to send messages to later
    $this->clients->attach($conn);

    echo "New connection! ({$conn->resourceId})\n";
  }

  public function onMessage(ConnectionInterface $from, $msg)
  {
    $data = json_decode($msg);
    $decodedToken = JWT::decode($data->token, Config::JWT_SECRET_KEY, [Config::ENCODE_ALGORITHM]);
    $userEmail = $decodedToken -> data -> email;

    switch ($data -> event) {
      case EventTypes::CREATE_DIALOG:
        WsRepository::createDialogEvent($this -> clients, $data, $userEmail);
        break;
      case EventTypes::SEND_MESSAGE:
        WsRepository::sendMessageEvent($this -> clients, $data, $userEmail);
        break;
      case EventTypes::TYPING_MESSAGE:
        WsRepository::typingMessageEvent($this -> clients, $data, $userEmail);
        break;
    }


  }

  public function onClose(ConnectionInterface $conn)
  {
    // The connection is closed, remove it, as we can no longer send it messages
    $this->clients->detach($conn);

    echo "Connection {$conn->resourceId} has disconnected\n";
  }

  public function onError(ConnectionInterface $conn, \Exception $e)
  {
    echo "An error has occurred: {$e->getMessage()}\n";

    $conn->close();
  }
}