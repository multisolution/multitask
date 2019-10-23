<?php declare(strict_types=1);

namespace Multitask\User;

use Multitask\Context;

class Me
{
    public function __invoke($root, $args, Context $context)
    {
        return $context->user;
    }
}