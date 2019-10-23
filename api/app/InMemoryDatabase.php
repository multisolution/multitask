<?php declare(strict_types=1);

namespace Multitask;

class InMemoryDatabase implements Database
{
    /** @var int */
    private $autoIncrement = 1;

    /** @var User[] */
    private $users = [];
    /** @var array[] */
    private $tokens = [];

    public function findUserByEmail(string $email): ?User
    {
        /** @var User[] $results */
        $results = array_filter($this->users, function (User $user) use ($email) {
            return $user->email === $email;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function saveToken(int $userId, string $token): bool
    {
        $this->tokens[$userId] = $token;
        return true;
    }

    public function saveUser(User $user): int
    {
        $user->id = $this->autoIncrement++;
        $this->users[$user->id] = $user;
        return $user->id;
    }

    public function deleteToken(int $userId): bool
    {
        unset($this->tokens[$userId]);
        return true;
    }

    public function getUserById(int $userId): ?User
    {
        return $this->users[$userId];
    }
}