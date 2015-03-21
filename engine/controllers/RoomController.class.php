<?php

class RoomController extends Engine
{
    public function init()
    {
        $name = self::$argv['name'];

        $room = new Room($name);

        if (!$exist = Room::exist($room))
            $room = Room::create($name);

        View::assign('room', $room);
        View::assign('exist', ($exist) ? 1 : 0);

		View::display('index.tpl');
    }

    /**
     * @param string $name
     * @param string $key
     *
     */
    public function create($name)
    {
        Room::create($name);
    }

    /**
     * @param uint $id
     * @param string $key
     *
     */
    public function set_key()
    {
        $room = new Room(self::$argv['name']);

        $room->key = self::$argv['key'];

        Room::set_key($room);
    }
}

?>