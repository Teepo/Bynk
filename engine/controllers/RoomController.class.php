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
     * @param string $title
     *
     * - viewer = json
     */
    public function set_title($id, $title)
    {
        $room = Room::get($id);

        $room['title'] = $title;

        Room::set_title($room);

        View::assign('room', $room);
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

    /***************************************************************************
     *                                VIEWS
     ***************************************************************************/

    /**
     * @param string $url
     *
     * - view = index
     * - viewer = tpl|json
     */
    public function init($url)
    {
        $room = Room::get(NULL, $url);

        if (($exist = Room::exist($room)) === FALSE && (Room::isOpen($room)) === FALSE)
            $room = Room::create($url);

        View::assign('room', $room);
        View::assign('exist', ($exist) ? 1 : 0);
    }

    /**
     * @param string $name
     *
     * - view = search/display
     * - viewer = tpl|json
     */
    public function search($name)
    {
        View::assign('rooms', ROOM::search($name));
    }
}

?>