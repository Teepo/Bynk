<?php

class RoomController extends Model
{

    /**
     * @param string $url
     * @param string $token
     *
     */
    public function create($url)
    {
        Room::create($url);
    }

    /**
     * @param string $url
     * @param string $token
     *
     * - viewer = json
     */
    public function set_token($url, $token)
    {
        $room = Room::get(NULL, $url);

        $room['token'] = $token;

        Room::set_token($room);
    }

    /**
     * @param uint $id
     *
     */
    public function isOpen($id)
    {
        View::assign('open', ROOM::isOpen(ROOM::get($id)));
    }

    /**
     * @param uint $id
     *
     */
    public function get($id)
    {
        View::assign('room', ROOM::get($id));
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