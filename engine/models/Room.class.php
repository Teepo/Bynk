<?php

class Room {

    const ROOM_CLOSED = 0;
    const ROOM_OPENED = 1;

    /**
     * @param Room $room
     *
     * @return boolean
     */
    public static function exist($room)
    {
        return (isset($room['id']) && !empty($room['id'])) ? TRUE : FALSE;
    }

    /**
     * @param Room $room
     *
     * @return boolean
     */
    public static function isOpen($room)
    {
        return (isset($room['open']) && !empty($room['open'])) ? TRUE : FALSE;
    }

    /**
     * @param uint $id
     * @param string $url
     *
     * @return Room
     */
    public static function get($id = NULL, $url = NULL)
    {
        $where = [];

        if (isset($id))
            $where[] = 'id = ' . (int)$id;
        if (isset($url))
            $where[] = 'url = ' . SQL::quote($url);

        $q = 'SELECT id, url, title, token, open
              FROM room
              WHERE ' . implode(' AND ', $where) . '
              LIMIT 1';

        $res = SQL::query($q);
        if ($res == FALSE)
            return Errno::DB_ERROR;

        return $res->fetch();
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

        return self::get(NULL, $url);
    }

    /**
     * @param Room $room
     *
     */
    public static function set_token($room)
    {
        $q = 'UPDATE room
              SET token = ' . SQL::quote($room['token']) . ',
                   open = ' . self::ROOM_OPENED . '
              WHERE id = ' . $room['id'];

        SQL::query($q);
    }

    /**
     * @param Room $room
     *
     */
    public static function set_title($room)
    {
        $q = 'UPDATE room
              SET title = ' . SQL::quote($room['title']) . '
              WHERE id = ' . $room['id'];

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

    /**
     * @param string $name
     *
     */
    public static function search($name)
    {
        $q = 'SELECT
                  id, url, title, token, open,
                  MATCH(url, title) AGAINST (' . SQL::quote($name) . ') AS relevance
              FROM room
              WHERE
                  MATCH(url, title) AGAINST (' . SQL::quote($name) . ')
                    OR url LIKE ' . SQL::quote('%' . $name . '%') . '
                    OR title LIKE ' . SQL::quote('%' . $name . '%') . '
              ORDER BY relevance DESC
              LIMIT 20';

        $res = SQL::query($q);

        if ($res === FALSE)
            return Errno::DB_ERROR;

        return $res->fetchAll();
    }
}

?>