import React, { useRef } from "react";
import Page from "../components/page";
import Input from "../components/input";
import Button from "../components/button";
import { useTranslation } from "react-i18next";
import { Align, Column } from "../components/layout";
import { withApollo } from "../lib/apollo";
import Task from "../lib/task";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

type AddTaskResult = {
  addTask: Task;
};

const CreateTask = () => {
  const allocated = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const taskType = useRef<HTMLInputElement>(null);
  const taskProject = useRef<HTMLInputElement>(null);
  const taskDescription = useRef<HTMLInputElement>(null);

  const [t] = useTranslation();

  const [createTask] = useMutation<AddTaskResult, Task>(gql`
    mutation CreateTask($task: TaskInput) {
      createTask(input: $task) {
        title
        id
      }
    }
  `);

  async function onCreateTaskClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const task = validateFields();
    if (task !== false) {
      const result = await createTask({
        variables: task
      });

      console.log(result.data);
    }
  }

  function validateFields(): Task | false {
    const task: any = {};

    if (allocated && allocated.current) {
      if (!allocated.current.value) {
        return false;
      }
      task["allocated"] = allocated.current.value;
    }
    if (title && title.current) {
      if (!title.current.value) {
        return false;
      }
      task["title"] = title.current.value;
    }
    if (taskType && taskType.current) {
      if (!taskType.current.value) {
        return false;
      }
      task["taskType"] = taskType.current.value;
    }
    if (taskProject && taskProject.current) {
      if (!taskProject.current.value) {
        return false;
      }
      task["taskProject"] = taskProject.current.value;
    }
    if (taskDescription && taskDescription.current) {
      if (!taskDescription.current.value) {
        return false;
      }
      task["taskDescription"] = taskDescription.current.value;
    }

    return task;
  }

  return (
    <Page horizontal={Align.Center} vertical={Align.Center}>
      <form>
        <Column>
          <img src="/logo.png" alt="MultisolutiON" />
          <Input name="title" placeholder={t("task_title")} ref={title} />
          <Input name="allocated" placeholder={t("allocated")} ref={allocated} />
          <Input name="task_type" placeholder={t("task_type")} ref={taskType} />
          <Input name="task_project" placeholder={t("task_project")} ref={taskProject} />
          <Input name="task_description" placeholder={t("task_description")} ref={taskDescription} />
          <Button skin="primary" onClick={onCreateTaskClick}>
            {t("create_task")}
          </Button>
        </Column>
      </form>
    </Page>
  );
};

export default withApollo(CreateTask);
