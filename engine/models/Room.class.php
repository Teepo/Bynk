<?php

class Room {

    public $id;
    public $url;
    public $title;
    public $key;

    const ROOM_CLOSED = 0;
    const ROOM_OPENED = 1;

    /**
     * @param uint $id
     * @param string $url
     *
     */
    public function __construct($id = NULL, $url = NULL)
    {
        $this->id = $id;
        $this->url = $url;

        $room = self::get($this);

        if ($room === FALSE)
            return $this;

        if (isset($room->id))
            $this->id = $room->id;
        if (isset($room->key))
            $this->key = $room->key;
        if (isset($room->open))
            $this->open = $room->open;

        return $this;
    }

    /**
     * @param Room $room
     *
     * @return boolean
     */
    public static function exist($room)
    {
        return (isset($room->id) && !empty($room->id)) ? TRUE : FALSE;
    }

    /**
     * @param Room $room
     *
     * @return boolean
     */
    public static function isOpen($room)
    {
        return (isset($room->open) && !empty($room->open)) ? TRUE : FALSE;
    }

    /**
     * @param Room $room
     *
     * @return Room
     */
    public static function get($room)
    {
        $where = [];

        if (isset($room->id))
            $where[] = 'id = ' . (int)$room->id;
        if (isset($room->url))
            $where[] = 'url = ' . (int)$room->url;

        $q = 'SELECT id, url, title, `key`, open
              FROM room
              WHERE ' . implode(' AND ', $where) . '
              LIMIT 1';

        $res = SQL::query($q);
        if ($res == FALSE)
            return Errno::DB_ERROR;

        return $res->fetch(PDO::FETCH_OBJ);
    }

    /**
     * @param Room $room
     *
     * @return array
     */
    public static function create($url)
    {
        $q = 'INSERT INTO room(url) VALUES(' . SQL::quote($url) . ')';

        $res = SQL::query($q);

        return self::get(new Room(NULL, $url));
    }

    /**
     * @param Room $room
     *
     */
    public static function set_key($room)
    {
        $q = 'UPDATE room
              SET `key` = ' . SQL::quote($room->key) . ',
                   open = ' . self::ROOM_OPENED . '
              WHERE id = ' . $room->id;

        SQL::query($q);
    }

    /**
     * @param uint $id
     *
     */
    public static function close($id)
    {
        $q = 'UPDATE room
              SET open = ' . self::ROOM_CLOSED . '
              WHERE id = ' . (int)$id . '
              LIMIT 1';

        SQL::query($q);
    }
}

?>