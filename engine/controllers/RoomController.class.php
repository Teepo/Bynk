<?php

class RoomController extends Model
{
    /**
     * @param string $url
     *
     * - view = index
     * - viewer = tpl|json
     */
    public function init($url)
    {
        $room = new Room(NULL, $url);

        if (($exist = Room::exist($room)) === FALSE && (Room::isOpen($room)) === FALSE)
            $room = Room::create($url);

        View::assign('room', $room);
        View::assign('exist', ($exist) ? 1 : 0);
    }

    /**
     * @param string $url
     * @param string $key
     *
     */
    public function create($url)
    {
        Room::create($url);
    }

    /**
     * @param string $url
     * @param string $key
     *
     * - viewer = json
     */
    public function set_key($url, $key)
    {
        $room = new Room(NULL, $url);

        $room->key = $key;

        Room::set_key($room);
    }

    /**
     * @param uint $id
     *
     */
    public function isOpen($id)
    {
        View::assign('open', ROOM::isOpen(new Room($id)));
    }

    /**
     * @param uint $id
     *
     */
    public function get($id)
    {
        View::assign('room', new Room($id));
    }

    /**
     * @param uint $id
     *
     */
    public function close($id)
    {
        ROOM::close($id);
    }
}

?>