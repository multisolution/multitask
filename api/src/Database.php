<?php declare(strict_types=1);

namespace Multitask;

interface Database
{
    public function findUserByEmail(string $email): ?User;

    public function saveToken(int $userId, string $token): bool;

    public function deleteToken(int $userId): bool;

    public function getUserById(int $userId): ?User;
}