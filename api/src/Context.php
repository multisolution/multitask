<?php declare(strict_types=1);

namespace Multitask;

class Context
{
    /** @var User|null */
    public $user;
    /** @var Database */
    public $db;
    /** @var string */
    public $appKey;
}