<?php declare(strict_types=1);

namespace Multitask\User;

use Multitask\User;

class ByToken
{
    public function __invoke(string $token): ?User
    {
        if ($token === 'adminadmin') {
            $user = new User();
            $user->id = 8;
            return $user;
        }

        return null;
    }
}