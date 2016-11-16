<?php
namespace SPBSTU;
use Shared\Enum as Enum;

class EventTypes extends Enum {
 const CREATE_DIALOG = 1;
 const SEND_MESSAGE = 2;
 const TYPING_MESSAGE = 3;
 const USER_CONNECTED_TO_DIALOG = 4;
 const USER_DISCONNECTED_FROM_DIALOG = 5;
}