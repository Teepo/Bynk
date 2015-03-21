<?php

class Room {

    public $id;
    public $name;
    public $key;

    /**
     * @param string $name
     *
     */
    public function __construct($name)
    {
        $this->name = $name;

        $room = self::get($this);

        if (isset($room->id))
            $this->id = $room->id;

        if (isset($room->key))
            $this->key = $room->key;
    }

    /**
     * @param Room $room
     *
     */
    public static function exist($room)
    {
        return (isset($room->key) && !empty($room->key)) ? TRUE : FALSE;
    }

    /**
     * @param Room $room
     *
     * @return Room
     */
    public static function get($room)
    {
        $q = 'SELECT id, name, `key` FROM room WHERE name = ' . SQL::quote($room->name) . ' LIMIT 1';

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
    public static function create($name)
    {
        $q = 'INSERT INTO room(name) VALUES(' . SQL::quote($name) . ')';

        $res = SQL::query($q);

        return self::get(new Room($name));
    }

    /**
     * @param Room $room
     *
     */
    public static function set_key($room)
    {
        $q = 'UPDATE room SET `key` = ' . SQL::quote($room->key) . ' WHERE id = ' . $room->id;

        SQL::query($q);
    }
}

?>