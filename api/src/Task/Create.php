<?php declare(strict_types=1);

namespace Multitask\Task;

use Multitask\Task;

class Create
{
    public function __invoke($root, $args): ?Task
    {
        //TODO VALIDATE NOOB
        $task = new Task();
        $task->id = 100;
        $task->title = $args['title'];
        $task->allocated = $args['allocated'];
        $task->taskType = $args['taskType'];
        $task->taskProject = $args['taskProject'];
        $task->taskDescription = $args['taskDescription'];

        return $task;
    }
}